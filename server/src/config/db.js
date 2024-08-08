import mysql from 'mysql2'
// // import { Sequelize } from 'sequelize'

// const connection = mysql.createConnection({
//     host : process.env.DB_HOST,
//     user : process.env.DB_USER,
//     password : process.env.DB_PASSWORD,
//     database : process.env.DB_NAME
// })

// connection.connect((err) => {
//     if(err) { return console.log("Error is : ", err) }
//     console.log('MySQL DB connected')

//     // //Check if table created
//     // const newUsersTable = `CREATE TABLE IF NOT EXISTS userauths (
//     //     userId INT AUTO_INCREMENT PRIMARY KEY,
//     //     firstName VARCHAR(45) NOT NULL,
//     //     lastName VARCHAR(45) NOT NULL,
//     //     mobile VARCHAR(45) NOT NULL,
//     //     email VARCHAR(255) NOT NULL UNIQUE,
//     //     password VARCHAR(255) NOT NULL,
//     //     isAdmin TINYINT NOT NULL DEFAULT 0,
//     //     isLoggedIn TINYINT NOT NULL DEFAULT 0,
//     //     createdAt DATE DEFAULT NULL
//     // );`
//     // connection.query(newUsersTable,(err)=> {
//     //     if (err) throw err
//     //     // console.log('Users table ready...')
//     // })

//     // const newprojectsTable = `CREATE TABLE IF NOT EXISTS projects (
//     //     projectId INT AUTO_INCREMENT PRIMARY KEY,
//     //     userId VARCHAR(45) NOT NULL,
//     //     projectName VARCHAR(45) NOT NULL,
//     //     createdAt DATE DEFAULT NULL
//     // );`

//     // connection.query(newprojectsTable,(err)=> {
//     // if (err) throw err
//     // // console.log('Projects table ready...') 
//     // })
// })

// const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',   // or '172.17.0.1' or whatever your Docker host is
  user: 'root',
  password: 'password',
  database: 'taskmanager'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack)
        return
    }
    console.log('Connected to the database.')
    //Check if table not created
    const newUsersTable = `CREATE TABLE IF NOT EXISTS userauths (
        userId INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(45) NOT NULL,
        lastName VARCHAR(45) NOT NULL,
        mobile VARCHAR(45) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        isAdmin TINYINT NOT NULL DEFAULT 0,
        isLoggedIn TINYINT NOT NULL DEFAULT 0,
        createdAt DATETIME DEFAULT NULL
    );`
    connection.query(newUsersTable,(err)=> {
        if (err) throw err
        // console.log('Users table ready...')
    })

    const newprojectsTable = `CREATE TABLE IF NOT EXISTS projects (
        projectId INT AUTO_INCREMENT PRIMARY KEY,
        userId VARCHAR(45) NOT NULL,
        projectName VARCHAR(45) NOT NULL,
        createdAt DATETIME DEFAULT NULL
    );`

    connection.query(newprojectsTable,(err)=> {
    if (err) throw err
    // console.log('Projects table ready...') 
    })
})

export default connection