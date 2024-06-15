import { Component } from "react";
import Constants from "expo-constants";
import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import Falso from "./FalsoComponent";
import Login from "./LoginComponent";
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
import Inicio from "./InicioComponent";
import { connect } from "react-redux";
import { checkAuthState } from "../redux/actions/autenticacion";
import Registro from "./RegistroComponent";
import Logout from "./LogoutComponent";
import Biblioteca from "./BibliotecaComponent";
import DetalleLibro from "./DetalleLibroComponent";
import Discusion from "./DiscusionComponent";

const mapStateToProps = (state) => ({
  isAuthenticated: state.autenticacion.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  checkAuthState: () => dispatch(checkAuthState()),
});

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
        component={Inicio}
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
        component={Login}
        options={{
          title: "Inicio de sesión",
        }}
      />

      <Stack.Screen
        name="Registro"
        component={Registro}
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
      }}>
      <Stack.Screen
        name="BibliotecaNavegador"
        component={Biblioteca}
        options={{
          title: "Biblioteca",
          headerLeft: () => (
            <Icon
              name="menu"
              size={28}
              color={colorAmarillo}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          ),
        }}
      />
      <Stack.Screen
        name="DetalleLibro"
        component={DetalleLibro}
        options={{
          title: "Detalles del libro",
        }}
      />
      <Stack.Screen
        name="Discusion"
        component={Discusion}
        options={{
          title: "Discusion",
        }}
      />
      <Stack.Screen
        name="Valoraciones"
        component={Falso}
        options={{
          title: "Valoraciones",
        }}
      />
      <Stack.Screen
        name="EscribirMensaje"
        component={Falso}
        options={{
          title: "Escribir mensaje",
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

function LogoutNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="LogoutNavegador"
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
        name="LogoutNavegador"
        component={Logout}
        options={{
          title: "Cerrar sesión",
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

function DrawerNavegador(props) {
  return (
    <Drawer.Navigator
      initialRouteName="Inicio"
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
      {!props.isAuthenticated && (
        <Drawer.Screen
          name="Iniciar Sesión"
          component={LoginNavegador}
          initialParams={{ screen: "LoginNavegador" }}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Icon name="user" type="font-awesome" size={24} color={tintColor} />
            ),
          }}
        />
      )}
      {props.isAuthenticated && (
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
      )}
      <Drawer.Screen
        name="Biblioteca"
        component={BibliotecaNavegador}
        initialParams={{ screen: "BibliotecaNavegador" }}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon name="book" type="font-awesome" size={24} color={tintColor} />
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
      {props.isAuthenticated && (
        <Drawer.Screen
          name="Cerrar Sesión"
          component={LogoutNavegador}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Icon
                name="sign-out"
                type="font-awesome"
                size={24}
                color={tintColor}
              />
            ),
          }}
        />
      )}
    </Drawer.Navigator>
  );
}

class Arcanum extends Component {
  componentDidMount() {
    this.unsubscribeAuth = this.props.checkAuthState();
  }

  componentDidUpdate() {
    this.unsubscribeAuth = this.props.checkAuthState();
  }

  componentWillUnmount() {
    if (this.unsubscribeAuth) {
      this.unsubscribeAuth();
    }
  }

  render() {
    return (
      <NavigationContainer>
        <View
          style={{
            flex: 1,
            paddingTop:
              Platform.OS === "android" ? 0 : Constants.statusBarHeight,
          }}>
          <DrawerNavegador isAuthenticated={this.props.isAuthenticated} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Arcanum);
