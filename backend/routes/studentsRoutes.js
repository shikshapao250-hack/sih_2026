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

studentsRouter.put("/:uid", async (req, res) => {
    const { uid } = req.params;
    const { college, graduationYear, course, location, name, email } = req.body ?? {};

    if (!uid) {
        return res.status(400).json({ error: "uid is required" });
    }

    try {
        const update = {};

        if (typeof college === 'string') update.college = college.trim();
        if (typeof graduationYear === 'string') update.graduationYear = graduationYear.trim();
        if (typeof course === 'string') update.course = course.trim();
        if (typeof location === 'string') update.location = location.trim();
        if (typeof name === 'string') update.name = name.trim();
        if (typeof email === 'string') update.email = email.trim().toLowerCase();

        const student = await Student.findOneAndUpdate(
            { uid },
            { $set: update },
            { new: true, runValidators: true }
        );

        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        return res.status(200).json(student);
    } catch (error) {
        console.error("[students] Student update failed", { uid, message: error.message });
        return res.status(500).json({ error: "Unable to update student profile" });
    }
});

export default studentsRouter;