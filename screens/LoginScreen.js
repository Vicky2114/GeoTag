import AuthContent from "../component/auth/AuthContent";
import { useContext, useState} from "react";
import { Alert, View,StyleSheet,Text } from "react-native";
import LoadingOverlay from "../component/ui/LoadingOverlay";
import { login } from "../util/auth";
import { AuthContext } from "../store/auth_context";
import {LinearGradient} from "expo-linear-gradient"
import GAuth from "../util/GAuth";



function LoginScreen() {
 
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  async function logInpHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication Failed",
        "Could not log you in. Pleases check your credentials"
      );
      setIsAuthenticating(false);
    }
  }
  

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return  <>
 
   <LinearGradient
    colors={['#adbce6', 'white','#FFCCCB']}
    style={styles.container}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1}}
    >
       <View style={styles.header}>
  <Text style={styles.text1}>Hello Again!</Text>
  <Text style={styles.text2}>Welcome back you've been missed!</Text>
  </View>
  {isAuthenticating? <Text>Sign in</Text>:<GAuth/>}
  <AuthContent isLogin onAuthenticate={logInpHandler} />
  </LinearGradient>
  </>



}

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex:1,
    opacity:0.85
  },
  header:{
    marginTop:100,
    flexDirection:'column',
    alignItems:'center',
   justifyContent:'center',
  },
  text1:{
    fontWeight:'bold',
    fontSize:30,
  },
  text2:{
    fontSize:20,
    marginTop:20
  }

})