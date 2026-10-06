require("dotenv").config();

const express = require("express");
const swaggerUi = require("swagger-ui-express");

const { connectDB } = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const swaggerSpec = require("./swagger");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.get("/", (req, res) => {
    res.json({
        message: "Demo Backend is Running"
    });
});

app.use("/api/students", studentRoutes);

async function startServer() {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
        console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
    });
}

startServer();