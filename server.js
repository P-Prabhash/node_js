
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const { connectDB } = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const swaggerSpec = require("./swagger");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger documentation
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Demo Backend is Running",
        database: "Neon PostgreSQL"
    });
});

// Student APIs
app.use("/api/students", studentRoutes);

// Start server after connecting to PostgreSQL
async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
}

startServer();
