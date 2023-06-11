import { useState } from 'react';
import { Alert, StyleSheet, View ,Text} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import FlatButton from '../ui/FlatButton';
import AuthForm from './AuthForm';

function AuthContent({ isLogin, onAuthenticate }) {
 
const navigation=useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if(isLogin){
      navigation.replace('Signup');
    }else{
      navigation.replace('Login')
    }
  }

  function submitHandler(credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={isLogin?styles.buttons:styles.buttons2}>
        <View>
        <Text>{isLogin? 'Not a member ':'Already member '}?</Text>
        </View>
        <View>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? ' Register now' : ' Log in instead'}
        </FlatButton>
        </View>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  google:{
    marginTop:50
  },
  authContent: {
    marginTop: 45,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 150,
    marginLeft:30,
    flexDirection:'row'
  },
  buttons2:{
    marginTop: 150,
    marginLeft:30,
    flexDirection:'row'
  }
});
