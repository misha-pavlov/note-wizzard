import { HStack, Pressable, Text, VStack, View } from "native-base";
import { Button, useWindowDimensions } from "react-native";
import { AVPlaybackStatusSuccess, Audio as ExpoAudio } from "expo-av";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Sound } from "expo-av/build/Audio";
import { Foundation } from "@expo/vector-icons";
import ProgressBarAnimated from "react-native-progress-bar-animated";
import { useNoteWizardTheme } from "../../../../../hooks";

const Audio = () => {
  const [sound, setSound] = useState<Sound>();
  const [isPlaying, setIsPlaying] = useState(false);
  const { currentTheme } = useNoteWizardTheme();
  const { width } = useWindowDimensions();

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playSound = useCallback(async () => {
    const soundStatus =
      (await sound?.getStatusAsync()) as AVPlaybackStatusSuccess;

    if (soundStatus?.isPlaying) {
      console.log("Pause Sound");
      await sound?.pauseAsync();
      setIsPlaying(false);
      return;
    }

    console.log("Loading Sound");
    const { sound: createdSound } = await ExpoAudio.Sound.createAsync({
      uri: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    });

    setSound(createdSound);

    console.log("Playing Sound");
    await createdSound.playAsync();
    setIsPlaying(true);
  }, [sound]);

  const audioFile = useMemo(
    () => (
      <Pressable
        _pressed={{ opacity: 0.5 }}
        backgroundColor={currentTheme.second}
        padding={3}
        borderRadius={15}
        onPress={playSound}
      >
        <HStack alignItems="center" justifyContent="space-between">
          <View w={28}>
            {isPlaying ? (
              <Foundation name="pause" size={28} color={currentTheme.purple} />
            ) : (
              <Foundation
                name="play-circle"
                size={28}
                color={currentTheme.purple}
              />
            )}
          </View>
          <ProgressBarAnimated
            width={width / 1.7}
            value={30}
            maxValue={100}
            backgroundColor={currentTheme.purple}
            borderColor={currentTheme.gray}
          />
          <Text>01:99:99</Text>
        </HStack>
      </Pressable>
    ),
    [isPlaying, width]
  );

  return (
    <VStack space={3}>
      {audioFile}
      {audioFile}
      {audioFile}
      {audioFile}
    </VStack>
  );
};

export default Audio;
