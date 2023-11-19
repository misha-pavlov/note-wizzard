import { HStack, Pressable, Text, View } from "native-base";
import { useWindowDimensions } from "react-native";
import { AVPlaybackStatusSuccess, Audio as ExpoAudio } from "expo-av";
import { FC, useCallback, useEffect, useState } from "react";
import { Sound } from "expo-av/build/Audio";
import { Foundation } from "@expo/vector-icons";
import ProgressBarAnimated from "react-native-progress-bar-animated";
import { FlashList } from "@shopify/flash-list";
import { useNoteWizardTheme } from "../../../../../hooks";
import { NoteType } from "../../../../../dataTypes/note.types";

type AudioPropsType = {
  recorders: NoteType["recorders"];
};

const Audio: FC<AudioPropsType> = ({ recorders }) => {
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

  const playSound = useCallback(
    async (uri: string) => {
      const soundStatus =
        (await sound?.getStatusAsync()) as AVPlaybackStatusSuccess;

      if (soundStatus?.isPlaying) {
        console.log("Pause Sound");
        await sound?.pauseAsync();
        setIsPlaying(false);
        return;
      }

      console.log("Loading Sound");
      try {
        const { sound: createdSound } = await ExpoAudio.Sound.createAsync({
          uri,
        });

        setSound(createdSound);

        console.log("Playing Sound");
        await createdSound.playAsync();
        setIsPlaying(true);
      } catch (error) {
        console.error(error);
      }
    },
    [sound]
  );

  const audioFile = useCallback(
    ({ item }: { item: string }) => (
      <Pressable
        _pressed={{ opacity: 0.5 }}
        backgroundColor={currentTheme.second}
        padding={3}
        borderRadius={15}
        onPress={() => playSound(item)}
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

  if (!recorders) {
    return null;
  }

  return (
    <FlashList
      ItemSeparatorComponent={() => <View mt={3} />}
      data={recorders}
      renderItem={audioFile}
      estimatedItemSize={52}
      extraData={recorders}
    />
  );
};

export default Audio;
