import { Container } from "react-bootstrap";
import NotesPageLoggedInView from "../components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "../components/NotesPageLoggedOutView";
import { User } from "../models/users";
import styles from "../styles/NotesPage.module.css";

interface NotesPageProps {
  getLoggedInUser: User | null;
}

const NotesPage = ({ getLoggedInUser }: NotesPageProps) => {
  return (
    <Container className={styles.notesPage}>
      <>
        {getLoggedInUser ? (
          <NotesPageLoggedInView />
        ) : (
          <NotesPageLoggedOutView />
        )}
      </>
    </Container>
  );
};

export default NotesPage;
