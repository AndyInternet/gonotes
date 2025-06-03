import { BlockNoteEditor, type Block } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useEffect, useMemo, useState } from "react";
import { useGetNoteByIdQuery, useUpdateNoteMutation } from "../api";
import { useDebouncedEffect } from "../hooks/useDebouncedEffect";

interface Props {
  id: string;
}

const defaultTitle = "";
const defaultBody = [{ type: "paragraph" }];

export const NoteEditor: React.FC<Props> = ({ id }) => {
  const { data: note, isLoading, error } = useGetNoteByIdQuery({ id });
  const [updateNote] = useUpdateNoteMutation();
  const [title, setTitle] = useState<string>(defaultTitle);
  const [body, setBody] = useState<JSON>(defaultBody as unknown as JSON);

  useEffect(() => {
    setTitle(note?.title ?? defaultTitle);
    setBody(note?.body ?? (defaultBody as unknown as JSON));
  }, [note]);

  useDebouncedEffect(
    () => {
      if (title !== note?.title || body !== note?.body) {
        updateNote({
          id: id,
          note: {
            title: title ?? defaultTitle,
            body: body,
          },
        });
      }
    },
    [title, body],
    500
  );

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTitle(value);
  };

  const handleEditorChange = (document: Block[]) => {
    const value = JSON.parse(JSON.stringify(document)) ?? defaultBody;
    setBody(value);
  };

  const editor = useMemo(() => {
    const initialContent =
      note?.body && Array.isArray(note.body) && note.body.length > 0
        ? (note.body as Block[])
        : (defaultBody as Block[]);

    return BlockNoteEditor.create({
      initialContent: initialContent,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note?.id]);

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
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
            onFocus={(event) => event.target.select()}
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
