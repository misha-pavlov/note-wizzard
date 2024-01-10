import { Alert, Slide, Text } from "native-base";
import { useNetInfo } from "@react-native-community/netinfo";
import { FC } from "react";

const withNetInfo = (BaseComponent: FC) => {
  return (props: any): JSX.Element => {
    const { isConnected } = useNetInfo();
    return (
      <>
        <BaseComponent {...props} />
        <Slide in={!isConnected} placement="top">
          <Alert justifyContent="center" status="error" safeAreaTop={10}>
            <Alert.Icon />
            <Text color="error.600" fontWeight="medium">
              No Internet Connection
            </Text>
          </Alert>
        </Slide>
      </>
    );
  };
};

export default withNetInfo;
