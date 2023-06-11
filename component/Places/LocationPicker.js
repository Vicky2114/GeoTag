import { useEffect, useState } from 'react';
import { Alert, View, StyleSheet, Image, Text } from 'react-native';
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from 'expo-location';

import { Colors } from "../../constants/color";
import OutlineButton from '../ui/OutlineButton';
import { getAddress, getMapPreview } from '../../util/location';
import { useNavigation ,useRoute,useIsFocused} from '@react-navigation/native';

function LocationPicker({onPickLocation}) {

  const [pickedLocation, setPickedLocation] = useState();
  const isFocused=useIsFocused();
  const navigation=useNavigation()
   const route=useRoute();
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

   
    useEffect(()=>{
      if(isFocused && route.params){
        const mapPickedLocation=route.params && {
          lat:route.params.pickedLat,
          lng:route.params.pickedLng
        }

         setPickedLocation(mapPickedLocation);
      }
    },[route,isFocused])

    useEffect(()=>{
      async function handleLocation(){

        if(pickedLocation){
          const address=await getAddress(pickedLocation.lat,pickedLocation.lng)
          onPickLocation({...pickedLocation,address:address})
        }
      }
      handleLocation();
    },[pickedLocation,onPickLocation])

  async function verifyPermissions() {
   
      const permissionResponse = await requestPermission();
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      return permissionResponse.granted;
    }
    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {
   navigation.navigate('Map')
  }

  let locationPreview = <Text>No location picked yet.</Text>;

  if (pickedLocation) {
    locationPreview = <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlineButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlineButton>
        <OutlineButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlineButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    // borderRadius: 4
  },
});
