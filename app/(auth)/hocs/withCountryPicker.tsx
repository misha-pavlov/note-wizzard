import { FC, useState } from "react";
import { Text, View } from "native-base";
import {
  CountryPicker,
  CountryButton,
  ListHeaderComponentProps,
} from "react-native-country-codes-picker";
import { useWindowDimensions } from "react-native";
import { useNoteWizardTheme } from "../../../hooks";

export type SignInUpProps = {
  InputLeftElement?: JSX.Element;
};

const ListHeaderComponent = ({
  countries,
  lang,
  onPress,
}: ListHeaderComponentProps) => {
  return (
    <View
      style={{
        paddingBottom: 20,
      }}
    >
      <Text>Popular countries</Text>
      {countries?.map((country, index) => {
        return (
          <CountryButton
            key={index}
            item={country}
            name={country?.name?.[lang || "en"]}
            onPress={() => onPress(country)}
          />
        );
      })}
    </View>
  );
};

const withCountryPicker = (BaseComponent: FC<SignInUpProps>) => {
  return (props: SignInUpProps): JSX.Element => {
    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState("+1");
    const { dark } = useNoteWizardTheme();
    const { height } = useWindowDimensions();

    return (
      <>
        <BaseComponent
          {...props}
          InputLeftElement={
            <Text
              color={dark.main}
              onPress={() => setShow(true)}
              pl={3}
              fontSize={16}
            >
              {countryCode}
            </Text>
          }
        />
        <CountryPicker
          show={show}
          lang="us"
          // when picker button press you will get the country object with dial code
          pickerButtonOnPress={(item) => {
            console.log("🚀 ~ file: sign-in.tsx:243 ~ SignIn ~ item:", item);
            setCountryCode(item.dial_code);
            setShow(false);
          }}
          onBackdropPress={() => setShow(false)}
          ListHeaderComponent={ListHeaderComponent}
          popularCountries={["ua", "us"]}
          style={{ modal: { height: height / 2 } }}
          initialState=""
          inputPlaceholder="Search your country(by coutry code like '+1')"
        />
      </>
    );
  };
};

export default withCountryPicker;
