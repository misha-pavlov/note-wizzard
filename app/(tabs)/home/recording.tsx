import { View, Text, Pressable, Box } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useMemo, useState } from "react";
import { Vibration } from "react-native";
import { Audio } from "expo-av";
import { useNoteWizardTheme } from "../../../hooks";
import { RotateView } from "./components";

const Recording = () => {
  const { currentTheme } = useNoteWizardTheme();
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording>();

  // TODO: CHECK AN ISSUE BECAUSE DOESN'T WORK FOR NEW IOS
  // https://github.com/expo/expo/issues/21782
  const startRecording = useCallback(async () => {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }, [recording]);

  const stopRecording = useCallback(async () => {
    console.log("Stopping recording..");
    console.log(
      "🚀 ~ file: recording.tsx:37 ~ stopRecording ~ recording:",
      recording
    );
    if (recording) {
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      const uri = recording.getURI();
      console.log("Recording stopped and stored at", uri);
    }
    setRecording(undefined);
  }, [recording]);

  const recordingAnimation = useMemo(
    () => (
      <View mt={150} alignItems="center" position="relative">
        <RotateView duration={1000} />
        <RotateView duration={1500} />
        <RotateView duration={2000} />
        <Text fontSize={25} position="absolute" top={55}>
          2:30
        </Text>
      </View>
    ),
    []
  );

  return (
    <View position="relative" flex={1} backgroundColor={currentTheme.background}>
      {isRecording && recordingAnimation}
      <Pressable
        alignItems="center"
        position="absolute"
        right={0}
        left={0}
        bottom={150}
        _pressed={{ opacity: 0.5 }}
        onPress={() => {
          if (isRecording) {
            stopRecording();
          } else {
            startRecording();
          }
          Vibration.vibrate(1000);
          setIsRecording((prevProps) => !prevProps);
        }}
      >
        <Box
          backgroundColor={currentTheme.purple}
          padding={4}
          borderRadius="full"
          marginBottom={3}
        >
          {isRecording ? (
            <MaterialCommunityIcons
              name="stop-circle-outline"
              size={28}
              color={currentTheme.main}
            />
          ) : (
            <MaterialCommunityIcons
              name="microphone-outline"
              size={28}
              color={currentTheme.main}
            />
          )}
        </Box>
        <Text fontSize={16} fontWeight={700}>
          {isRecording ? " " : "Tap to start recording"}
        </Text>
      </Pressable>
    </View>
  );
};

export default Recording;
