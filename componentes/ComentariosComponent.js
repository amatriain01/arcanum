import { Component } from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import {
  colorAmarillo,
  colorAmarilloClaro,
  colorAzul,
  colorAzulClaro,
  colorAzulIntermedio,
} from "../app.config";
import { View } from "react-native";
import { Icon } from "@rneui/themed";
import { Button, ListItem } from "react-native-elements";
import { checkAuthState } from "../redux/actions/autenticacion";
import { fetchComentarios } from "../redux/actions/comentarios";
import { IndicadorActividad } from "./IndicadorActividadComponent";

const mapStateToProps = (state) => ({
  isAuthenticated: state.autenticacion.isAuthenticated,
  user: state.autenticacion.user,
  comentarios: state.comentarios.comentarios,
  error: state.comentarios.errMess,
  loading: state.comentarios.loading,
});

const mapDispatchToProps = (dispatch) => ({
  checkAuthState: () => dispatch(checkAuthState()),
  fetchComentarios: () => dispatch(fetchComentarios())
});

const nombreUsuario = "Juan Perez"; //¿Se podría oberner de redux?


class Comentarios extends Component {
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
    this.props.fetchComentarios();
    // if (this.props.comentarios.length === 0) {
    //   this.setState({ showModal: true });
    // };
  }

  componentDidUpdate() {
    this.unsubscribeAuth = this.props.checkAuthState();
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
    const { isAuthenticated, user, loading, comentarios, error } = this.props;
    const { idLibro } = this.props.route.params;

    if (!isAuthenticated) {
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: "Inicio" }],
      });
    }

    if (loading || comentarios.length === 0) {
      console.log(comentarios);
      return <IndicadorActividad />;
    }

    if (error) {
      return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.texto}>
            Se ha producido un error al cargar los comentarios.
          </Text>
        </SafeAreaView>
      );
    }

    const miComentario = (nombreComentario, nombreUsuario) => {
      if (nombreComentario === nombreUsuario) {
        return colorAzulIntermedio;
      } else {
        return colorAzulClaro;
      }
    };

    const renderComentariosItem = ({ item, index }) => {
      return (
        <ListItem
          containerStyle={styles.containerComentario}
          key={index}
          bottomDivider>
          <View
            style={{
              backgroundColor: miComentario(item.nombre, nombreUsuario),
              padding: 20,
              width: "100%",
              borderRadius: 10,
              borderWidth: 2,
              borderStyle: "solid",
              borderColor: colorAzul,
            }}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>{item.nombre}</Text>
              </View>
              <Text style={styles.fecha}>{item.fecha}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Text style={styles.texto}>{item.puntuacion}</Text>
              <Icon
                name="star"
                type="font-awesome"
                size={20}
                color={colorAmarillo}
              />
            </View>
            <Text style={styles.texto}>{item.mensaje}</Text>
          </View>
        </ListItem>
      );
    };

    return (
      <SafeAreaView style={styles.container}>
        <View style={{ backgroundColor: colorAzul, paddingBottom: 10 }}>
          <Icon
            name="plus-circle"
            type="font-awesome"
            size={28}
            color={colorAmarillo}
            onPress={() =>
              navigate("EscribirMensaje", {
                idLibro: idLibro,
                origen: "Comentarios",
              })
            }
          />
        </View>
        <FlatList
          data={comentarios}
          renderItem={renderComentariosItem}
          keyExtractor={(item) => item.idComentario.toString()}
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
              <Text style={styles.texto}>
                Actualmente no hay reseñas de este libro. ¿Deseas escribir
                una?
              </Text>
              <View style={styles.buttonContainer}>
                <Button
                  title="Sí"
                  buttonStyle={styles.yesButton}
                  onPress={() =>
                    navigate("EscribirMensaje", {
                      idLibro: idLibro,
                      origen: "Comentarios",
                    })
                  }
                />
                <Button
                  title="No"
                  buttonStyle={styles.noButton}
                  onPress={() =>
                    navigate("DetalleLibro", { idLibro: idLibro })
                  }
                />
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorAmarilloClaro,
    height: 200,
    justifyContent: "center",
  },
  containerComentario: {
    flexDirection: "column",
    backgroundColor: colorAmarilloClaro,
    minHeight: 100,
    width: "100%",
  },
  ratingContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    paddingVertical: 5,
    alignItems: "center",
  },
  boton: {
    flexDirection: "row",
    backgroundColor: colorAmarillo,
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  texto: {
    fontSize: 16,
    padding: 5,
    textAlign: "justify",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  yesButton: {
    backgroundColor: "green",
    margin: 10,
    width: 50,
  },
  noButton: {
    backgroundColor: "red",
    margin: 10,
    width: 50,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Comentarios);
