import { Center, HStack, Pressable, Text, VStack, View } from "native-base";
import { useWindowDimensions } from "react-native";
import { Audio as ExpoAudio } from "expo-av";
import { FC, useCallback, useEffect, useState } from "react";
import { Sound } from "expo-av/build/Audio";
import { Foundation } from "@expo/vector-icons";
import ProgressBarAnimated from "react-native-progress-bar-animated";
import { FlashList } from "@shopify/flash-list";
import { useNoteWizardTheme } from "../../../../../hooks";
import { NoteType } from "../../../../../dataTypes/note.types";
import { secondsToMinutesAndSeconds } from "../../../../../helpers/date-helpers";
import { NoteWizardSpinner } from "../../../../../components";

type AudioPropsType = {
  recorders: NoteType["recorders"];
};

type SavedRecorders = { uri: string; totalPlayTime: string; sound: Sound };

const Audio: FC<AudioPropsType> = ({ recorders }) => {
  const [playing, setPlaying] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [position, setPosition] = useState<{ [x: string]: number } | undefined>(
    {}
  );
  const [duration, setDuration] = useState<{ [x: string]: number } | undefined>(
    {}
  );
  const [savedRecorders, setSavedRecorders] = useState<SavedRecorders[]>([]);

  const { currentTheme } = useNoteWizardTheme();
  const { width } = useWindowDimensions();

  useEffect(() => {
    return savedRecorders.length
      ? () => {
          console.log("Unloading Sound");
          savedRecorders.forEach(async (sr) => sr.sound.unloadAsync());
        }
      : undefined;
  }, [savedRecorders]);

  useEffect(() => {
    if (recorders?.length) {
      (async () =>
        recorders.forEach(async (uri, index, array) => {
          try {
            const { status, sound } = await ExpoAudio.Sound.createAsync({
              uri,
            });
            const sr = savedRecorders;

            if (status.isLoaded) {
              // Access the duration property to get the total play time in seconds
              const totalPlayTime = secondsToMinutesAndSeconds(
                (status.durationMillis || 0) / 1000
              );
              const existsElement = sr.find(({ uri: srUri }) => srUri === uri);

              if (!existsElement) {
                sr.push({ uri, totalPlayTime, sound });
              }
              setSavedRecorders(sr);
            }
          } catch (error) {
            console.error(error);
          }

          if (index === array.length - 1) {
            setIsLoading(false);
          }
        }))();
    } else {
      setIsLoading(false);
    }
  }, [recorders, savedRecorders]);

  const playSound = useCallback(
    async (uri: string) => {
      const savedRecord = savedRecorders.find((sr) => sr.uri === uri);

      if (!savedRecord) return;

      const { sound } = savedRecord;
      const soundStatus = await sound.getStatusAsync();

      if (soundStatus.isLoaded && soundStatus?.isPlaying) {
        console.log("Pause Sound");
        await sound.pauseAsync();
        setPlaying("");
        setPosition({});
        setDuration({});
        return;
      }

      try {
        console.log("Playing Sound");
        setPlaying(uri);
        await sound.replayAsync();

        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded) {
            setPosition({ [uri]: status.positionMillis });
            setDuration({ [uri]: status.durationMillis || 0 });

            if (status.didJustFinish) {
              setPlaying("");
              setPosition({ [uri]: 0 });
              setDuration({ [uri]: 0 });
            }
          }
        });
      } catch (error) {
        console.error(error);
      }
    },
    [savedRecorders, setPlaying]
  );

  const audioFile = useCallback(
    ({ item }: { item: SavedRecorders }) => {
      const uri = item.uri;
      let value = 0;

      if (position && duration) {
        value = (100 * position[uri]) / duration[uri];
      }

      return (
        <Pressable
          _pressed={{ opacity: 0.5 }}
          backgroundColor={currentTheme.second}
          padding={3}
          borderRadius={15}
          onPress={() => playSound(uri)}
        >
          <HStack alignItems="center" justifyContent="space-between">
            <View w={28}>
              {playing === uri ? (
                <Foundation
                  name="pause"
                  size={28}
                  color={currentTheme.purple}
                />
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
              value={value}
              maxValue={100}
              backgroundColor={currentTheme.purple}
              borderColor={currentTheme.gray}
            />
            <Text>{item.totalPlayTime}</Text>
          </HStack>
        </Pressable>
      );
    },
    [playing, width, playSound, position, duration]
  );

  if (!recorders) {
    return null;
  }

  if (isLoading || savedRecorders.length !== recorders.length) {
    return (
      <Center>
        <VStack>
          <NoteWizardSpinner />
          <Text>Sorry for long loading :)</Text>
        </VStack>
      </Center>
    );
  }

  return (
    <FlashList
      ItemSeparatorComponent={() => <View mt={3} />}
      data={savedRecorders}
      renderItem={audioFile}
      estimatedItemSize={52}
      extraData={{ playing, recorders, savedRecorders, position, duration }}
      keyExtractor={(item) => item.uri}
    />
  );
};

export default Audio;
