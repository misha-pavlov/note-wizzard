import { useColorMode } from "native-base";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { usePathname } from "expo-router";
import { constants } from "../../config/constants";

const { signIn, signUp, forgotPassword, verification, newPassword } =
  constants.routes;

const ROUTES_WITH_DARK_STATUS_BAR = [
  signIn,
  signUp,
  forgotPassword,
  verification,
  newPassword,
];

const StatusBar = () => {
  const { colorMode } = useColorMode();
  const pathname = usePathname();

  return (
    <ExpoStatusBar
      style={
        colorMode === "dark" && !ROUTES_WITH_DARK_STATUS_BAR.includes(pathname)
          ? "light"
          : "dark"
      }
    />
  );
};

export default StatusBar;
