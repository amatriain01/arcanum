import { Component } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { colorAmarillo, colorAmarilloClaro, colorAzul, colorAzulClaro } from "../app.config";
import { View } from "react-native";
import { Icon } from "@rneui/themed";
import { ListItem } from "react-native-elements";
import { checkAuthState } from "../redux/actions/autenticacion";
import { fetchComentariosUsuario } from "../redux/actions/comentarios";
import { IndicadorActividad } from "./IndicadorActividadComponent";
import { fetchLibrosPorIds } from "../redux/actions/libros";

const mapStateToProps = (state) => ({
  isAuthenticated: state.autenticacion.isAuthenticated,
  user: state.autenticacion.user,
  comentarios: state.comentarios.comentarios,
  libros: state.libros.libros,
  loading: state.libros.loading,
  loadingComentarios: state.comentarios.loading,
  error: state.libros.errMess,
  errorComentarios: state.comentarios.errMess,
});

const mapDispatchToProps = (dispatch) => ({
  checkAuthState: () => dispatch(checkAuthState()),
  fetchComentariosUsuario: (idUsuario) => dispatch(fetchComentariosUsuario(idUsuario)),
  fetchLibrosPorIds: (idsLibro) => dispatch(fetchLibrosPorIds(idsLibro)),
});

class MisComentarios extends Component {
  componentDidMount() {
    this.props.fetchComentariosUsuario(this.props.user.uid);
    this.unsubscribeAuth = this.props.checkAuthState();
  }

  componentDidUpdate(prevProps) {
    let idLibros = [];
    if (this.props.comentarios !== prevProps.comentarios) {
      this.props.comentarios.forEach((comentario) => {
        idLibros.push(comentario.idLibro);
      });
      this.props.fetchLibrosPorIds(idLibros);
    }
  
  }

  componentWillUnmount() {
    if (this.unsubscribeAuth) {
      this.unsubscribeAuth();
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    const { isAuthenticated, comentarios, loading, error, user, libros } = this.props;

    if (loading) {
      return <IndicadorActividad />;
    }

    if (error) {
      console.log("Error: ", error);
      return (
        <View>
          <Text>Error al cargar los comentarios.</Text>
        </View>
      );
    }

    function formatDate(dateString) {
      var date = new Date(dateString.replace(/\s/g, ""));
      var year = date.getFullYear();
      var month = ("0" + (date.getMonth() + 1)).slice(-2);
      var day = ("0" + date.getDate()).slice(-2);
      var hours = ("0" + date.getHours()).slice(-2);
      var minutes = ("0" + date.getMinutes()).slice(-2);
      var seconds = ("0" + date.getSeconds()).slice(-2);
      return (
        day +
        "/" +
        month +
        "/" +
        year +
        ", " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    }

    const renderComentariosItem = ({ item, index }) => {
      return (
        <ListItem
          containerStyle={styles.containerComentario}
          key={index}
          bottomDivider>
          <TouchableOpacity
          onPress={() => navigate("Biblioteca",{screen: "DetalleLibro", params: { idLibro: item.idLibro },})}
            style={{
              backgroundColor: colorAzulClaro,
              padding: 20,
              width: "100%",
              borderRadius: 10,
              borderWidth: 2,
              borderStyle: "solid",
              borderColor: colorAzul,
            }}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
              {/* Aqui iría el nombre del libro */}
                <Text style={{ fontWeight: "bold" }}>{libros[index].titulo}</Text>   
              </View>
              <Text style={styles.fecha}>{formatDate(item.fecha)}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Text style={styles.texto}>{item.valoracion}</Text>
              <Icon
                name="star"
                type="font-awesome"
                size={20}
                color={colorAmarillo}
              />
            </View>
            <Text style={styles.texto}>{item.mensaje}</Text>
          </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(MisComentarios);
