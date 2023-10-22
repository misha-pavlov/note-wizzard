export type FolderType = {
  _id: string;
  title: string;
  iconType: string;
  color: string;
  createdBy: string;
  noteIds: string[];
};

export type CreateParams = {
  title: string;
  color: string;
  iconType: string;
  noteIds: string[];
};

export type UpdateParams = {
  folderId: string;
  newTitle?: string;
  newIconType?: string;
  newNoteIds?: string[];
};
