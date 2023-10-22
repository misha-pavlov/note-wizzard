export type FolderType = {
  _id: string;
  title: string;
  iconType: string;
  createdBy: string;
  noteIds: string[];
};

export type CreateParams = {
  title: string;
  iconType: string;
  noteIds: string[];
};

export type UpdateParams = {
  folderId: string;
  newTitle?: string;
  newIconType?: string;
  newNoteIds?: string[];
};
