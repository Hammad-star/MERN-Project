import { User } from "../models/users";
import * as NoteApi from "../network/notes_api";
import { Button, Form, Modal, Navbar } from "react-bootstrap";

interface NavBarLoggedInViewProps {
  user: User;
  onLogoutSuccessful: () => void;
}

const NavBarLoggedInView = ({
  user,
  onLogoutSuccessful,
}: NavBarLoggedInViewProps) => {
  async function logout() {
    try {
      await NoteApi.logout();
      onLogoutSuccessful();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <>
      <Navbar.Text className="me-2">Signed in as :{user.username}</Navbar.Text>
      <Button onClick={logout}>Log out</Button>
    </>
  );
};

export default NavBarLoggedInView;
