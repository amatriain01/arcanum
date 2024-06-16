import { Component, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import { Card, Icon } from "react-native-elements";
import {
  colorAmarillo,
  colorAmarilloClaro,
  colorAzul,
  colorAzulClaro,
} from "../app.config";
import { SelectList } from "react-native-dropdown-select-list";
import { connect } from "react-redux";
import { checkAuthState } from "../redux/actions/autenticacion";
import { fetchDetalleLibro } from "../redux/actions/libros";
import { IndicadorActividad } from "./IndicadorActividadComponent";

const mapStateToProps = (state) => ({
  isAuthenticated: state.autenticacion.isAuthenticated,
  loading: state.libros.loading,
  error: state.libros.errMess,
  libro: state.libros.libro,
});

const mapDispatchToProps = (dispatch) => ({
  checkAuthState: () => dispatch(checkAuthState()),
  fetchDetalleLibro: (idLibro) => dispatch(fetchDetalleLibro(idLibro)),
});

function InfoLibro(props) {
  const listadoEstados = [
    { key: 0, value: "Sin estado" },
    { key: 1, value: "Pendiente" },
    { key: 2, value: "Leyendo" },
    { key: 3, value: "Leído" }
  ];

  //Aqui sería que compruebe si ya hay uno y lo ponga y si no por defecto
  // estado != null ? estado : "Selecciona un estado"
  const [selected, setSelected] = useState("Selecciona un estado");
  return (
    <View>
      <Card containerStyle={styles.container}>
        <Card.Title style={styles.titulo}>{props.libro.titulo}</Card.Title>
        <View style={styles.cuerpo}>
          <Card.Image source={{ uri: props.libro.imagen }} style={styles.imagen} />
          <View style={styles.info}>
            <SelectList
              setSelected={(val) => setSelected(val)}
              data={listadoEstados}
              save="value"
              search={false}
              placeholder="Selecciona un estado"
              defaultOption={{ key: 0, value: selected }}
              style={{ width: 300, color: colorAzul }}
            />
            <Text style={styles.texto}>Autor: {props.libro.autor}</Text>
            <Text style={styles.texto}>
              Fecha de publicacion: {props.libro.fechaPublicacion}
            </Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.texto}>
                Puntuación: {props.libro.valoracion}{" "}
              </Text>
              <Icon
                name="star"
                type="font-awesome"
                size={20}
                color={colorAmarillo}
              />
            </View>
            <Text style={styles.texto}>{props.libro.descripcion}</Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.boton}
              onPress={() => {
                if (props.isAuthenticated) {
                  props.navigate("Discusion", { idLibro: props.libro.idLibro });
                } else {
                  props.toggleModal();
                }
              }}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.texto}>Ver la discusión del libro</Text>
              </View>
              <Icon
                name="arrow-right"
                type="font-awesome"
                size={20}
                color={colorAzul}
                style={{ margin: 5 }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.boton}
              onPress={() => {
                if (props.isAuthenticated) {
                  props.navigate("Valoraciones", { idLibro: props.libro.idLibro });
                } else {
                  props.toggleModal();
                }
              }}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.texto}>Ver las reseñas del libro</Text>
              </View>
              <Icon
                name="arrow-right"
                type="font-awesome"
                size={20}
                color={colorAzul}
                style={{ margin: 5 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </View>
  );
}

class DetalleLibro extends Component {
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

  componentDidMount() {
    const { idLibro } = this.props.route.params;

    if (idLibro) {
      this.props.fetchDetalleLibro(idLibro);
    }
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.props.fetchDetalleLibro(idLibro);
    });
    this.unsubscribeAuth = this.props.checkAuthState();
  }

  componentDidUpdate() {
    this.unsubscribeAuth = this.props.checkAuthState();
  }

  componentWillUnmount() {
    if (this.unsubscribeAuth) {
      this.unsubscribeAuth();
    }
    if (this.focusListener) {
      this.focusListener();
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { libro, loading, error, isAuthenticated } = this.props;

    if (loading || !libro) {
      return <IndicadorActividad />;
    }

    if (error) {
      return (
        <View>
          <Text>Error al cargar el libro.</Text>
        </View>
      );
    }

    return (
      <ScrollView style={{ backgroundColor: colorAmarilloClaro }}>
        <InfoLibro
          navigate={navigate}
          toggleModal={this.toggleModal}
          isAuthenticated={isAuthenticated}
          libro={libro}
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
                Debes iniciar sesión para acceder a este sitio
              </Text>
              <View>
                <TouchableOpacity
                  style={styles.boton}
                  onPress={() => navigate("Iniciar Sesión")}>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={styles.texto}>Iniciar Sesion</Text>
                  </View>
                  <Icon
                    name="arrow-right"
                    type="font-awesome"
                    size={20}
                    color={colorAzul}
                    style={{ margin: 5 }}
                  />
                </TouchableOpacity>
              </View>
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
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: colorAzul,
    height: "100%",
    padding: 10,
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: colorAzul,
  },
  imagen: {
    height: 250,
    resizeMode: "contain",
    margin: 10,
  },
  cuerpo: {
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: colorAzulClaro,
    backgroundColor: colorAzulClaro,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    backgroundColor: colorAzul,
    color: colorAmarillo,
  },
  info: {
    alignItems: "center",
    padding: 10,
  },
  texto: {
    fontSize: 16,
    padding: 5,
    textAlign: "justify",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  boton: {
    margin: 5,
    backgroundColor: colorAmarillo,
    padding: 10,
    flexDirection: "row",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: colorAmarillo,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleLibro);
