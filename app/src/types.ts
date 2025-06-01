export interface INoteResponseDTO {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  body: string | null;
}

export interface INoteRequestDTO {
  title: string;
  body: string | null;
}

export interface INoteUpdateRequestDTO {
  id: string;
  note: INoteRequestDTO;
}

export interface INote {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  body: string;
}
