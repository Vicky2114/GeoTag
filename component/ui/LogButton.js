import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/styles';

function LogButton({ children, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default LogButton;

const styles = StyleSheet.create({
 
    button:{
        borderWidth:2,
        width:170,
        borderRadius:10,
        height:60,
        borderColor:'white',
        backgroundColor:'black',
        marginBottom:20,
        marginTop:60,
        justifyContent:'center'
    },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize:20,
    textAlign: 'center',
    color: 'white',
    
  },
});
