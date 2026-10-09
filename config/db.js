
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: true
    }
});

async function connectDB() {
    try {
        const result = await pool.query(
            "SELECT current_database() AS database"
        );

        console.log(
            `PostgreSQL connected successfully: ${result.rows[0].database}`
        );
    } catch (error) {
        console.error("PostgreSQL connection failed");
        console.error(error.message);

        process.exit(1);
    }
}

function getDB() {
    return pool;
}

module.exports = {
    connectDB,
    getDB
};
