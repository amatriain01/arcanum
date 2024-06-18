import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);
import { Component } from "react";
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
import { fetchComentariosValoracionMedia } from "../redux/actions/comentarios";
import { moveLibroEstados, removeLibroEstados, addLibroEstados } from "../redux/actions/estados";
import AsyncStorage from '@react-native-async-storage/async-storage';

const mapStateToProps = (state) => ({
  isAuthenticated: state.autenticacion.isAuthenticated,
  user: state.autenticacion.user,
  loadingLibros: state.libros.loading,
  errorLibros: state.libros.errMess,
  libro: state.libros.libro,
  loadingComentarios: state.comentarios.loading,
  errorComentarios: state.comentarios.errMess,
  valoracionMedia: state.comentarios.valoracionMedia,
  leido: state.estados.leido,
  leyendo: state.estados.leyendo,
  pendiente: state.estados.pendiente,
});

const mapDispatchToProps = (dispatch) => ({
  checkAuthState: () => dispatch(checkAuthState()),
  fetchDetalleLibro: (idLibro) => dispatch(fetchDetalleLibro(idLibro)),
  fetchComentariosValoracionMedia: (idLibro) =>
    dispatch(fetchComentariosValoracionMedia(idLibro)),
  moveLibroEstados: (idUsuario, fromList, toList, idLibro) => dispatch(moveLibroEstados(idUsuario, fromList, toList, idLibro)),
  removeLibroEstados: (idUsuario, listName, idLibro) => dispatch(removeLibroEstados(idUsuario, listName, idLibro)),
  addLibroEstados: (idUsuario, listName, idLibro) => dispatch(addLibroEstados(idUsuario, listName, idLibro)),
});

class DetalleLibro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selected: "Sin estado",
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleSelect = async (selectedKey) => {
    const { libro, isAuthenticated, moveLibroEstados, removeLibroEstados, addLibroEstados, user } = this.props;
    const { selected: oldSelected } = this.state;
    const listadoEstados = [
      { key: 0, value: "Sin estado" },
      { key: 1, value: "Pendiente" },
      { key: 2, value: "Leyendo" },
      { key: 3, value: "Leido" },
    ];

    const selectedValue = listadoEstados.find(item => item.key === selectedKey)?.value || "Sin estado";

    if (selectedValue !== oldSelected) {
      if (isAuthenticated) {
        if (oldSelected === "Sin estado") {
          addLibroEstados(user.uid, selectedValue, libro.idLibro);
        } else if (selectedValue === "Sin estado") {
          removeLibroEstados(user.uid, oldSelected, libro.idLibro);
        } else {
          moveLibroEstados(user.uid, oldSelected, selectedValue, libro.idLibro);
        }
        this.setState({ selected: selectedValue });
        try {
          await AsyncStorage.setItem(`selectedEstado_${libro.idLibro}_${user.uid}`, selectedValue);
          console.log('Guardado en AsyncStorage:', selectedValue);
        } catch (error) {
          console.log('Error al guardar en AsyncStorage:', error);
        }
      } else {
        this.toggleModal();
      }
    }
  };

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  async componentDidMount() {
    const { idLibro } = this.props.route.params;
    const { user } = this.props;
    const listadoEstados = [
      { key: 0, value: "Sin estado" },
      { key: 1, value: "Pendiente" },
      { key: 2, value: "Leyendo" },
      { key: 3, value: "Leido" },
    ];

    if (idLibro) {
      this.props.fetchDetalleLibro(idLibro);
      this.props.fetchComentariosValoracionMedia(idLibro);
    }

    this.focusListener = this.props.navigation.addListener("focus", async () => {
      this.props.fetchDetalleLibro(idLibro);
      this.props.fetchComentariosValoracionMedia(idLibro);
      try {
        const selected = await AsyncStorage.getItem(`selectedEstado_${idLibro}_${user.uid}`);
        if (selected && listadoEstados.some(option => option.value === selected)) {
          this.setState({ selected });
        } else {
          this.setState({ selected: "Sin estado" });
        }
        console.log('Recuperado de AsyncStorage:', selected);
      } catch (error) {
        console.log('Error al recuperar de AsyncStorage:', error);
      }
    });
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
    const {
      libro,
      loadingLibros,
      errorLibros,
      isAuthenticated,
      valoracionMedia,
      loadingComentarios,
      errorComentarios,
    } = this.props;

    if (loadingLibros || !libro || loadingComentarios) {
      return <IndicadorActividad />;
    }

    if (errorLibros || errorComentarios) {
      return (
        <View>
          <Text>Error al cargar el libro.</Text>
        </View>
      );
    }
    const listadoEstados = [
      { key: 0, value: "Sin estado" },
      { key: 1, value: "Pendiente" },
      { key: 2, value: "Leyendo" },
      { key: 3, value: "Leido" },
    ];

    return (
      <ScrollView style={{ backgroundColor: colorAmarilloClaro }}>
        <View>
          <Card containerStyle={styles.container}>
            <Card.Title style={styles.titulo}>{libro.titulo}</Card.Title>
            <View style={styles.cuerpo}>
              <Card.Image
                source={{ uri: libro.imagen }}
                style={styles.imagen}
              />
              <View style={styles.info}>
                <SelectList
                  setSelected={this.handleSelect}
                  data={listadoEstados}
                  search={false}
                  save="key"
                  defaultOption={listadoEstados.find(option => option.value === this.state.selected) || { key: 0, value: "Sin estado" }}
                  style={{ width: 300, color: colorAzul }}
                />
                <Text style={styles.texto}>Autor: {libro.autor}</Text>
                <Text style={styles.texto}>
                  Fecha de publicacion: {libro.fechaPublicacion}
                </Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.texto}>
                    Puntuación: {isNaN(valoracionMedia) ? "-" : valoracionMedia}{" "}
                  </Text>
                  <Icon
                    name="star"
                    type="font-awesome"
                    size={20}
                    color={colorAmarillo}
                  />
                </View>
                <Text style={styles.texto}>{libro.descripcion}</Text>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.boton}
                  onPress={() => {
                    if (isAuthenticated) {
                      navigate("Discusion", {
                        idLibro: libro.idLibro,
                      });
                    } else {
                      toggleModal();
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
                    if (isAuthenticated) {
                      navigate("Comentarios", {
                        idLibro: libro.idLibro,
                      });
                    } else {
                      toggleModal();
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
