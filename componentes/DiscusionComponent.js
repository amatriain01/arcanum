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
import { checkAuthState } from "../redux/actions/autenticacion";
import { Icon } from "@rneui/base";

const mapStateToProps = (state) => ({
  isAuthenticated: state.autenticacion.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  checkAuthState: () => dispatch(checkAuthState()),
});

const comentariosLibro = [
  {
    id: 1,
    nombre: "Juan Pérez",
    fecha: "2024-06-01",
    mensaje:
      "¿Qué opinan del final del libro? Me pareció inesperado pero muy bien logrado.",
  },
  {
    id: 2,
    nombre: "María Gómez",
    fecha: "2024-06-02",
    mensaje:
      "A mí también me sorprendió el final. ¿Creen que habrá una secuela?",
  },
  {
    id: 3,
    nombre: "Carlos Sánchez",
    fecha: "2024-06-03",
    mensaje:
      "Creo que el desarrollo de los personajes principales fue excelente. ¿Alguien más piensa que el villano tenía motivos justificados?",
  },
  {
    id: 4,
    nombre: "Ana Rodríguez",
    fecha: "2024-06-04",
    mensaje:
      "Yo no estoy tan segura de eso, me pareció que algunos de sus motivos eran un poco forzados.",
  },
  {
    id: 5,
    nombre: "Luis Fernández",
    fecha: "2024-06-05",
    mensaje:
      "¿Qué les pareció la parte en la que el protagonista descubre su verdadero origen? Para mí, fue el mejor momento del libro.",
  },
  {
    id: 6,
    nombre: "Laura Méndez",
    fecha: "2024-06-06",
    mensaje:
      "Ese momento fue increíble. Pero, ¿no les parece que el ritmo del libro decae un poco en la mitad?",
  },
  {
    id: 7,
    nombre: "Pedro López",
    fecha: "2024-06-07",
    mensaje:
      "Sí, concuerdo. La mitad del libro se siente un poco lenta, aunque la construcción del mundo es fascinante.",
  },
  {
    id: 8,
    nombre: "Elena Díaz",
    fecha: "2024-06-08",
    mensaje:
      "Totalmente de acuerdo. Además, me pareció que algunos personajes secundarios no se desarrollaron lo suficiente. ¿Qué piensan?",
  },
  {
    id: 9,
    nombre: "Ricardo Morales",
    fecha: "2024-06-09",
    mensaje:
      "Estoy de acuerdo, algunos personajes secundarios eran interesantes, pero no tuvieron suficiente tiempo en la historia.",
  },
  {
    id: 10,
    nombre: "Sofía Jiménez",
    fecha: "2024-06-10",
    mensaje:
      "¿Alguien notó las referencias a otras obras del autor? Me encantó encontrar esos pequeños detalles.",
  },
];
const numbreUsuario = "Juan Pérez"; //¿Se podría oberner de redux?

const miComentario = (nombreComentario, nombreUsuario) => {
  if (nombreComentario === nombreUsuario) {
    return colorAmarillo;
  } else {
    return colorAmarilloClaro;
  }
};

const renderComentariosItem = ({ item, index }) => {
  return (
    <ListItem
      containerStyle={styles.containerDiscusion}
      key={index}
      bottomDivider>
      <View
        style={{
          backgroundColor: miComentario(item.nombre, numbreUsuario),
          padding: 20,
          width: "100%",
        }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold" }}>{item.nombre}</Text>
          </View>
          <Text style={styles.fecha}>{item.fecha}</Text>
        </View>
        <Text style={styles.texto}>{item.mensaje}</Text>
      </View>
    </ListItem>
  );
};

class Discusion extends Component {
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
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }
  closeModal() {
    this.setState({ showModal: false });
  }
  render() {
    const { navigate } = this.props.navigation;
    const { libroId } = this.props.route.params;
    if (!this.props.isAuthenticated) {
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: "Inicio" }],
      });
    } else {
      return (
        <SafeAreaView>
          <View style={{ backgroundColor:colorAzul, paddingBottom:10}}>
            <Icon
              name="plus-circle"
              type="font-awesome"
              size={28}
              color={colorAmarillo}
              onPress={() => navigate("EscribirMensaje" , {libroId: libroId, origen: "Discusion"})}
            />
          </View>
          <FlatList
            data={comentariosLibro}
            renderItem={renderComentariosItem}
            keyExtractor={(item) => item.id.toString()}
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
                  Actualmente no hay una discusión sobre este libro. ¿Deseas
                  iniciar una?
                </Text>
                <View style={styles.buttonContainer}>
                  <Button
                    title="Sí"
                    buttonStyle={styles.yesButton}
                    onPress={() =>
                      navigate("EscribirMensaje", {
                        libroId: libroId,
                        origen: "Discusion",
                      })
                    }
                  />
                  <Button
                    title="No"
                    buttonStyle={styles.noButton}
                    onPress={() =>
                      navigate("DetalleLibro", { libroId: libroId })
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
