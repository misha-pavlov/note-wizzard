import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";

// Define a custom hook with the desired navigation type.
function useCustomNavigation<T extends ParamListBase>() {
  return useNavigation() as NavigationProp<T>;
}

export default useCustomNavigation;
