export type FolderType = {
  _id: string;
  title: string;
  iconType: string;
  color: string;
  createdBy: string;
  noteIds: string[];
};

export type FolderTypeArrayWithPageInfo = {
  folders: FolderType[];
  pageInfo: {
    currentPage: number;
    totalItems: number;
    totalPages: number;
  };
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

export type GetFoldersForUserParams = {
  page: number;
};

export type GetIconTypeByFolderIdParams = {
  folderId?: string;
};

export type GetIconTypeByFolderIdReturnType = {
  iconType: string;
  color: string;
};

export type DeleteFolderByIdParams = {
  folderId: string;
};
