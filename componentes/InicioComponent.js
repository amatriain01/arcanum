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
import {
  colorAmarillo,
  colorAmarilloClaro,
  colorAzul,
  colorAzulClaro,
} from "../app.config";
import { Divider, Icon } from "@rneui/base";
import LibroSimple from "./LibroSimpleComponent";
import { connect } from "react-redux";
import { fetchLibros } from "../redux/actions/libros";
import { checkAuthState } from "../redux/actions/autenticacion";
import { Button } from "react-native-elements";
import { IndicadorActividad } from "./IndicadorActividadComponent";
import { fetchComentariosValoracionMedia } from "../redux/actions/comentarios";

const mapStateToProps = (state) => ({
  loading: state.libros.loading,
  error: state.libros.errMess,
  libros: state.libros.libros,
  loadingComentarios: state.comentarios.loading,
  errorComentarios: state.comentarios.errMess,
  user: state.autenticacion.user,
  isAuthenticated: state.autenticacion.isAuthenticated,
  valoracionesMedias: state.comentarios.valoracionesMedias,
});

const mapDispatchToProps = (dispatch) => ({
  fetchLibros: () => dispatch(fetchLibros()), /// Aqui iria la de pasarle unos id y que me devuleva los libros de esos id
  checkAuthState: () => dispatch(checkAuthState()),
  fetchComentariosValoracionMedia: (idLibro) =>
    dispatch(fetchComentariosValoracionMedia(idLibro)),
});

const { width: screenWidth } = Dimensions.get("window");

class Inicio extends Component {
  componentDidMount() {
    this.props.fetchLibros();
    this.unsubscribeAuth = this.props.checkAuthState();
  }

  componentDidUpdate(prevProps) {
    if (this.props.libros !== prevProps.libros && !this.props.loading) {
      this.props.libros.forEach((libro) => {
        this.props.fetchComentariosValoracionMedia(libro.idLibro);
      });
    }
  }

  componentWillUnmount() {
    if (this.unsubscribeAuth) {
      this.unsubscribeAuth();
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    const { user, isAuthenticated, valoracionesMedias, libros, loading, error, loadingComentarios, errorComentarios } = this.props;
    
    if (loading || loadingComentarios) {
      return <IndicadorActividad />;
    }

    if (error || errorComentarios) {
      console.log("Error: ", error);
      return (
        <View>
          <Text>Error al cargar el Perfil.</Text>
        </View>
      );
    }

    function renderLibro({ item }) {
      const valoracionMedia = valoracionesMedias[item.idLibro];
      return (
        <TouchableOpacity
          style={styles.carousel}
          onPress={() =>
            navigate("Biblioteca", {
              screen: "DetalleLibro",
              params: { idLibro: item.idLibro },
            })
          }>
          <LibroSimple libro={item} valoracionMedia={valoracionMedia !== undefined ? valoracionMedia : "0"}/>
        </TouchableOpacity>
      );
    }

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
          data={libros.slice(0, 5)}
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
