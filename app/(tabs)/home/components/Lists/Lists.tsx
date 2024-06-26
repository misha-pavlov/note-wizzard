import { View } from "native-base";
import { FC, useMemo } from "react";
import NoteList from "./NoteList";
import { TABS_KEYS } from "../../config/constants";
import FoldersList from "./FoldersList";
import SearchList from "./SearchList";

type ListProps = {
  currentTab: string;
  searchTerm: string;
  sortType: string | null;
};

const Lists: FC<ListProps> = ({ currentTab, sortType, searchTerm }) => {
  const renderList = useMemo(() => {
    switch (currentTab) {
      case TABS_KEYS.all:
        return <NoteList isAllTab sortType={sortType} />;
      case TABS_KEYS.folders:
        return <FoldersList sortType={sortType} />;
      case TABS_KEYS.important:
        return <NoteList sortType={sortType} isImportant />;
      default:
        return <SearchList searchTerm={searchTerm} />;
    }
  }, [currentTab, sortType, searchTerm]);

  return <View>{renderList}</View>;
};

export default Lists;
