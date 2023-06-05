import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "native-base";
import { useAuth } from "../../context/auth";

const SignIn = () => {
  const { signIn } = useAuth();
  console.log("sign in ()");
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "red",
      }}
    >
      <Text onPress={() => signIn()}>Sign In</Text>
    </SafeAreaView>
  );
};

export default SignIn;
