import { Alert, Button, View, Image,Text,StyleSheet } from "react-native"
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'
import { useState } from "react";
import { Colors } from "../../constants/color";
import OutlineButton from "../ui/OutlineButton";
function ImagePicker({onTakeImage}) {
    const [pickedImage, setPickedImage] = useState()
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

    async function verifyPermissions() {
            const permissionResponse = await requestPermission();
            
        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            return permissionResponse.granted;
        }
        return true;
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });
        setPickedImage(image.uri)
        onTakeImage(image.uri)
    }

  let imagePreview =<Text>No image Taken Yet.</Text>
  if(pickedImage){
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />
  }
    return <View>
        <View style={styles.imagePreview}>{imagePreview}</View>
    <OutlineButton icon = "camera" onPress={takeImageHandler}>Take Image</OutlineButton>
    </View>
}
export default ImagePicker

const styles =StyleSheet.create({
    imagePreview:{
        width:'100%',
        height:200,
        marginVertical:8,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.primary100,
        borderRadius:4
    },
    image:{
        width:'100%',
        height:'100%'
    }
})