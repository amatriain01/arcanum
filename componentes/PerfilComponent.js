import { Component } from "react";
import {
  Modal,
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
  Leyendo: state.estados.Leyendo,
  Leido: state.estados.Leido,
  Pendiente: state.estados.Pendiente,
  loadingEstados: state.estados.loading,
  errorEstados: state.estados.errMess,
});

const mapDispatchToProps = (dispatch) => ({
  checkAuthState: () => dispatch(checkAuthState()),
  fetchComentariosUsuario: (idUsuario) =>
    dispatch(fetchComentariosUsuario(idUsuario)),
  fetchDiscusionesUsuario: (idUsuario) =>
    dispatch(fetchDiscusionesUsuario(idUsuario)),
  fetchLibrosEstados: (idUsuario) =>
    dispatch(fetchLibrosEstados(idUsuario)),
});
class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    this.unsubscribeAuth = this.props.checkAuthState();
    this.props.fetchComentariosUsuario(this.props.user.uid);
    this.props.fetchDiscusionesUsuario(this.props.user.uid);
    this.props.fetchLibrosEstados(this.props.user.uid);
  }

  componentWillUnmount() {
    if (this.unsubscribeAuth) {
      this.unsubscribeAuth();
    }
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  closeModal() {
    this.setState({ showModal: false });
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
      Leyendo,
      Leido,
      Pendiente,
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
            data={Leido}
            navigate={this.props.navigation.navigate}
            toggleModal={this.toggleModal}
          />
        </View>
        <View>
          <BotonPerfil
            titulo={"Pendientes"}
            icono={"clock-o"}
            data={Pendiente}
            navigate={this.props.navigation.navigate}
            toggleModal={this.toggleModal}
          />
        </View>
        <View>
          <BotonPerfil
            titulo={"Leyendo"}
            icono={"book"}
            data={Leyendo}
            navigate={this.props.navigation.navigate}
            toggleModal={this.toggleModal}
          />
        </View>
        <View>
          <BotonPerfil
            titulo={"Discusiones"}
            icono={"comment"}
            data={discusiones}
            navigate={this.props.navigation.navigate}
            toggleModal={this.toggleModal}
          />
        </View>
        <View>
          <BotonPerfil
            titulo={"Mis Comentarios"}
            icono={"star"}
            data={comentarios}
            navigate={this.props.navigation.navigate}
            toggleModal={this.toggleModal}
            isComentarios={true}
          />
        </View>
        <Button
          title="Cerrar Sesión"
          buttonStyle={styles.logoutButton}
          onPress={() => navigate("Cerrar Sesión")}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showModal}
          onRequestClose={this.closeModal}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}>
            <View
              style={{
                backgroundColor: colorAmarilloClaro,
                padding: 20,
                borderRadius: 10,
              }}>
              <TouchableOpacity
                onPress={this.closeModal}
                style={{
                  position: "absolute",
                  right: 5,
                  top: 5,
                }}>
                <Icon name="times" type="font-awesome" size={20} />
              </TouchableOpacity>
              <Text style={styles.texto}>No hay información disponible.</Text>
            </View>
          </View>
        </Modal>
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
