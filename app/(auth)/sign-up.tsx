import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "native-base";
import { useAuth } from "../../context/auth";

const SignUp = () => {
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
      <Text color="black" onPress={() => signIn()}>SignUp</Text>
    </SafeAreaView>
  );
};

export default SignUp;
