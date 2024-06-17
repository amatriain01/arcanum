import { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import {
  colorAmarillo,
  colorAmarilloClaro,
  colorAzul,
  colorAzulClaro,
} from "../app.config";
import Avatar from "./AvatarComponent";
import { Button, Icon } from "react-native-elements";
import { IndicadorActividad } from "./IndicadorActividadComponent";
import { checkAuthState } from "../redux/actions/autenticacion";
import { fetchComentariosUsuario } from "../redux/actions/comentarios";
import { fetchDiscusionesUsuario } from "../redux/actions/discusiones";
import { fetchLibrosEstados } from "../redux/actions/estados";
import BotonPerfil from "./BotonPerfilComponent";

const mapStateToProps = (state) => ({
  user: state.autenticacion.user,
  loading: state.libros.loading,
  loadingComentarios: state.comentarios.loading,
  error: state.libros.errMess,
  errorComentarios: state.comentarios.errMess,
  comentarios: state.comentarios.comentarios,
  discusiones: state.discusiones.discusiones,
  errorDiscusiones: state.discusiones.errMess,
  loadingDiscusiones: state.discusiones.loading,
  leyendo: state.estados.leyendo,
  leido: state.estados.leido,
  pendiente: state.estados.pendiente,
  loadingEstados: state.estados.loading,
  errorEstados: state.estados.errMess,
});

const mapDispatchToProps = (dispatch) => ({
  checkAuthState: () => dispatch(checkAuthState()),
  fetchComentariosUsuario: (idUsuario) =>
    dispatch(fetchComentariosUsuario(idUsuario)),
  fetchDiscusionesUsuario: (idUsuario) =>
    dispatch(fetchDiscusionesUsuario(idUsuario)),
  fetchLibrosEstados: (idUsuario, listName) =>
    dispatch(fetchLibrosEstados(idUsuario, listName)),
});
class Perfil extends Component {
  componentDidMount() {
    this.unsubscribeAuth = this.props.checkAuthState();
    this.props.fetchComentariosUsuario(this.props.user.uid);
    this.props.fetchDiscusionesUsuario(this.props.user.uid);
    this.props.fetchLibrosEstados(this.props.user.uid, "Leyendo");
    this.props.fetchLibrosEstados(this.props.user.uid, "Leido");
    this.props.fetchLibrosEstados(this.props.user.uid, "Pendiente");
  }

  componentWillUnmount() {
    if (this.unsubscribeAuth) {
      this.unsubscribeAuth();
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    const {
      user,
      comentarios,
      discusiones,
      loading,
      loadingComentarios,
      loadingDiscusiones,
      error,
      errorComentarios,
      errorDiscusiones,
      leyendo,
      leido,
      pendiente,
      errorEstados,
      loadingEstados,
    } = this.props;

    if (loading || loadingComentarios || loadingDiscusiones || loadingEstados) {
      return <IndicadorActividad />;
    }

    if (error || errorComentarios || errorDiscusiones || errorEstados) {
      console.log(
        "Error: ",
        error,
        errorComentarios,
        errorDiscusiones,
        errorEstados
      );
      return (
        <View>
          <Text>Error al cargar el Perfil.</Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.container}>
        <View>
          <View style={styles.infoContainer}>
            <Avatar nombre={user.displayName} />
            <View style={styles.textoInfo}>
              <Text style={styles.texto}>Nombre: {user.displayName}</Text>
              <Text style={styles.texto}>Email: {user.email}</Text>
            </View>
          </View>
        </View>
        <View>
          <BotonPerfil
            titulo={"Leidos"}
            icono={"check"}
            data={leido}
            navigate={this.props.navigation.navigate}
          />
        </View>
        <View>
          <BotonPerfil
            titulo={"Pendientes"}
            icono={"clock-o"}
            data={pendiente}
            navigate={this.props.navigation.navigate}
          />
        </View>
        <View>
          <BotonPerfil
            titulo={"Leyendo"}
            icono={"book"}
            data={leyendo}
            navigate={this.props.navigation.navigate}
          />
        </View>
        <View>
          <BotonPerfil
            titulo={"Discusiones"}
            icono={"comment"}
            data={discusiones}
            navigate={this.props.navigation.navigate}
          />
        </View>
        <View>
          <BotonPerfil
            titulo={"Mis Comentarios"}
            icono={"star"}
            data={comentarios}
            navigate={this.props.navigation.navigate}
            isComentarios={true}
          />
        </View>
        <Button
          title="Cerrar Sesión"
          buttonStyle={styles.logoutButton}
          onPress={() => navigate("Cerrar Sesión")}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorAzulClaro,
  },
  boton: {
    padding: 10,
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorAmarillo,
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: colorAzul,
  },
  infoContainer: {
    padding: 10,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colorAmarilloClaro,
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: colorAzul,
  },
  textoInfo: {
    marginLeft: 10,
    padding: 10,
    flex: 1,
  },
  texto: {
    fontSize: 16,
    padding: 5,
    textAlign: "justify",
  },
  logoutButton: {
    backgroundColor: "red",
    padding: 10,
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "red",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);
