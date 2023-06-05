import { Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/auth";

export const Index = () => {
  const { signOut } = useAuth();

  console.log("123");

  return (
    <SafeAreaView>
      <Text onPress={() => signOut()}>Sign Out</Text>
    </SafeAreaView>
  );
};

export default Index;
