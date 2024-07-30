const ApiRoutes = {
  LOGIN : {
      path : '/users/login',
      authenticate : false
  },
  REGISTER : {
    path : '/users/register',
    authenticate : false
  },
  FORGOTPASSWORD : {
      path : '/users/forgotpassword',
      authenticate : false
  },
  LOGOUT : {
      path : '/users/logout',
      authenticate : true
  },
  GOOGLELOGIN : {
    path : '/googlelogin/success',
    authenticate : false
  },
  GOOGLELOGOUT : {
    path : '/googlelogout',
    authenticate : true
},
  
}

export default ApiRoutes