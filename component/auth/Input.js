import { View, Text, TextInput, StyleSheet } from 'react-native';

import { Colors } from '../../constants/styles';

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  placeholder
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize={false}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        placeholder={placeholder}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    color: 'black',
    marginBottom: 4,
    marginLeft:4
  },
  labelInvalid: {
    color: Colors.error500,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    paddingLeft:15,
    backgroundColor: '#FFFF',
    borderRadius: 10,
    fontSize: 15,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});
