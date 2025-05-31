CREATE TABLE notes (
   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   title VARCHAR(1024) NOT NULL,
   body TEXT
);

CREATE INDEX idx_notes_updated_at ON notes(updated_at);