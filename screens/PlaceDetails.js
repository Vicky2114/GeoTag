import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import OutlineButton from "../component/ui/OutlineButton";
import { Colors } from "../constants/color";
import { useEffect, useState } from "react";
import { fetchPlaceDetails,deletes } from "../util/database";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../component/ui/Button";
function PlaceDetails({ route, navigation }) {
 const [fetchedPlace,setFetchedPlace]=useState()
  function showOnMapHandler() {
    navigation.navigate('Map',{
        initialLat:fetchedPlace.location.lat,
        initialLng:fetchedPlace.location.lng
    })
  }
  const selectedPlaceId = route.params.placeId;
  function deletePlaceHandler(){
    deletes(selectedPlaceId);
    navigation.navigate('AllPlaces');
  }
  useEffect(() => {
    async function loadPlaceData() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place)
      navigation.setOptions({
        title:place.title,
      });
    }
    loadPlaceData();
  }, [selectedPlaceId]);
  if(!fetchedPlace){
    return <View style={styles.fallback}>
        <Text>Loading place data...</Text>
    </View>
  }
  return (
    <LinearGradient
      colors={["#adbce6", "white", "#FFCCCB"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
   
    <ScrollView style={styles.form}>
      <Image style={styles.image} source={{uri:fetchedPlace.imageUri}}/>
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <View style={styles.map}>
        <OutlineButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlineButton>
        </View>
      </View>
      <View style ={styles.button}>
      <Button onPress={deletePlaceHandler}>Delete Place</Button>
      </View>
    </ScrollView>
    </LinearGradient>
  );
}
export default PlaceDetails;

const styles = StyleSheet.create({
  button:{
    marginLeft:100,
    marginTop:20,
    width:200,
  
  },
  form:{
    marginTop:80
  },
  container:{
    flex:1
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "85%",
    margin:30,
    borderWidth:5,
   borderRadius:10
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 40,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  fallback:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  map:{
    marginTop:50,
  }
});
