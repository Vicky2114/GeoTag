import { useCallback, useState } from "react";
import { ScrollView, Text, TextInput, View, StyleSheet, Alert } from "react-native";
import { Colors } from "../../constants/color";
import ImagePicker from "../Places/ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../ui/Button";
import { Place } from "../../models/place";
import { LinearGradient } from "expo-linear-gradient";
function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [pickedLocation, setPickedLocation] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  function changeTtileHandler(enteredText) {
    setEnteredTitle(enteredText);
  }
  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  function savePlaceHandler() {
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    if(!enteredTitle || !selectedImage || !pickedLocation ){
      Alert.alert('Invalid Entries', 'Check Entries if any missing or wrong', [
        {
          text: 'OK',
        }
      ]);
      return;
    }
    onCreatePlace(placeData);
  }
  return (
    <LinearGradient
      colors={["#adbce6", "white", "#FFCCCB"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView style={styles.form}>
        <View>
          <Text style={styles.label}>Title</Text>
          <TextInput style={styles.input} onChangeText={changeTtileHandler} />
        </View>
        <ImagePicker onTakeImage={takeImageHandler} />
        <LocationPicker onPickLocation={pickLocationHandler} />
        <View style={styles.bottomButton}>
          <Button onPress={savePlaceHandler}>Add Place</Button>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
    marginTop:80
  },
  container:{
    flex:1
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
    borderRadius: 10,
  },
 
});
