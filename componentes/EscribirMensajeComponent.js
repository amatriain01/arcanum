import { Icon } from "@rneui/themed";
import { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Rating } from "react-native-elements";
import { connect } from "react-redux";
import { colorAmarilloClaro, colorAzul, colorAzulClaro } from "../app.config";
import { Button } from "@rneui/base";

const mapStateToProps = (state) => ({
  isAuthenticated: state.autenticacion.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  checkAuthState: () => dispatch(checkAuthState()),
});

class EscribirMensaje extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valoracion: 5,
      comentario: "",
      showModal: false,
    };
    this.resetForm = this.resetForm.bind(this);
    this.gestionarComentario = this.gestionarComentario.bind(this);
    this.volverAtras = this.volverAtras.bind(this);
  }

  resetForm() {
    this.setState({
      valoracion: 3,
      autor: "",
      comentario: "",
      dia: "",
      showModal: false,
    });
  }

  volverAtras() {
    this.resetForm();
    this.props.navigation.goBack();
  }

  gestionarComentario() {
    const { libroId } = this.props.route.params;
    const { valoracion, comentario } = this.state;
    const autor = "Yo"; //this.props.usuario.nombre; //Se cojera de redux
    const dia = new Date().toISOString();
    // if(isValoracion) {
    // this.props.postComentario(libroId, valoracion, autor, comentario, dia);
    // } else {
    //   this.props.postDiscusion(libroId, autor, comentario, dia);
    // }
    this.volverAtras();
  }

  render() {
    const { origen } = this.props.route.params || {};
    const isValoracion = origen === "Valoracion"; // true si se está escribiendo un mensaje en una valoracion, false si es discusion
    return (
      <View style={styles.container}>
        <View style={styles.contenedor}>
          <Input
            placeholder="Escribe tu mensaje"
            multiline={true}
            numberOfLines={4}
          />
          {isValoracion && (
            <Rating
              showRating
              onFinishRating={this.ratingCompleted}
              tintColor={colorAzulClaro}
              ratingBackgroundColor={colorAmarilloClaro}
              style={{ paddingVertical: 10 }}
              fractions={1}
              jumpValue={0.5}
            />
          )}
          <View style={{ flexDirection: "row" }}>
            <Button
              title={"Enviar"}
              type="clear"
              onPress={this.gestionarComentario}
            />
            <Button
              title={"Cancelar"}
              type="clear"
              onPress={this.volverAtras}
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: colorAmarilloClaro,
    justifyContent: "center",
  },
  contenedor: {
    width: "100%",
    backgroundColor: colorAzulClaro,
    padding: 30,
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: colorAzul,
    alignItems: "center",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EscribirMensaje);
