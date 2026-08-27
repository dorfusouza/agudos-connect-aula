import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../types';
import { Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<TabParamList>();

const ICONS: Record<keyof TabParamList, string> = {
    Home: '🏠',
    Agenda: '📅',
    Perfil: '👤'
}

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#1e2761',
                tabBarInactiveTintColor: '#9aa0a6',
                tabBarIcon: ({ focused }) => (
                    <Text style={{
                        fontSize: focused ? 22 : 18,
                        opacity: focused ? 1 : 0.5
                    }}>
                        {ICONS[route.name]}
                    </Text>
                ),
            })}
        >

            <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
            <Tab.Screen name='Agenda' component={ScheduleScreen} />
            <Tab.Screen name='Perfil' component={ProfileScreen} />
        </Tab.Navigator>
    )
}