import { Text, HStack } from "native-base";
import { FC } from "react";

type SettingsItemProps = {
  icon: JSX.Element;
  settingTitle: string;
  rightItem?: JSX.Element;
};

const SettingsItem: FC<SettingsItemProps> = ({
  icon,
  settingTitle,
  rightItem,
}) => {
  return (
    <HStack alignItems="center" justifyContent="space-between">
      <HStack alignItems="center" space={4}>
        {icon}
        <Text>{settingTitle}</Text>
      </HStack>

      {rightItem}
    </HStack>
  );
};

export default SettingsItem;
