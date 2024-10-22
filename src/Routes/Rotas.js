import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeUsuario from '../Pages/HomeUsuario';
import LoginScreen from '../Pages/Login';
import CadastroScreen from '../Pages/Cadastro';
import CadastroMaquina from '../Pages/CadastroMaquina';
import TelaAgradecimento from '../Components/TelaAgradecimentoCadastro';
import Busca from '../Pages/Busca'

const Tab = createBottomTabNavigator();

export default function Rotas() {

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: '#121212',
                        borderTopColor: '#121212'
                    },
                    tabBarActiveTintColor: "white"
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeUsuario}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Buscar"
                    component={Busca}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),
                    }}
                />
                
                <Tab.Screen
                    name="Cadastro"
                    component={CadastroScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="check" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="CadastroMaquina"
                    component={CadastroMaquina}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="plus" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="TelaAgrad"
                    component={TelaAgradecimento}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="plus" color={color} size={size} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}