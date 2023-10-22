import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export const getFolderTypeIcon = (
  iconType: string,
  size = 24,
  color?: string
) => {
  switch (iconType) {
    case "Personal Goals":
      return <Feather name="target" size={size} color={color} />;
    case "To-Do":
      return <FontAwesome5 name="tasks" size={size} color={color} />;
    case "Job":
      return <MaterialIcons name="work-outline" size={size} color={color} />;
    case "Meetings":
      return <FontAwesome5 name="user-friends" size={size} color={color} />;
    case "Financial":
      return <MaterialIcons name="attach-money" size={size} color={color} />;
    case "Health":
      return <FontAwesome5 name="apple-alt" size={size} color={color} />;
    case "Travel":
      return <MaterialIcons name="backpack" size={size} color={color} />;
    case "Books":
      return <Feather name="book" size={size} color={color} />;
    case "Inspiration":
      return <FontAwesome5 name="lightbulb" size={size} color={color} />;
    case "Learning":
      return <FontAwesome5 name="chalkboard-teacher" size={size} color={color} />;
    case "Home":
      return <Feather name="home" size={size} color={color} />;
    case "Gifts":
      return <Feather name="gift" size={size} color={color} />;
    case "Brainstorming":
      return <FontAwesome5 name="brain" size={size} color={color} />;
    case "Events":
      return <MaterialIcons name="event" size={size} color={color} />;
    case "Movies":
      return <MaterialIcons name="movie" size={size} color={color} />;
    case "Hobbies":
      return <MaterialIcons name="toys" size={size} color={color} />;
    default:
      return null;
  }
};
