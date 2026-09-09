import express from "express";
import mongoose from "mongoose";

const jobsRouter = express.Router();

const jobSchema = new mongoose.Schema(
    {
        uid: { type: String, required: true, trim: true, index: true },
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        opportunityType: { type: String, trim: true, default: "" },
        workMode: { type: String, trim: true, default: "" },
        type: { type: String, trim: true, default: "" },
        mode: { type: String, trim: true, default: "" },
        location: { type: String, trim: true, default: "" },
        skillsRequired: { type: mongoose.Schema.Types.Mixed, default: [] },
        skills: { type: mongoose.Schema.Types.Mixed, default: [] },
        compensation: { type: String, trim: true, default: "" },
        applicationDeadline: { type: String, trim: true, default: "" },
        deadline: { type: String, trim: true, default: "" },
        organization: { type: String, trim: true, default: "" },
    },
    { timestamps: true }
);

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema, "jobs");

jobsRouter.post("/", async (req, res) => {
    const {
        uid,
        title,
        description,
        opportunityType,
        workMode,
        type,
        mode,
        location,
        skillsRequired,
        skills,
        compensation,
        applicationDeadline,
        deadline,
        organization,
    } = req.body ?? {};

    if (!uid || !title || !description) {
        return res.status(400).json({ error: "uid, title and description are required" });
    }

    try {
        const job = await Job.create({
            uid,
            title,
            description,
            opportunityType,
            workMode,
            type,
            mode,
            location,
            skillsRequired,
            skills,
            compensation,
            applicationDeadline,
            deadline,
            organization,
        });

        return res.status(201).json(job);
    } catch (error) {
        console.error("[jobs] Job creation failed", { message: error.message });
        return res.status(500).json({ error: "Unable to save job" });
    }
});

jobsRouter.get("/", async (req, res) => {
    const filter = req.query.uid ? { uid: req.query.uid } : {};

    try {
        const jobs = await Job.find(filter).sort({ createdAt: -1 }).lean();
        return res.status(200).json(jobs);
    } catch (error) {
        console.error("[jobs] Job lookup failed", { message: error.message });
        return res.status(500).json({ error: "Unable to get jobs" });
    }
});

jobsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid job id" });
    }

    try {
        const job = await Job.findByIdAndDelete(id);

        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        return res.status(200).json({ message: "Job deleted", id });
    } catch (error) {
        console.error("[jobs] Job deletion failed", { id, message: error.message });
        return res.status(500).json({ error: "Unable to delete job" });
    }
});

export default jobsRouter;