import { View, Text, Pressable, Box } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Vibration, Animated, Easing } from "react-native";
import { Audio } from "expo-av";
import { useSearchParams } from "expo-router";
import {
  useCallbackOnUnmount,
  useCustomNavigation,
  useNoteWizardTheme,
} from "../../../hooks";
import { uploadAudio } from "../../../helpers/audio-helpers";
import { useCurrentUserQuery } from "../../../store/userApi/user.api";
import {
  useGetNoteByIdQuery,
  useUpdateNoteMutation,
} from "../../../store/noteApi/note.api";
import { secondsToMinutesAndSeconds } from "../../../helpers/date-helpers";
import { NoteWizardSpinner } from "../../../components";

const Recording = () => {
  const params = useSearchParams();
  const noteId = params.noteId as string;
  const { goBack } = useCustomNavigation();
  const { currentTheme } = useNoteWizardTheme();

  const { data: currentUser } = useCurrentUserQuery();
  const { data: noteById, isLoading } = useGetNoteByIdQuery(
    {
      noteId,
    },
    {
      skip: !noteId,
    }
  );
  const [updateNote] = useUpdateNoteMutation();

  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording>();
  const [time, setTime] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const spinValue = useRef(new Animated.Value(0)).current;

  const startStopwatch = useCallback(() => {
    startTimeRef.current = Date.now() - time * 1000;
    intervalRef.current = setInterval(() => {
      setTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
  }, [intervalRef, startTimeRef]);

  const pauseStopwatch = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [intervalRef]);

  const startRecording = useCallback(async () => {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      startStopwatch();
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }, [recording, startStopwatch]);

  const stopRecording = useCallback(async () => {
    console.log("Stopping recording..");
    if (recording) {
      try {
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
        });
        const uri = recording.getURI();
        pauseStopwatch();
        console.log("Recording stopped and now uploading");

        if (uri && currentUser) {
          const uploadedUrl = await uploadAudio(uri, noteId, currentUser?._id);
          console.log("Uploading done");
          updateNote({
            noteId,
            recorders: [...(noteById?.recorders || []), uploadedUrl],
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
    setRecording(undefined);
    setTimeout(goBack, 10)
  }, [recording, currentUser, noteId, noteById, pauseStopwatch]);

  const extraStopRecording = useCallback(async () => {
    if (recording && isRecording) {
      console.log("Extra stopping recording..");
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      console.log("Recording stopped");
    }
    setRecording(undefined);
  }, [recording, isRecording]);

  // max recording time is 5 mins(300 seconds)
  useEffect(() => {
    if (time === 300) {
      stopRecording();
    }
  }, [time]);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const recordingAnimation = useMemo(
    () => (
      <View
        position="absolute"
        top={100}
        left="33%"
        justifyContent="center"
        alignItems="center"
      >
        <View position="absolute">
          <Text fontSize={25}>{secondsToMinutesAndSeconds(time)}</Text>
        </View>
        <Animated.View
          style={[
            {
              width: 150,
              height: 150,
              borderWidth: 2,
              borderColor: currentTheme.purple,
            },
            {
              transform: [{ rotate: spin }],
            },
          ]}
        />
      </View>
    ),
    [time]
  );

  useCallbackOnUnmount(extraStopRecording);

  if (isLoading) {
    return <NoteWizardSpinner />;
  }

  return (
    <View
      position="relative"
      flex={1}
      backgroundColor={currentTheme.background}
    >
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
