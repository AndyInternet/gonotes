import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCreateNoteMutation } from "../api";
import { Add } from "@mui/icons-material";

export const NewNote: React.FC = () => {
  const [createNote, { isLoading }] = useCreateNoteMutation();
  const navigate = useNavigate();

  const handleCreateNote = async () => {
    try {
      const newNote = await createNote({
        title: "Untitled",
        body: [{ type: "paragraph" }] as unknown as JSON, // Empty BlockNote document
      }).unwrap();

      // Redirect to the new note
      navigate(`/note/${newNote.id}`);
    } catch (error) {
      console.error("Failed to create note:", error);
    }
  };

  return (
    <Button
      startIcon={<Add />}
      variant="outlined"
      onClick={handleCreateNote}
      disabled={isLoading}
      fullWidth
      sx={{ mb: 2 }}
    >
      {isLoading ? "Creating..." : "New Note"}
    </Button>
  );
};
