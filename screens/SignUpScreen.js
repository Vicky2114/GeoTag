import { Alert,StyleSheet } from 'react-native';
import AuthContent from '../component/auth/AuthContent';
import LoadingOverlay from '../component/ui/LoadingOverlay';
import { createUser } from '../util/auth';
import { useState ,useContext} from 'react';
import { AuthContext } from '../store/auth_context';
import { LinearGradient } from 'expo-linear-gradient';

function SignupScreen() {

   const [isAuthenticating,setIsAuthenticating]=useState(false)
   const authCtx=useContext(AuthContext);
  async function signUpHandler({email,password}){
    setIsAuthenticating(true)
    try{
      const token=await createUser(email,password);
      authCtx.authenticate(token);
    }catch(error){
     Alert.alert('Authentication Failed',
     'Could not create user. Pleases check your input and try again later')
     setIsAuthenticating(false)
    }
  }

  if(isAuthenticating){
    return <LoadingOverlay message="Creating user..."/>
  }

  return  <>
    <LinearGradient
    colors={['#adbce6', 'white','#FFCCCB']}
    style={styles.container}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1}}
    >
  <AuthContent onAuthenticate={signUpHandler}/>
  </LinearGradient>
  </>;
}

export default SignupScreen;


const styles =StyleSheet.create({
  container:{
    flex:1,
    opacity:0.85
  }
})
