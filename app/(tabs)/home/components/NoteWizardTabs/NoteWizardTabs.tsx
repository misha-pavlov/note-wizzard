import { Pressable, Text, HStack } from "native-base";
import React, { FC, useMemo } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { useNoteWizardTheme } from "../../../../../hooks";

type NoteWizardTabsProps = {
  tabs: { title: string; icon: string; key: string }[];
  selected: string;
  selectTab: (key: string) => void;
};

const NoteWizardTabs: FC<NoteWizardTabsProps> = ({
  tabs,
  selected,
  selectTab,
}) => {
  const { currentTheme } = useNoteWizardTheme();
  const renderTabs = useMemo(
    () =>
      tabs.map((tab) => {
        const isSelected = selected === tab.key;
        const backgroundColor = isSelected
          ? currentTheme.purple
          : currentTheme.second;
        const color = isSelected ? currentTheme.main : currentTheme.purple;
        const animation = isSelected ? "rubberBand" : undefined;

        return (
          <Pressable onPress={() => selectTab(tab.key)} key={tab.key}>
            <Animatable.View
              animation={animation}
              easing="linear"
              useNativeDriver
            >
              <HStack
                space={2}
                backgroundColor={backgroundColor}
                py={2}
                px={4}
                borderRadius="full"
              >
                <MaterialCommunityIcons
                  //  @ts-ignore - name has unique type
                  name={tab.icon}
                  size={20}
                  color={color}
                />
                <Text color={color}>{tab.title}</Text>
              </HStack>
            </Animatable.View>
          </Pressable>
        );
      }),
    [selected]
  );

  return <HStack justifyContent="space-between">{renderTabs}</HStack>;
};

export default NoteWizardTabs;
