import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useEffect, useMemo, useState } from "react";
import { useGetNoteByIdQuery, useUpdateNoteMutation } from "../api";
import { BlockNoteEditor, type Block } from "@blocknote/core";
import { useDebouncedEffect } from "../hooks/useDebouncedEffect";

interface Props {
  id: string;
}

export const NoteEditor: React.FC<Props> = ({ id }) => {
  const { data: note, isLoading, error } = useGetNoteByIdQuery({ id });
  const [updateNote] = useUpdateNoteMutation();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<JSON>([
    { type: "paragraph" },
  ] as unknown as JSON);

  useEffect(() => {
    setTitle(note?.title ?? "");
    setBody(note?.body ?? ([{ type: "paragraph" }] as unknown as JSON));
  }, [note]);

  useDebouncedEffect(
    () => {
      if (!id || !title.trim()) return;
      try {
        updateNote({
          id: id,
          note: {
            title: title,
            body: body,
          },
        });
      } catch (error) {
        console.error("Failed to save note:", error);
      }
    },
    [title, body],
    500
  );

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleEditorChange = (document: Block[]) => {
    setBody(JSON.parse(JSON.stringify(document)));
  };

  const editor = useMemo(() => {
    // Ensure we always have at least one block
    const initialContent =
      note?.body && Array.isArray(note.body) && note.body.length > 0
        ? (note.body as Block[])
        : ([{ type: "paragraph" }] as Block[]);

    return BlockNoteEditor.create({
      initialContent: initialContent,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isLoading) return <div>loading ...</div>;
  if (error) return <div>error</div>;

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
        padding: "1rem",
      }}
    >
      <Box>
        <Box>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Note title..."
            value={title}
            onChange={handleTitleChange}
            sx={{ marginBottom: 2 }}
          />
          <BlockNoteView
            editor={editor}
            onChange={() => handleEditorChange(editor.document)}
          />
        </Box>
      </Box>
    </Box>
  );
};
