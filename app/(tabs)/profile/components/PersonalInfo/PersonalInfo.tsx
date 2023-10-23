import { Text, VStack, Divider, HStack } from "native-base";
import { FC, useCallback } from "react";
import { FontAwesome5, Ionicons, Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import { parsePhoneNumber } from "libphonenumber-js";
import { useNoteWizardTheme } from "../../../../../hooks";
import { UserType } from "../../../../../dataTypes/user.types";
import { getUserName } from "../../../../../helpers/user-helpers";

type RenderItemProps = {
  icon: JSX.Element;
  text: string;
  borderRadiusTop?: boolean;
  borderRadiusBottom?: boolean;
};
type PersonalInfoPropsTypes = {
  user: UserType;
};

const PersonalInfo: FC<PersonalInfoPropsTypes> = ({ user }) => {
  const { currentTheme } = useNoteWizardTheme();
  const phoneNumber = parsePhoneNumber(user.phone);

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
        text: getUserName(user),
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
        text: user?.birthday
          ? dayjs(user?.birthday).format("DD/MM/YYYY")
          : "No date",
      })}
      {renderItem({
        icon: (
          <FontAwesome5
            name="phone-square-alt"
            size={18}
            color={currentTheme.font}
          />
        ),
        text: phoneNumber.formatInternational(),
      })}
      {renderItem({
        icon: (
          <Ionicons name="mail-outline" size={18} color={currentTheme.font} />
        ),
        text: user.email || "No email",
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
