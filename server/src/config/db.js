import mysql from 'mysql'

const connection = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
})

connection.connect((err) => {
    if(err) { return console.log(err) }
    console.log('MySQL DB connected')

    //Check if table created
    const newUsersTable = `CREATE TABLE IF NOT EXISTS userauths (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(45) NOT NULL,
        lastName VARCHAR(45) NOT NULL,
        mobile VARCHAR(45) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        isAdmin TINYINT NOT NULL DEFAULT 0,
        isLoggedIn TINYINT NOT NULL DEFAULT 0,
        createdAt DATE DEFAULT NULL
    );`
    connection.query(newUsersTable,(err)=> {
        if (err) throw err
        console.log('Users table ready...')
    })

    const newprojectsTable = `CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId VARCHAR(45) NOT NULL,
        projectName VARCHAR(45) NOT NULL,
        createdAt DATE DEFAULT NULL
    );`

    connection.query(newprojectsTable,(err)=> {
    if (err) throw err
    console.log('Projects table ready...') 
    })
})

export default connection