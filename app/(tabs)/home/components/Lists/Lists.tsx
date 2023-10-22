import { View } from "native-base";
import { FC, useMemo } from "react";
import NoteList from "./NoteList";
import { TABS_KEYS } from "../../config/constants";
import FoldersList from "./FoldersList";
import SearchList from "./SearchList";

type ListProps = {
  currentTab: string;
  sortType: string | null;
};

const Lists: FC<ListProps> = ({ currentTab, sortType }) => {
  const renderList = useMemo(() => {
    switch (currentTab) {
      case TABS_KEYS.all:
        return <NoteList isAllTab sortType={sortType} />;
      case TABS_KEYS.folders:
        return <FoldersList sortType={sortType} />;
      case TABS_KEYS.important:
        return <NoteList sortType={sortType} />;
      default:
        return <SearchList />;
    }
  }, [currentTab, sortType]);

  return <View>{renderList}</View>;
};

export default Lists;
