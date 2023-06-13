import { Alert, Button, View, Image,Text,StyleSheet } from "react-native"
import { requestMediaLibraryPermissionsAsync,launchCameraAsync, useCameraPermissions, PermissionStatus, launchImageLibraryAsync, MediaTypeOptions, useMediaLibraryPermissions } from 'expo-image-picker'
import { useState } from "react";
import { Colors } from "../../constants/color";
import OutlineButton from "../ui/OutlineButton";
function ImagePicker({onTakeImage}) {
    const [pickedImage, setPickedImage] = useState()
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
   const [mediaPermissionInformation,galleryPermission]=useMediaLibraryPermissions();
    async function verifyPermissions() {
            const permissionResponse = await requestPermission();
            const MediaPermisson =await  galleryPermission()
        if(cameraPermissionInformation.status === PermissionStatus.DENIED ||mediaPermissionInformation.status === PermissionStatus.DENIED) {
            return MediaPermisson.granted;
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
            quality: 1,
        });
        setPickedImage(image.uri)
        onTakeImage(image.uri)
    }
    async function takeImageFromMediaHandler(){
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        
        const image = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.Images,
            allowsEditing:true,
            aspect: [16, 9],
            quality:1
        })

        setPickedImage(image.uri)
        onTakeImage(image.uri)
        
    }

  let imagePreview =<Text>No image Taken Yet.</Text>
  if(pickedImage){
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />
  }
    return <View>
        <View style={styles.imagePreview}>{imagePreview}</View>
        <View style={styles.actions}>
        <OutlineButton icon="camera" onPress={takeImageHandler}>
          Take Photo
        </OutlineButton>
        <OutlineButton icon="images" onPress={takeImageFromMediaHandler} >
          Media Image
        </OutlineButton>
      </View>
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
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }
})