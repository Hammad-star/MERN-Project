import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { Note as NoteModel } from "../models/notes";
import * as NotesApi from "../network/notes_api";
import styles from "../styles/NotesPage.module.css";
import styleUtils from "../styles/utils.module.css";
import AddEditNoteDialog from "./AddEditNoteDialog";
import Notes from "./Notes";

const NotesPageLoggedInView = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(false);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>();

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NotesApi.fetchNotes();
        // const response = await fetch("/api/notes", {
        //   method: "GET",
        // });
        // const notes = await response.json();
        setNotes(notes);
      } catch (error) {
        console.log(error);
        setShowNotesLoadingError(true);
        // alert(error);
      } finally {
        setNotesLoading(false);
      }
    }
    loadNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((n) => n._id !== note._id));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  const notesGrid = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesPage}`}>
      {notes.map((note) => (
        <Col key={note._id}>
          <Notes
            note={note}
            className={styles.note}
            onNoteClicked={setNoteToEdit}
            onDeleteNoteClicked={deleteNote}
          />
          {/* <Button
        onClick={async () => {
          try {
            await NotesApi.deleteNote(note._id);
            setNotes(notes.filter((n) => n._id !== note._id));
          } catch (error) {
            console.log(error);
            alert(error);
          }
        }}
      >
        Delete
      </Button> */}
        </Col>
      ))}
    </Row>
  );

  return (
    <>
      <Button
        onClick={() => setShowAddNoteDialog(true)}
        className={`mb-4 mt-1 ${styleUtils.blockCenter} `}
      >
        Add new note
      </Button>
      {notesLoading && <Spinner animation="border" variant="primary" />}
      {showNotesLoadingError && <div>Failed to load notes!</div>}
      {!notesLoading && !showNotesLoadingError && (
        <>{notes.length > 0 ? notesGrid : <div>No notes to show</div>}</>
      )}
      {showAddNoteDialog && (
        <AddEditNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setShowAddNoteDialog(false);
            setNotes([newNote, ...notes]);
            // window.location.reload();
          }}
        />
      )}
      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((n) => (n._id === updatedNote._id ? updatedNote : n))
            );
            setNoteToEdit(null);
          }}
        />
      )}
    </>
  );
};

export default NotesPageLoggedInView;
