import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth2'
import indexRoutes from '../src/routes/indexRoutes.js'
import GoogleAuthModel from './models/googleAuthModel.js'

dotenv.config()
const OAuth2Strategy = GoogleStrategy.Strategy

const port = process.env.PORT
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET

// middlewares
const app = express()
app.use(cors({
    // origin : process.env.CLIENT_URL ,
    origin : 'http://localhost:5173',
    methods : 'GET, POST, PUT,DELETE',
    credentials : true
}));
app.use(express.json())
app.use(indexRoutes)

// Oauth/passport middlewares setup
app.use(session({
    secret : 'jkjnfkj65456jndckjnwiewef',
    resave : false,
    saveUninitialized : true
}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(
    new OAuth2Strategy({
        clientID : clientId,
        clientSecret : clientSecret,
        callbackURL : '/auth/google/callback',
        scope : [ 'profile', 'email' ]
    },
    async(accessToken,refreshToken,profile,done) => {
        // console.log('profile : ', profile)
        try {
            let user = await GoogleAuthModel.findOne({googleId : profile.id})
            if(!user){
                let olduser = await GoogleAuthModel.findOneAndUpdate({googleId : profile.id},{$set : {isLoggedIn : true}},{new:true})
                return done(null,olduser)
            }else{            
                let newUser  = await GoogleAuthModel.create({
                    googleId : profile.id,
                    displayName : profile.displayName,
                    email : profile.emails[0].value,
                    image : profile.photos[0].value,
                    isLoggedIn : true
                })
            }
            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    })
)

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
})

// initialize google oauth login
app.get('/auth/google',passport.authenticate('google',{ scope : [ 'profile','email' ]}))
app.get('/auth/google/callback',passport.authenticate('google',{ 
    successRedirect : `${process.env.CLIENT_URL}/home`,
    failureRedirect : `${process.env.CLIENT_URL}/`
}))

// function ensureAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         console.log('first')
//       return next();
//     }
//     console.log('sddscsdc')
//     res.redirect(`${process.env.CLIENT_URL}/`);
//   }

//   app.get('/googlelogin/success', ensureAuthenticated, (req, res) => {
//     console.log(req.user)
//     // res.json(req.user);
//     res.status(200).send({
//                         message : "LogIn Successfull",
//                         user : req.user
//                     })
//   });

app.get('/googlelogin/success', async(req,res) => {
    try {
        if(req?.user){
            // console.log('true')
            // console.log(req.user)
            res.status(200).send({
                message : "LogIn Successfull",
                user : req?.user
            })
        } 
        // else {console.log('false')}
    } catch (error) {
        res.status(500).send({
            message : "Internal server while logging with Google Account"
        })
    }
})

app.get('/googlelogout',(req,res,next) => {
    const {googleId} = req?.user
    req.logout(async function (err) {
        if(err) {return next(err)}
        let logout = await GoogleAuthModel.findOneAndUpdate({googleId : `${googleId}`}, {$set : {isLoggedIn : false}})
        res.redirect(`${process.env.CLIENT_URL}/`)
    })    
})

app.listen(port, ()=> console.log(`App listening to ${port}`))