import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Note as NoteModel } from "./models/notes";
import Notes from "./components/Notes";
import styles from "./styles/NotesPage.module.css";
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from "./components/AddNoteDialog";
import { set } from "react-hook-form";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        // const response = await fetch("/api/notes", {
        //   method: "GET",
        // });
        // const notes = await response.json();
        setNotes(notes);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  return (
    <Container>
      <Button onClick={() => setShowAddNoteDialog(true)}>Add new note</Button>
      <Row xs={1} md={2} xl={3} className="g-4 ">
        {notes.map((note) => (
          <Col key={note._id}>
            <Notes note={note} className={styles.note} />
          </Col>
        ))}
      </Row>
      {showAddNoteDialog && (
        <AddNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setShowAddNoteDialog(false);
            setNotes([newNote, ...notes]);
            // window.location.reload();
          }}
        />
      )}
    </Container>
  );
}

export default App;
