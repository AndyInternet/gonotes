export interface INote {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  body: JSON | null;
}

export interface INoteRequestDTO {
  title: string;
  body: JSON | null;
}

export interface INoteUpdateRequestDTO {
  id: string;
  note: INoteRequestDTO;
}
