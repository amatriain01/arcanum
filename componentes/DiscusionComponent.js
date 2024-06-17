import { Component } from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import { Button, ListItem } from "react-native-elements";
import {
  colorAmarillo,
  colorAmarilloClaro,
  colorAzul,
  colorAzulClaro,
} from "../app.config";
import { Icon } from "@rneui/base";
import { checkAuthState } from "../redux/actions/autenticacion";
import { fetchDiscusiones } from "../redux/actions/discusiones";
import { IndicadorActividad } from "./IndicadorActividadComponent";

const mapStateToProps = (state) => ({
  isAuthenticated: state.autenticacion.isAuthenticated,
  user: state.autenticacion.user,
  discusiones: state.discusiones.discusiones,
  error: state.discusiones.errMess,
  loading: state.discusiones.loading
});

const mapDispatchToProps = (dispatch) => ({
  checkAuthState: () => dispatch(checkAuthState()),
  fetchDiscusiones: (idLibro) => dispatch(fetchDiscusiones(idLibro))
});

class Discusion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchDiscusiones(this.props.route.params.idLibro);
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
    const { isAuthenticated, discusiones, loading, error, user } = this.props;
    const { idLibro } = this.props.route.params;

    if (!isAuthenticated) {
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: "Inicio" }],
      });
    }

    const miDiscusion = (uidDiscusion, idUsuario) => {
      if (uidDiscusion === idUsuario) {
        return colorAmarillo;
      } else {
        return colorAmarilloClaro;
      }
    };

    if (loading) {
      return (
        <IndicadorActividad />
      );
    }

    if (error) {
      console.log('Error: ', error);
      return (
        <View>
          <Text>Error al cargar las discusiones.</Text>
        </View>
      );
    }

    function formatDate(dateString) {
      var date = new Date(dateString.replace(/\s/g, ''));
      var year = date.getFullYear();
      var month = ('0' + (date.getMonth() + 1)).slice(-2);
      var day = ('0' + date.getDate()).slice(-2);
      var hours = ('0' + date.getHours()).slice(-2);
      var minutes = ('0' + date.getMinutes()).slice(-2);
      var seconds = ('0' + date.getSeconds()).slice(-2);
      return day + '/' + month + '/' + year + ', ' + hours + ':' + minutes + ':' + seconds;
    }

    const renderDiscusionesItem = ({ item, index }) => {
      return (
        <ListItem
          containerStyle={styles.containerDiscusion}
          key={index}
          bottomDivider>
          <View
            style={{
              backgroundColor: miDiscusion(item.idUsuario, user.uid),
              padding: 20,
              width: "100%",
            }}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>{item.nombre}</Text>
              </View>
              <Text style={styles.fecha}>{formatDate(item.fecha)}</Text>
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
            onPress={() => navigate("EscribirMensaje", { idLibro: idLibro, origen: "Discusion" })}
          />
        </View>
        <FlatList
          data={discusiones}
          renderItem={renderDiscusionesItem}
          keyExtractor={(item) => item.idDiscusion.toString()}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={(discusiones.length === 0) || this.state.showModal}
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
                Actualmente no hay una discusión sobre este libro. ¿Deseas
                iniciar una?
              </Text>
              <View style={styles.buttonContainer}>
                <Button
                  title="Sí"
                  buttonStyle={styles.yesButton}
                  onPress={() =>
                    navigate("EscribirMensaje", {
                      idLibro: idLibro,
                      origen: "Discusion",
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
    backgroundColor: colorAzulClaro,
    height: 200,
    justifyContent: "center",
  },
  containerDiscusion: {
    flexDirection: "column",
    backgroundColor: colorAzulClaro,
    minHeight: 100,
    width: "100%",
  },
  boton: {
    flexDirection: "row",
    backgroundColor: colorAzul,
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

export default connect(mapStateToProps, mapDispatchToProps)(Discusion);
