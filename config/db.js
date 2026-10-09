
const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: true
    },
    connectionTimeoutMillis: 10000
});

async function connectDB() {
    try {
        const result = await pool.query(
            "SELECT current_database() AS database"
        );

        console.log(
            "PostgreSQL connected successfully:",
            result.rows[0].database
        );
    } catch (error) {
        console.error("PostgreSQL connection failed:");
        console.error("Code:", error.code);
        console.error("Message:", error.message);
        throw error;
    }
}

function getDB() {
    return pool;
}

module.exports = { connectDB, getDB };
