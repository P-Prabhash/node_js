const express = require("express");

const router = express.Router();

const {
    createStudent,
    getStudents
} = require("../models/studentModel");


/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student management APIs
 */


/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Add a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - age
 *               - course
 *             properties:
 *               name:
 *                 type: string
 *                 example: Avinash
 *               age:
 *                 type: integer
 *                 example: 22
 *               course:
 *                 type: string
 *                 example: Computer Science
 *     responses:
 *       201:
 *         description: Student added successfully
 *       500:
 *         description: Failed to add student
 */

// POST - Add student
router.post("/", async (req, res) => {
    try {
        const student = {
            name: req.body.name,
            age: req.body.age,
            course: req.body.course
        };

        const result = await createStudent(student);

        res.status(201).json({
            message: "Student added successfully",
            studentId: result.insertedId
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add student",
            error: error.message
        });
    }
});


/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of all students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 68f123abc456def789
 *                   name:
 *                     type: string
 *                     example: Avinash
 *                   age:
 *                     type: integer
 *                     example: 22
 *                   course:
 *                     type: string
 *                     example: Computer Science
 *       500:
 *         description: Failed to get students
 */

// GET - Get students
router.get("/", async (req, res) => {
    try {
        const students = await getStudents();

        res.json(students);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get students",
            error: error.message
        });
    }
});


module.exports = router;