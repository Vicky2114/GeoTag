import { StyleSheet,View,Text, Button} from "react-native";
import { GoogleSignin,GoogleSigninButton } from "@react-native-google-signin/google-signin";
import auth from '@react-native-firebase/auth';
import { useState,useEffect ,createContext, useContext} from "react";
import { AuthContext } from "../store/auth_context";
import IconButton2 from "../component/ui/IconButton";
import { Alert } from "react-native";
export const GAuthContext = createContext({
  signOut: () => {},
});


function GAuth(){
  const authCtx=useContext(AuthContext)
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    GoogleSignin.configure({
        webClientId: '714263589362-7i9t0t60o4epceu7s9jrqoqcvtom0ikq.apps.googleusercontent.com',

      });  
      function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
      }
    
      useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; 
      }, []);
    
      if (initializing) return null;
    
      const onGoogleButtonPress= async () =>{
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        authCtx.authenticate(idToken);
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        const user_sign_in =auth().signInWithCredential(googleCredential);
        user_sign_in.then((user)=>{
            console.log(user);
        }).catch((error)=>{
            console.log(error);
        })
      }

      const signOut=()=>{
        try{
          Alert.alert("Log Out", "Do you want to Sign Out from Geotag?", [
            {
              text: "NO",
              style: 'cancel'
            },
            {
              text:'YES',
              onPress: async() => {
                if(user && authCtx.isAuthenticated){
                await GoogleSignin.revokeAccess();
                await auth().signOut();
                authCtx.logout();
                }
                else if(authCtx.isAuthenticated){
                  await authCtx.logout();
                }
                setUser(null);
                },
            }
          ]);
        }catch(error){
          console.log(error);
        }
      }
      const value = {
        signOut:signOut
      }

      if(!user && !authCtx.isAuthenticated){
        return(
          <GAuthContext.Provider value={value}>
            <View style={styles.container}>
               <GoogleSigninButton style={{width:300,marginTop:20,height:65}}
               onPress={onGoogleButtonPress}
               /> 
            </View>
          </GAuthContext.Provider>
        )
      }
      return <IconButton2
      icon="exit"
      color="#333333"
      size={24}
      onPress={signOut}
    />

}

export default GAuth;


const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})


