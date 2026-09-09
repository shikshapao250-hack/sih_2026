import express from 'express';
import mongoose from 'mongoose';

const educationRouter = express.Router();

const educationSchema = new mongoose.Schema(
    {
        uid: { type: String, required: true, trim: true, index: true },
        degree: { type: String, required: true, trim: true },
        institution: { type: String, required: true, trim: true },
        startDate: { type: String, trim: true, default: "" },
        endDate: { type: String, trim: true, default: "" },
        grade: { type: String, trim: true, default: "" },
        year: { type: String, trim: true, default: "" },
        score: { type: String, trim: true, default: "" },
        description: { type: String, trim: true, default: "" },
        current: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Education = mongoose.models.Education || mongoose.model("Education", educationSchema, "education");

educationRouter.post("/", async (req, res) => {
    const {
        uid,
        degree,
        institution,
        startDate,
        endDate,
        grade,
        year,
        score,
        description,
        current,
    } = req.body ?? {};

    if (!uid || !degree || !institution) {
        return res.status(400).json({ error: "uid, degree and institution are required" });
    }

    try {
        const education = await Education.create({
            uid,
            degree,
            institution,
            startDate,
            endDate,
            grade,
            year,
            score,
            description,
            current,
        });

        return res.status(201).json(education);
    } catch (error) {
        console.error("[education] Education creation failed", { message: error.message });
        return res.status(500).json({ error: "Unable to save education" });
    }
});

educationRouter.get("/", async (req, res) => {
    const filter = req.query.uid ? { uid: req.query.uid } : {};

    try {
        const education = await Education.find(filter).sort({ createdAt: -1 }).lean();
        return res.status(200).json(education);
    } catch (error) {
        console.error("[education] Education lookup failed", { message: error.message });
        return res.status(500).json({ error: "Unable to get education" });
    }
});

educationRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid education id" });
    }

    try {
        const education = await Education.findByIdAndDelete(id);

        if (!education) {
            return res.status(404).json({ error: "Education not found" });
        }

        return res.status(200).json({ message: "Education deleted", id });
    } catch (error) {
        console.error("[education] Education deletion failed", { id, message: error.message });
        return res.status(500).json({ error: "Unable to delete education" });
    }
});

export default educationRouter;
    