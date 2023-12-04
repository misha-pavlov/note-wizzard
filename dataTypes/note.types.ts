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
  isImportant?: boolean;
};

export type NoteTypeArrayWithPageInfo = {
  notes: NoteType[];
  pageInfo: {
    currentPage: number;
    totalItems: number;
    totalPages: number;
  };
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

export type GetAllUserNotesParams = {
  page: number;
  isImportant?: boolean;
  onlyWithoutFolder?: boolean;
};

export type NoteFolderComponentPropsTypes = {
  onPress: () => void;
  selected?: boolean;
  withoutDate?: boolean;
  note?: NoteType;
  folder?: FolderType;
};

export type GetUserStatisticReturnType = {
  allNotesCount: number;
  remindersCount: number;
  importantCount: number;
};

export type SearchNotesAndFoldersParams = {
  searchTerm: string;
};

export type SearchNotesAndFoldersReturnType = {
  notes: NoteType[];
  folders: FolderType[];
};

export type UpdateNoteParams = {
  noteId: string;
  title?: string;
  content?: string;
  name?: string;
  reminder?: Date;
  privacy?: "private" | "public";
  sharedWith?: string[];
  recorders?: string[];
  folderId?: string;
  isImportant?: boolean;
};

export type SpeechToTextParams = {
  uri: string;
};

export type SpeechToTextReturnType = {
  transcript: string;
};
