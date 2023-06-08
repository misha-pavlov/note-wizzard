import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "native-base";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/auth";

const SignIn = () => {
  const { signIn } = useAuth();
  const router = useRouter();
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
      <Text color="blue.100" onPress={() => signIn()}>
        Sign In
      </Text>
      <Text color="red.100" onPress={() => router.push("/sign-up")}>
        Sign 123
      </Text>
    </SafeAreaView>
  );
};

export default SignIn;
