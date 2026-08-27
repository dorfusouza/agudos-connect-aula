import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import SobreScreen from '../screens/SobreScreen';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator(){
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Tabs' component={TabNavigator} options={{headerShown:false}}/>
                <Stack.Screen name='Sobre' component={SobreScreen} options={{title: 'Sobre'}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
// npm install "nome do modulo"
// npm install "@react-navigation/native"
// npm install "@react-navigation/native-stack"
