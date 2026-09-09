import express from "express";
import mongoose from "mongoose";

const skillsRouter = express.Router();

const skillSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, trim: true, index: true },
    skillTitle: { type: String, required: true, trim: true },
    skillDescription: { type: String, trim: true, default: "" },
    skillLevel: { type: String, trim: true, default: "" },
    skillCategory: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

const Skill = mongoose.models.Skill || mongoose.model("Skill", skillSchema, "skills");

skillsRouter.post("/", async (req, res) => {
  const { uid, skillTitle, skillDescription, skillLevel, skillCategory } = req.body ?? {};

  if (!uid || !skillTitle) {
    return res.status(400).json({ error: "uid and skillTitle are required" });
  }

  try {
    const skill = await Skill.create({
      uid,
      skillTitle,
      skillDescription,
      skillLevel,
      skillCategory,
    });

    return res.status(201).json(skill);
  } catch (error) {
    console.error("[skills] Skill creation failed", { message: error.message });
    return res.status(500).json({ error: "Unable to save skill" });
  }
});

skillsRouter.get("/", async (req, res) => {
  const filter = req.query.uid ? { uid: req.query.uid } : {};

  try {
    const skills = await Skill.find(filter).sort({ createdAt: -1 }).lean();
    return res.status(200).json(skills);
  } catch (error) {
    console.error("[skills] Skill lookup failed", { message: error.message });
    return res.status(500).json({ error: "Unable to get skills" });
  }
});

skillsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid skill id" });
  }

  try {
    const skill = await Skill.findByIdAndDelete(id);

    if (!skill) {
      return res.status(404).json({ error: "Skill not found" });
    }

    return res.status(200).json({ message: "Skill deleted", id });
  } catch (error) {
    console.error("[skills] Skill deletion failed", { id, message: error.message });
    return res.status(500).json({ error: "Unable to delete skill" });
  }
});

export default skillsRouter;