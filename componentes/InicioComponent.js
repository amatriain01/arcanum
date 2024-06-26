import { React, Component } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { colorAmarillo, colorAmarilloClaro, colorAzul } from "../app.config";
import { Divider, Icon } from "@rneui/base";
import LibroSimple from "./LibroSimpleComponent";
import { connect } from "react-redux";
import { fetchLibros } from "../redux/actions/libros";
import { checkAuthState } from "../redux/actions/autenticacion";
import { Button } from "react-native-elements";
import { IndicadorActividad } from "./IndicadorActividadComponent";

const mapStateToProps = (state) => ({
  loading: state.libros.loading,
  error: state.libros.errMess,
  libros: state.libros.libros,
  user: state.autenticacion.user,
  isAuthenticated: state.autenticacion.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  fetchLibros: () => dispatch(fetchLibros()),
  checkAuthState: () => dispatch(checkAuthState()),
});

const { width: screenWidth } = Dimensions.get("window");

class Inicio extends Component {
  componentDidMount() {
    this.props.fetchLibros();
    this.unsubscribeAuth = this.props.checkAuthState();
  }

  componentWillUnmount() {
    if (this.unsubscribeAuth) {
      this.unsubscribeAuth();
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    const { user, isAuthenticated, libros, loading, error } = this.props;

    if (loading) {
      return <IndicadorActividad />;
    }

    if (error) {
      console.log("Error: ", error);
      return (
        <View>
          <Text>Error al cargar el Perfil.</Text>
        </View>
      );
    }

    function renderLibro({ item }) {
      return (
        <TouchableOpacity
          style={styles.carousel}
          onPress={() =>
            navigate("Biblioteca", {
              screen: "DetalleLibro",
              params: { idLibro: item.idLibro },
            })
          }>
          <LibroSimple libro={item} />
        </TouchableOpacity>
      );
    }

    function obtenerElementosAleatorios() {
      if (libros.length <= 5) {
        return libros.slice();
      }
          
      let elementosAleatorios = [];
      let indicesUtilizados = new Set();
    
      while (elementosAleatorios.length < 5) {
        let indiceAleatorio = Math.floor(Math.random() * libros.length);
    
        if (!indicesUtilizados.has(indiceAleatorio)) {
          indicesUtilizados.add(indiceAleatorio);
          elementosAleatorios.push(libros[indiceAleatorio]);
        }
      }
    
      return elementosAleatorios;
    };

    function ListadoElementos(props) {
      return (
        <View>
          <View style={styles.header}>
            <Icon name="book" type="font-awesome" size={30} />
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {" "}
              {props.titulo}{" "}
            </Text>
          </View>
          <Divider />
          <FlatList
            data={props.data}
            renderItem={renderLibro}
            horizontal
            pagingEnabled
            keyExtractor={Math.random}
          />
          <Button
            title="Ver el listado completo"
            onPress={() => navigate("Biblioteca")}
            titleStyle={{ color: colorAmarillo, marginLeft: 10 }}
            buttonStyle={{
              backgroundColor: colorAzul,
              borderRadius: 10,
              margin: 10,
              padding: 10,
            }}
          />
        </View>
      );
    }

    const redireccion = isAuthenticated ? "Mi Perfil" : "Iniciar Sesión";

    return (
      <ScrollView style={styles.container}>
        <View style={styles.headerPrincipal}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", flex: 1 }}>
              BIENVENIDO A ARCANUM
            </Text>
            {isAuthenticated && (
              <Text style={{ fontSize: 20, fontWeight: "bold", flex: 1 }}>
                {user.displayName}
              </Text>
            )}
          </View>
          <Button
            title={redireccion}
            onPress={() => navigate(redireccion)}
            icon={
              <Icon
                name="user"
                type="font-awesome"
                size={20}
                color={colorAzul}
              />
            }
            titleStyle={{ color: colorAzul, marginLeft: 10 }}
            buttonStyle={{
              backgroundColor: colorAmarillo,
              borderRadius: 10,
              margin: 10,
              padding: 10,
            }}
          />
        </View>
        <ListadoElementos
          titulo={"Libros Destacados"}
          data={obtenerElementosAleatorios()}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorAmarillo,
  },
  headerPrincipal: {
    padding: 10,
    marginTop: 25,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "solid",
    borderColor: colorAmarillo,
    borderWidth: 5,
    backgroundColor: colorAmarilloClaro,
    borderRadius: 10,
  },
  header: {
    padding: 10,
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  carousel: {
    width: screenWidth,
    backgroundColor: colorAmarillo,
    borderStyle: "solid",
    borderColor: colorAmarillo,
    borderWidth: 5,
    height: 300,
  },
  image: {
    margin: 10,
    width: 40,
    height: 40,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Inicio);
