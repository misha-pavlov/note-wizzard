declare module "react-native-progress-bar-animated" {
  export interface ProgressBarProps {
    height?: number;
    width: number;
    value?: number;
    maxValue?: number;
    backgroundColor?: string;
    borderColor?: string;
    // more props here: https://github.com/rafaelmotta/react-native-progress-bar-animated
  }

  export default class ProgressBar extends React.Component<ProgressBarProps> {}
}
