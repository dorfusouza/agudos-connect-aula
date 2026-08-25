import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import SobreScreen from '../screens/SobreScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator(){
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Sobre' component={SobreScreen} options={{title: 'Sobre'}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
// npm install "nome do modulo"
// npm install "@react-navigation/native"
// npm install "@react-navigation/native-stack"
