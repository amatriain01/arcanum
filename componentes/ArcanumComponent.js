import { Component } from "react";
import Constants from "expo-constants";
import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import Falso from "./FalsoComponent";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@rneui/themed";
import { colorAmarillo, colorAmarilloClaro, colorAzul } from "../app.config";

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: "always", horizontal: "never" }}>
        <View style={styles.drawerHeader}>
          <View style={{ flex: 1 }}>
            <Image
              source={require("./imagenes/logo.png")}
              style={styles.drawerImage}
            />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.drawerHeaderText}> Arcanum</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </SafeAreaView>
    </DrawerContentScrollView>
  );
}

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function InicioNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="InicioNavegador"
      screenOptions={{
        headerMode: "screen",
        headerTintColor: colorAmarillo,
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: colorAzul },
        headerTitleStyle: { color: colorAmarillo },
        headerLeft: () => (
          <Icon
            name="menu"
            size={28}
            color={colorAmarillo}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        ),
      }}>
      <Stack.Screen
        name="InicioNavegador"
        component={Falso}
        options={{
          title: "Arcanum",
        }}
      />
    </Stack.Navigator>
  );
}

function LoginNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="LoginNavegador"
      screenOptions={{
        headerMode: "screen",
        headerTintColor: colorAmarillo,
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: colorAzul },
        headerTitleStyle: { color: colorAmarillo },
        headerLeft: () => (
          <Icon
            name="menu"
            size={28}
            color={colorAmarillo}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        ),
      }}>
      <Stack.Screen
        name="LoginNavegador"
        component={Falso}
        options={{
          title: "Inicio de sesión",
        }}
      />

      <Stack.Screen
        name="Registro"
        component={Falso}
        options={{
          title: "Registro",
        }}
      />
    </Stack.Navigator>
  );
}

function BibliotecaNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="BibliotecaNavegador"
      screenOptions={{
        headerMode: "screen",
        headerTintColor: colorAmarillo,
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: colorAzul },
        headerTitleStyle: { color: colorAmarillo },
        headerLeft: () => (
          <Icon
            name="menu"
            size={28}
            color={colorAmarillo}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        ),
      }}>
      <Stack.Screen
        name="BibliotecaNavegador"
        component={Falso}
        options={{
          title: "Biblioteca",
        }}
      />
      <Stack.Screen
        name="DetallesLibro"
        component={Falso}
        options={{
          title: "Detalles del libro",
        }}
      />
      <Stack.Screen
        name="Discusiones"
        component={Falso}
        options={{
          title: "Discusiones",
        }}
      />
    </Stack.Navigator>
  );
}

function PerfilNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="PerfilNavegador"
      screenOptions={{
        headerMode: "screen",
        headerTintColor: colorAmarillo,
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: colorAzul },
        headerTitleStyle: { color: colorAmarillo },
        headerLeft: () => (
          <Icon
            name="menu"
            size={28}
            color={colorAmarillo}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        ),
      }}>
      <Stack.Screen
        name="PerfilNavegador"
        component={Falso}
        options={{
          title: "Mi Perfil",
        }}
      />
    </Stack.Navigator>
  );
}

function EventosNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="EventosNavegador"
      screenOptions={{
        headerMode: "screen",
        headerTintColor: colorAmarillo,
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: colorAzul },
        headerTitleStyle: { color: colorAmarillo },
        headerLeft: () => (
          <Icon
            name="menu"
            size={28}
            color={colorAmarillo}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        ),
      }}>
      <Stack.Screen
        name="EventosNavegador"
        component={Falso}
        options={{
          title: "Eventos",
        }}
      />
    </Stack.Navigator>
  );
}

function DrawerNavegador() {
  return (
    <Drawer.Navigator
      initialRouteName="Drawer"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: colorAmarilloClaro,
        },
      }}>
      <Drawer.Screen
        name="Inicio"
        component={InicioNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon name="home" type="font-awesome" size={24} color={tintColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="Iniciar Sesion"
        component={LoginNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon name="user" type="font-awesome" size={24} color={tintColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="Biblioteca"
        component={BibliotecaNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon name="book" type="font-awesome" size={24} color={tintColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="Mi Perfil"
        component={PerfilNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name="address-card"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Eventos"
        component={EventosNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name="bullhorn"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

class Arcanum extends Component {
  render() {
    return (
      <NavigationContainer>
        <View
          style={{
            flex: 1,
            paddingTop:
              Platform.OS === "android" ? 0 : Constants.statusBarHeight,
          }}>
          <DrawerNavegador />
        </View>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: colorAzul,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: colorAmarillo,
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    width: 40,
    height: 40,
  },
});

export default Arcanum;
