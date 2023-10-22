import { FolderType } from "./folder.types";

export type NoteType = {
  _id: string;
  name: string;
  createdBy: string;
  sharedWith: string[];
  privacy: "private" | "public";
  createdAt: Date;
  title?: string;
  reminder?: Date;
  recorders?: string[];
  content?: string;
  folderId?: string;
};

export type GetNotesByIdsParams = {
  noteIds: string[];
};

export type GetNoteByIdParams = {
  noteId: string;
};

export type UpdateParams = {
  noteId: string;
  newTitle?: string;
  newContent?: string;
  newName?: string;
  newReminder?: Date;
  newPrivacy?: "private" | "public";
  newSharedWith?: string[];
  newRecorders?: string[];
  rewriteRecorders?: boolean;
  rewriteSharedWith?: boolean;
};

export type NoteFolderComponentPropsTypes = {
  onPress: () => void;

  selected?: boolean;
  withoutDate?: boolean;
  note?: NoteType;
  folder?: FolderType;
};
