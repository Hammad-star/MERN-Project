import { Note } from "../models/notes";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw new Error(errorMessage);
  }
}

export async function fetchNotes(): Promise<Note[]> {
  const response = await fetchData("/api/notes", { method: "GET" });
  return response.json();
}

export interface CreateNoteRequest {
  title: string;
  text?: string;
}

export async function createNote(note: CreateNoteRequest): Promise<Note> {
  const response = await fetchData("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return response.json();
}

export interface UpdateNoteRequest {
  title?: string;
  text?: string;
}

export async function updateNote(
  noteId: string,
  note: UpdateNoteRequest
): Promise<Note> {
  const response = await fetchData(`/api/notes/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return response.json();
}

export async function deleteNote(noteid: string): Promise<void> {
  await fetchData(`/api/notes/${noteid}`, { method: "DELETE" });
}
