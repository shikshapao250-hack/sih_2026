import express from "express";
import mongoose from "mongoose";

const projectsRouter = express.Router();

const projectSchema = new mongoose.Schema(
    {
        uid: { type: String, required: true, trim: true, index: true },
        projectTitle: { type: String, required: true, trim: true },
        projectDescription: { type: String, trim: true, default: "" },
        githubLink: { type: String, trim: true, default: "" },
        demolink: { type: String, trim: true, default: "" },
        technologies: { type: mongoose.Schema.Types.Mixed, default: [] },
        status: { type: String, trim: true, default: "" },
    },
    { timestamps: true }
);

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema, "projects");

projectsRouter.post("/", async (req, res) => {
    const { uid, projectTitle, projectDescription, githubLink, demolink, technologies, status } = req.body ?? {};

    if (!uid || !projectTitle) {
        return res.status(400).json({ error: "uid and projectTitle are required" });
    }

    try {
        const project = await Project.create({
            uid,
            projectTitle,
            projectDescription,
            githubLink,
            demolink,
            technologies,
            status,
        });

        return res.status(201).json(project);
    } catch (error) {
        console.error("[projects] Project creation failed", { message: error.message });
        return res.status(500).json({ error: "Unable to save project" });
    }
});

projectsRouter.get("/", async (req, res) => {
    const filter = req.query.uid ? { uid: req.query.uid } : {};

    try {
        const projects = await Project.find(filter).sort({ createdAt: -1 }).lean();
        return res.status(200).json(projects);
    } catch (error) {
        console.error("[projects] Project lookup failed", { message: error.message });
        return res.status(500).json({ error: "Unable to get projects" });
    }
});

projectsRouter.put("/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid project id" });
    }

    const { uid, projectTitle, projectDescription, githubLink, demolink, technologies, status } = req.body ?? {};

    try {
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            {
                uid,
                projectTitle,
                projectDescription,
                githubLink,
                demolink,
                technologies,
                status,
            },
            { new: true, runValidators: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ error: "Project not found" });
        }

        return res.status(200).json(updatedProject);
    } catch (error) {
        console.error("[projects] Project update failed", { id, message: error.message });
        return res.status(500).json({ error: "Unable to update project" });
    }
});

projectsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid project id" });
    }

    try {
        const project = await Project.findByIdAndDelete(id);

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        return res.status(200).json({ message: "Project deleted", id });
    } catch (error) {
        console.error("[projects] Project deletion failed", { id, message: error.message });
        return res.status(500).json({ error: "Unable to delete project" });
    }
});

export default projectsRouter;