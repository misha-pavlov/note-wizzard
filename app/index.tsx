import { Redirect } from "expo-router";
import { constants } from "../config/constants";

export const Index = () => <Redirect href={constants.screens.home} />;

export default Index;
