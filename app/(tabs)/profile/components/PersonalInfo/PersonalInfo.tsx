import { Text, VStack, Divider, HStack } from "native-base";
import { useCallback } from "react";
import { FontAwesome5, Ionicons, Feather } from "@expo/vector-icons";
import { useNoteWizardTheme } from "../../../../../hooks";

type RenderItemProps = {
  icon: JSX.Element;
  text: string;
  borderRadiusTop?: boolean;
  borderRadiusBottom?: boolean;
};

const PersonalInfo = () => {
  const { currentTheme } = useNoteWizardTheme();

  const renderItem = useCallback(
    ({ icon, text, borderRadiusTop, borderRadiusBottom }: RenderItemProps) => (
      <>
        <HStack
          backgroundColor={currentTheme.second}
          p={3}
          alignItems="center"
          space={4}
          {...(borderRadiusTop && { borderTopRadius: 15 })}
          {...(borderRadiusBottom && { borderBottomRadius: 15 })}
        >
          {icon}
          <Text fontSize={15}>{text}</Text>
        </HStack>

        {!borderRadiusBottom && <Divider backgroundColor={currentTheme.main} />}
      </>
    ),
    [currentTheme]
  );

  return (
    <VStack>
      {renderItem({
        icon: <FontAwesome5 name="user" size={18} color={currentTheme.font} />,
        text: "First Last",
        borderRadiusTop: true,
      })}
      {renderItem({
        icon: (
          <FontAwesome5
            name="calendar-alt"
            size={18}
            color={currentTheme.font}
          />
        ),
        text: "26/06/1998",
      })}
      {renderItem({
        icon: (
          <FontAwesome5
            name="phone-square-alt"
            size={18}
            color={currentTheme.font}
          />
        ),
        text: "818 123 4567",
      })}
      {renderItem({
        icon: (
          <Ionicons name="mail-outline" size={18} color={currentTheme.font} />
        ),
        text: "FirstLast@gmail.com",
      })}
      {renderItem({
        icon: <Feather name="eye" size={18} color={currentTheme.font} />,
        text: "Password",
        borderRadiusBottom: true,
      })}
    </VStack>
  );
};

export default PersonalInfo;
