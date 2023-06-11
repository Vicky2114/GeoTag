import { StatusBar } from "expo-status-bar";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContextProvider, { AuthContext } from "./store/auth_context";
import { useContext, useEffect, useState } from "react";
import IconButton2 from "./component/ui/IconButton";
import { NavigationContainer } from "@react-navigation/native";
import StartingScreen from "./screens/StartingScreen";
import { Colors } from "./constants/color";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./component/ui/IconButton2";
import { init } from "./util/database";
import Map from "./screens/Map";
import PlaceDetails from "./screens/PlaceDetails";
import { Text ,StyleSheet,View} from "react-native";
import LoadingOverlay from "./component/ui/LoadingOverlay";


import 'expo-dev-client';
import GAuth, { GAuthContext } from "./util/GAuth";

const Stack = createNativeStackNavigator();
export default function App() {
  function AuthStack() {
    return (
      <Stack.Navigator 
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: "white",
          contentStyle: { backgroundColor: Colors.primary100 },
          headerShown: false,
        }}
      >
        <Stack.Screen name="Staring" component={StartingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
      </Stack.Navigator>
    );
  }
  const [dbInitialized, setDbInitialized] = useState(false);
  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (!dbInitialized) {
    return <LoadingOverlay/>;
  }
  function AuthenticatedStack() {
    const GCTX=useContext(GAuthContext)
    const authCtx = useContext(AuthContext);
    return (
      <Stack.Navigator
        screenOptions={{
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700 },
          headerTransparent:true
        }}
      >
        <Stack.Screen
          name="AllPlaces"
          component={AllPlaces}
          options={({ navigation }) => ({
            headerRight: ({ tintColor }) => (
              <View style={{ flexDirection: "row" }}>
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("AddPlace")}
                />
                <GAuth/>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="AddPlace"
          component={AddPlace}
          options={{
            title: "Add a new Place",
          }}
        />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen
          name="PlaceDetails"
          component={PlaceDetails}
          options={{
            title: "Loading Place...",
          }}
        />
      </Stack.Navigator>
    );
  }
  function Navigation() {
    const authCtx = useContext(AuthContext);
    return (
      <NavigationContainer>
        {!authCtx.isAuthenticated && <AuthStack />}
        {authCtx.isAuthenticated && <AuthenticatedStack />}
      </NavigationContainer>
    );
  }
  function Root() {
    const [isTryingLogin, setIsTryingLogin] = useState(true);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
      async function fetchToken() {
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          authCtx.authenticate(storedToken);
        }
        setIsTryingLogin(false);
      }
      fetchToken();
    }, []);
    if (isTryingLogin) {
      return <LoadingOverlay/>;
    }
    return <Navigation />;
  }
  return (
    <>
      <StatusBar style="dark" />
      <AuthContextProvider>
        <Root/>
      </AuthContextProvider>
    </>
  );
}

