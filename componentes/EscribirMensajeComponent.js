import { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Rating } from "react-native-elements";
import { connect } from "react-redux";
import { colorAmarilloClaro, colorAzul, colorAzulClaro } from "../app.config";
import { Button } from "@rneui/base";
import { checkAuthState } from "../redux/actions/autenticacion";
import { postComentario } from "../redux/actions/comentarios";
import { postDiscusion } from "../redux/actions/discusiones";
import { fetchComentarios } from "../redux/actions/comentarios";
import { fetchDiscusiones } from "../redux/actions/discusiones";

const mapStateToProps = (state) => ({
  isAuthenticated: state.autenticacion.isAuthenticated,
  user: state.autenticacion.user,
});

const mapDispatchToProps = (dispatch) => ({
  checkAuthState: () => dispatch(checkAuthState()),
  postComentario: (comentario) => dispatch(postComentario(comentario)),
  fetchComentarios: (idLibro) => dispatch(fetchComentarios(idLibro)),
  postDiscusion: (discusion) => dispatch(postDiscusion(discusion)),
  fetchDiscusiones: (idLibro) => dispatch(fetchDiscusiones(idLibro)),
});

class EscribirMensaje extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valoracion: 3,
      texto: "",
      showModal: false,
    };
    this.handleTexto = this.handleTexto.bind(this);
    this.ratingCompleted = this.ratingCompleted.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.gestionarComentario = this.gestionarComentario.bind(this);
    this.volverAtras = this.volverAtras.bind(this);
    this.isComentario = this.isComentario.bind(this);
  }

  componentDidMount() {
    this.unsubscribeAuth = this.props.checkAuthState();
  }

  componentWillUnmount() {
    if (this.unsubscribeAuth) {
      this.unsubscribeAuth();
    }
    this.resetForm();
  }

  handleTexto = (texto) => {
    this.setState({ texto });
  }

  ratingCompleted = (valoracion) => {
    this.setState({ valoracion });
  }

  resetForm() {
    this.setState({
      valoracion: 3,
      texto: "",
      showModal: false,
    });
  }

  volverAtras() {
    this.resetForm();
    this.props.navigation.goBack();
  }

  isComentario() {
    const { origen } = this.props.route.params || {};
    return origen === "Comentarios";
  }

  gestionarComentario() {
    const { user } = this.props;
    const { idLibro } = this.props.route.params;
    const { valoracion, texto } = this.state;

    if (this.isComentario()) {
      if (user) {
        const comentario = {
          nombre: user.displayName,
          fecha: new Date().toISOString(),
          idLibro: idLibro,
          idUsuario: user.uid,
          valoracion: valoracion.toString(),
          mensaje: texto
        };
        this.props.postComentario(comentario);
        this.props.fetchComentarios(idLibro);
      }
    } else {
      if (user) {
        const comentario = {
          nombre: user.displayName,
          fecha: new Date().toISOString(),
          idLibro: idLibro,
          idUsuario: user.uid,
          mensaje: texto,
        };
        this.props.postDiscusion(comentario);
        this.props.fetchDiscusiones(idLibro);
      }
    }
    this.volverAtras();
  }

  render() {
    const { texto, valoracion } = this.state;
    const { idLibro } = this.props.route.params;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.contenedor}>
          <Input
            placeholder="Escribe tu mensaje..."
            multiline={true}
            numberOfLines={2}
            value={texto}
            inputStyle={{ padding: 10 }}
            inputContainerStyle={{ padding: 10 }}
            containerStyle={{ padding: 10 }}
            style={{ padding: 10 }}
            placeholderTextColor={colorAzul}
            onChangeText={this.handleTexto}
          />
          {this.isComentario() && (
            <Rating
              showRating
              onFinishRating={this.ratingCompleted}
              tintColor={colorAzulClaro}
              ratingBackgroundColor={colorAmarilloClaro}
              style={{ paddingVertical: 10 }}
              fractions={1}
              jumpValue={0.5}
              startingValue={valoracion}
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
              onPress={() =>
                navigate("DetalleLibro", { idLibro: idLibro })}
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
