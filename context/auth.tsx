import { useRouter, useSegments } from "expo-router";
import React from "react";

type JWTType = Record<string, string> | string | null;
type ValueType = {
  signIn: VoidFunction;
  signOut: VoidFunction;
  jwt: JWTType;
};

const defaultValue = {
  signIn: () => null,
  signOut: () => null,
  jwt: null,
};

const AuthContext = React.createContext<ValueType>(defaultValue);

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(jwt: JWTType) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !jwt &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/sign-in");
    } else if (jwt && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/");
    }
  }, [jwt, segments]);
}

export function Provider(props: { children: JSX.Element }) {
  const [jwt, setAuth] = React.useState<JWTType>(null);

  useProtectedRoute(jwt);

  return (
    <AuthContext.Provider
      value={{
        signIn: () => setAuth({}),
        signOut: () => setAuth(null),
        jwt,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
