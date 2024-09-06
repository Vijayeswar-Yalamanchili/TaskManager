import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
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
        createdAt DATETIME DEFAULT NULL,
        updatedAt DATETIME DEFAULT NULL
    );`
    connection.query(newUsersTable,(err)=> {
        if (err) throw err
        // console.log('Users table ready...')
    })

    const otpsTable = `CREATE TABLE IF NOT EXISTS otps (
        id INT AUTO_INCREMENT PRIMARY KEY,
        mobile VARCHAR(45) NOT NULL UNIQUE,
        hashedOtp VARCHAR(255) NOT NULL,
        createdAt DATETIME DEFAULT NULL
    );`
    connection.query(otpsTable,(err)=> {
        if (err) throw err
        // console.log('otps table ready...')
    })

    const newprojectsTable = `CREATE TABLE IF NOT EXISTS projects (
        projectId INT AUTO_INCREMENT PRIMARY KEY,
        userId VARCHAR(45) NOT NULL,
        projectName VARCHAR(45) NOT NULL,
        tasks json,
        createdAt DATETIME DEFAULT NULL,
        updatedAt DATETIME DEFAULT NULL
    );`

    connection.query(newprojectsTable,(err)=> {
    if (err) throw err
    // console.log('Projects table ready...') 
    })

    const newTasksTable = `CREATE TABLE IF NOT EXISTS tasks (
        taskId INT AUTO_INCREMENT PRIMARY KEY,
        projectId VARCHAR(45) NOT NULL,
        taskStatus VARCHAR(45) NOT NULL,
        taskDetails json NOT NULL,
        createdAt DATETIME DEFAULT NULL,
        updatedAt DATETIME DEFAULT NULL
    );`

    connection.query(newTasksTable,(err)=> {
    if (err) throw err
    // console.log('Tasks table ready...')
    })
})

export default connection