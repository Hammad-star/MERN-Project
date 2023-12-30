import React from "react";
import styles from "../styles/Note.module.css";
import { Note as NoteModel } from "../models/notes";
import { Card } from "react-bootstrap";
import { formatDate } from "../utils/formatDate";

interface NoteProps {
  note: NoteModel;
  className?: string;
}

export default function Notes({ note, className }: NoteProps) {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = `Created: ${formatDate(createdAt)} `;
  } else {
    createdUpdatedText = `Updated: ${formatDate(updatedAt)} `;
  }

  return (
    <Card className={`${styles.noteCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
    </Card>
  );
}
