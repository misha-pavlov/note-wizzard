import { View } from "native-base";
import { FC, useMemo } from "react";
import NoteList from "./NoteList";
import { TABS_KEYS } from "../../config/constants";
import FoldersList from "./FoldersList";
import SearchList from "./SearchList";

type ListProps = {
  currentTab: string;
};

const Lists: FC<ListProps> = ({ currentTab }) => {
  const renderList = useMemo(() => {
    switch (currentTab) {
      case TABS_KEYS.all:
        return <NoteList isAllTab />;
      case TABS_KEYS.folders:
        return <FoldersList />;
      case TABS_KEYS.important:
        return <NoteList />;
      default:
        return <SearchList />;
    }
  }, [currentTab]);

  return <View>{renderList}</View>;
};

export default Lists;
