import AudioList from '../src/pages/AudioList';
import AddAudio from '../src/pages/AddAudio';
import SaveAudio from '../src/pages/SaveAudio';


import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function TabTwoScreen() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='AudioList' component={AudioList}/>
      <Stack.Screen name='AddAudio' component={AddAudio}/>
      <Stack.Screen name='SaveAudio' component={SaveAudio}/>    
    </Stack.Navigator>
  );
}
