import { Pressable, Text, HStack } from "native-base";
import React, { FC, useMemo } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { useNoteWizardTheme } from "../../../../../hooks";
import { TABS } from "../../config/constants";

type NoteWizardTabsProps = {
  selected: string;
  selectTab: (key: string) => void;
};

const NoteWizardTabs: FC<NoteWizardTabsProps> = ({ selected, selectTab }) => {
  const { currentTheme } = useNoteWizardTheme();
  const renderTabs = useMemo(
    () =>
      TABS.map((tab) => {
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
    [selected, currentTheme]
  );

  return <HStack justifyContent="space-between">{renderTabs}</HStack>;
};

export default NoteWizardTabs;
