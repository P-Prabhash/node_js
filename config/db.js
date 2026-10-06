const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);

let db;

async function connectDB() {
    try {
        await client.connect();

        db = client.db(process.env.DB_NAME);

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed");
        console.error(error.message);

        process.exit(1);
    }
}

function getDB() {
    return db;
}

module.exports = {
    connectDB,
    getDB
};