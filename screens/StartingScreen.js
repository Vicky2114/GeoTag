import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Carousel } from "react-native-auto-carousel";
import LogButton from "../component/ui/LogButton";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const height = width * 1;
const images = [
  "https://images.pexels.com/photos/16572560/pexels-photo-16572560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/3102322/pexels-photo-3102322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/5599760/pexels-photo-5599760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/2800449/pexels-photo-2800449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/6109640/pexels-photo-6109640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.unsplash.com/photo-1613288092085-eb081fde1509?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
 
];

function StartingScreen() {
  const navigation = useNavigation();
  function switchScreenSignUp() {
    navigation.navigate("Signup");
  }
  function switchScreenSignin() {
    navigation.navigate("Login");
  }
  return (
    <>
      <LinearGradient
        colors={["#adbce6", "white", "#FFCCCB"]}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.outside}>
          <Carousel
            data={images}
            renderItem={(item) => (
              <Image
                key={item}
                source={{
                  uri: item,
                }}
                style={styles.image}
              />
            )}
          />
        </View>
        <View>
          <View style={styles.mid}>
            <Text style={styles.mid1}>Discover and Geotag App</Text>
            <Text style={styles.mid2}>
              App allows you to easily capture photos and display location tag
              on your photos
            </Text>
          </View>
          <View style={styles.bottom}>
            <View>
              <LogButton onPress={switchScreenSignUp}>Register</LogButton>
            </View>
            <View>
              <LogButton onPress={switchScreenSignin}>Log in</LogButton>
            </View>
          </View>
        </View>
      </LinearGradient>
    </>
  );
}
export default StartingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 0.85,
  },
  outside: {
    marginTop: 40,
    padding: 20,
    flex: 2,
  },
  image: {
    height: height,
    width: width,
    borderWidth: 4,
    borderRadius:6
  },
  mid: {
    zIndex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  mid1: {
    fontSize: 28,
    fontWeight: "bold",
  },
  mid2: {
    paddingTop: 10,
    fontSize: 18,
    paddingLeft: 30,
    paddingRight: 30,
    color: "grey",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
