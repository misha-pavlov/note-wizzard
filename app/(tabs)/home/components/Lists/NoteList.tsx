import { Text, Stack, View, Actionsheet, useDisclose } from "native-base";
import { FC, useCallback, useRef, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, useWindowDimensions } from "react-native";
import { useFocusEffect } from "expo-router";
import { constants } from "../../../../../config/constants";
import {
  NoteFolderRow,
  NoteFolderSquare,
  NoteWizardSpinner,
} from "../../../../../components";
import { NoteType } from "../../../../../dataTypes/note.types";
import {
  useCustomNavigation,
  useGetAllUserNotesQueryWithFetchMore,
  useNoteWizardTheme,
  usePreviousProps,
} from "../../../../../hooks";
import { useDeleteNoteByIdMutation } from "../../../../../store/noteApi/note.api";

type NoteListProps = {
  sortType: string | null;
  isAllTab?: boolean;
  isImportant?: boolean;
  hideHeader?: boolean;
};

const NoteList: FC<NoteListProps> = ({
  isAllTab,
  hideHeader,
  sortType,
  isImportant,
}) => {
  const isFirstRender = useRef(true);
  const [selected, setSelected] = useState<string | undefined>();
  const previousProps = usePreviousProps<NoteListProps>({
    isAllTab,
    hideHeader,
    sortType,
  });
  const [deleteNoteById] = useDeleteNoteByIdMutation();
  const { isOpen, onOpen, onClose } = useDisclose();
  const { width } = useWindowDimensions();
  const { navigate } = useCustomNavigation();
  const { currentTheme } = useNoteWizardTheme();
  const {
    notes,
    isLoading,
    fetchMore,
    isRefreshing,
    onRefresh,
    isFetchingMore,
  } = useGetAllUserNotesQueryWithFetchMore(isImportant);

  useFocusEffect(
    useCallback(() => {
      if (!isFirstRender.current) {
        onRefresh();
      }

      return () => {
        isFirstRender.current = false;
      };
    }, [])
  );

  const renderItem = useCallback(
    ({ item }: { item: NoteType }) =>
      sortType === constants.sortTypes.rows ? (
        <NoteFolderRow
          key={item._id}
          note={item}
          onPress={() =>
            navigate(constants.screens.note, {
              noteName: item.name,
              noteId: item._id,
            })
          }
          onLongPress={() => {
            setSelected(item._id);
            onOpen();
          }}
        />
      ) : (
        <NoteFolderSquare
          key={item._id}
          note={item}
          onPress={() =>
            navigate(constants.screens.note, {
              noteName: item.name,
              noteId: item._id,
            })
          }
        />
      ),
    [sortType]
  );

  if (isLoading || !previousProps) {
    return <NoteWizardSpinner />;
  }

  return (
    <Stack space={4}>
      {!hideHeader && (
        <Text fontWeight={700}>
          My {isAllTab ? "Notes" : "Important Notes"}
        </Text>
      )}

      {/* 32 - padding left + right, 87% - height to the bottom nav*/}
      <View width={width - 32} height="87%">
        <FlashList
          data={notes}
          renderItem={renderItem}
          estimatedItemSize={sortType === constants.sortTypes.rows ? 84 : 125}
          ListEmptyComponent={
            <Text textAlign="center" fontSize={16}>
              {constants.emptyLists.note}
            </Text>
          }
          // refetch FlashList on change sortType
          extraData={previousProps}
          numColumns={sortType === constants.sortTypes.rows ? 1 : 2}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          refreshControl={
            <RefreshControl
              tintColor={currentTheme.purple}
              refreshing={isRefreshing}
              onRefresh={onRefresh}
            />
          }
          onEndReached={fetchMore}
          ListFooterComponent={isFetchingMore ? <NoteWizardSpinner /> : null}
        />
      </View>

      <Actionsheet
        isOpen={isOpen}
        onClose={() => {
          setSelected(undefined);
          onClose();
        }}
      >
        <Actionsheet.Content>
          <Actionsheet.Item
            _pressed={{ opacity: 0.5 }}
            backgroundColor={currentTheme.red}
            onPress={() => {
              if (selected) {
                deleteNoteById({ noteId: selected });
              }

              setSelected(undefined);
              onClose();
            }}
          >
            Delete note
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Stack>
  );
};

export default NoteList;
