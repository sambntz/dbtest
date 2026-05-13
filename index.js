const express = require('express')
const mysql = require('mysql2/promise')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

const config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10
}

console.log({ config });

const pool = mysql.createPool(config)

app.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT NOW();'
        )

        res.json(rows)
    } catch (error) {
        console.error(error)

        res.status(500).json({
            error: 'Internal server error'
        })
    }
})

app.listen(process.env.APP_PORT, () => {
    console.log(`Server running on http://localhost:${process.env.APP_PORT}`)
})
