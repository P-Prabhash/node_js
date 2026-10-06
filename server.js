require("dotenv").config();

const express = require("express");
const swaggerUi = require("swagger-ui-express");

const { connectDB } = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const swaggerSpec = require("./swagger");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

// Swagger
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// Home
app.get("/", (req, res) => {
    res.json({
        message: "Demo Backend is Running"
    });
});

// Student APIs
app.use("/api/students", studentRoutes);

// Start server
async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Swagger UI: /api-docs`);
        });

    } catch (error) {
        console.error("Server startup failed:");
        console.error(error);
        process.exit(1);
    }
}

startServer();