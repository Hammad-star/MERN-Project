import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../util/assertIsDefined";

export const getNotes: RequestHandler = async (req, res, next) => {
  const authentecatedUserId = req.session.userId;

  try {
    // throw new Error("Something went wrong");
    assertIsDefined(authentecatedUserId);

    const notes = await NoteModel.find({ userId: authentecatedUserId }).exec();
    res.status(200).json(notes); // send notes back to client
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  const authentecatedUserId = req.session.userId;

  try {
    assertIsDefined(authentecatedUserId);

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note ID");
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not found!");
    }

    if (!note.userId.equals(authentecatedUserId)) {
      throw createHttpError(
        401,
        "Not authorized. You can not access this note"
      );
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface CreateNoteBody {
  title?: string;
  text?: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;
  const authentecatedUserId = req.session.userId;

  try {
    assertIsDefined(authentecatedUserId);

    if (!title) {
      throw createHttpError(400, "Title is required");
    }

    const newNote = await NoteModel.create({
      userId: authentecatedUserId,
      title: title,
      text: text,
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

interface UpdateNoteParams {
  noteId: string;
}

interface UpdateNoteBody {
  title?: string;
  text?: string;
}

export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;
  const authentecatedUserId = req.session.userId;

  try {
    assertIsDefined(authentecatedUserId);
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note ID");
    }

    if (!newTitle) {
      throw createHttpError(400, "Title is required");
    }
    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not found!");
    }

    if (!note.userId.equals(authentecatedUserId)) {
      throw createHttpError(
        401,
        "Not authorized. You can not access this note"
      );
    }

    note.title = newTitle;
    note.text = newText;

    const updatedNote = await note.save();
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  const authentecatedUserId = req.session.userId;
  try {
    assertIsDefined(authentecatedUserId);

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note ID");
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not found!");
    }

    if (!note.userId.equals(authentecatedUserId)) {
      throw createHttpError(
        401,
        "Not authorized. You can not access this note"
      );
    }

    // await note.remove();
    await NoteModel.deleteOne({ _id: noteId }).exec();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
