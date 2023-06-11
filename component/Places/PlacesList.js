import { FlatList,StyleSheet,View,Text } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/color";
import { useNavigation } from "@react-navigation/native";
import {LinearGradient} from "expo-linear-gradient"
function PlacesList({places}){
    const navigation=useNavigation();

    function selectPlaceHandler(id){
        navigation.navigate('PlaceDetails',{
           placeId:id 
        })
    }
    if(!places||places.length ===0){
       return (
        <LinearGradient
    colors={['#adbce6', 'white','#FFCCCB']}
    style={styles.container}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1}}
    >
        <View style={styles.fallbackContainer}>
            <Text style={styles.fallbackText}>No Places added yet - start adding some!</Text>
        </View>
        </LinearGradient>
       )
    }
    return   <LinearGradient
    colors={['#adbce6', 'white','#FFCCCB']}
    style={styles.container}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1}}
    >
    
    <FlatList 
    style={styles.list}
    data={places} 
    keyExtractor={(item)=>item.id} 
    renderItem={({item})=><PlaceItem place={item} onSelect={selectPlaceHandler}/>}/>
    </LinearGradient>;
    
}
export default PlacesList;
const styles=StyleSheet.create({
    container:{
    flex:1,
    },
    list:{
        margin:24,
        marginTop:80
      },

    fallbackContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    fallbackText:{
        fontSize:16,
        color:Colors.primary200
    }

})