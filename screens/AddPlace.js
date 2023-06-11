import PlaceForm from "../component/Places/PlaceForm"
import { insertPlace } from "../util/database"




function AddPlace({navigation}){
  async function createPlaceHandler(place){
    await insertPlace(place);
    navigation.navigate('AllPlaces')

  }
  return <PlaceForm onCreatePlace={createPlaceHandler}/>
}
export default AddPlace