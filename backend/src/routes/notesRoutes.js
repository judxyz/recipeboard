import express from "express";
import { createNote, getAllNotes, getNoteById, updateNote, deleteNote } from "../controllers/notesController.js";
const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);  // id is dynamic at end of http method
router.delete("/:id", deleteNote);

export default router;

// app.get("/api/notes", (req, res) => {
//     res.status(200).send("you got 1000 notes");
// });

// app.post("/api/notes", (req, res) => {
//     res.status(201).json({message: "note was created!"});
// })

// app.put("/api/notes/:id", (req, res) => { // id is dynamic at end of http method
//     res.status(200).json({message: "note was updated successfully!"});
// })

// app.delete("/api/notes/:id", (req, res) => {
//     res.status(200).json({message: "note was deleted successfully!"});
// })