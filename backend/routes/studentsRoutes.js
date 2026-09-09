import express from "express";
import mongoose from "mongoose";

const studentsRouter = express.Router();

const studentSchema = new mongoose.Schema(
    {
        uid: { type: String, required: true, unique: true, index: true },
        name: { type: String, required: true, trim: true },
        course: { type: String, trim: true, default: '' },
        email: { type: String, required: true, trim: true, lowercase: true },
        role: { type: String, required: true, enum: ['STUDENT'] },
        graduationYear: { type: String, trim: true, default: '' },
        college: { type: String, trim: true, default: '' },
        location: { type: String, trim: true, default: '' },
    },
    { timestamps: true }
);

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema, 'students');

studentsRouter.get("/", async (req, res) => {
    try {
        const students = await Student.find({}).sort({ createdAt: -1 }).lean();
        return res.status(200).json(students);
    } catch (error) {
        console.error("[students] Student lookup failed", { message: error.message });
        return res.status(500).json({ error: "Unable to get students" });
    }
});

export default studentsRouter;