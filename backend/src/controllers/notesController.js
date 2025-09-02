import Note from "../models/Note.js";

// make functions async as api calls take time, dont have to wait for it to finish

export async function getAllNotes(_, res) {
    try {
        const notes = await Note.find().sort({createdAt:-1}); // show the newest note first
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller:", error)
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({message:"Note not found"});
        res.status(200).json(note);
    
    } catch (error) {
        console.error("Error in getNoteById controller:", error);
        res.status(500).json({message: "Internal server error"});

    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content });
        console.log(title, content);

        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error in createNote controller:", error)
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body; // new values to update
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content },
            { new: true } // returns the updateed note, not old one
        );

        // valid id (length) but not found
        if (!updatedNote) return res.status(404).json({ message: "Note not found" });

        res.status(200).json(updatedNote);
    } catch (error) { // id is invalid format
        console.error("Error in updateNote controller:", error)
        res.status(500).json({ message: "Internal server error" });
    }
};

export async function deleteNote(req, res) {

    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note deleted successfully!" });

    } catch (error) {
        console.error("Error in deleteNote controller:", error)
        res.status(500).json({ message: "Internal server error" });
    }
}


