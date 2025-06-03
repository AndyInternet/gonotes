import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import React from "react";
import { useParams } from "react-router-dom";
import { NoNoteSelected } from "./NoNotes";
import { NoteEditor } from "./NoteEditor";

export const NotePanel: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <NoNoteSelected />;

  return <NoteEditor id={id} />;
};
