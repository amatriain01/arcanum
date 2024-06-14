import { Icon } from "@rneui/base";
import { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import { colorAzulClaro, colorAmarilloClaro } from "../app.config";
import { connect } from "react-redux";
import { checkAuthState, registerUser, clearError } from "../redux/actions/autenticacion";

const mapStateToProps = (state) => ({
  loading: state.autenticacion.loading,
  error: state.autenticacion.error,
  isAuthenticated: state.autenticacion.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  registerUser: (nombre, apellido, email, password) => dispatch(registerUser(nombre, apellido, email, password)),
  checkAuthState: () => dispatch(checkAuthState()),
  clearError: () => dispatch(clearError()),
});

class Registro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      password2: "",
      errorLocal: "",
    };
    this.handleRegister = this.handleRegister.bind(this);
  }

  componentDidMount() {
    this.props.clearError();
    this.unsubscribeAuth = this.props.checkAuthState();
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.resetForm();
      this.props.clearError();
      this.unsubscribeAuth = this.props.checkAuthState();
    });
    if (this.props.isAuthenticated) {
      this.volverInicio();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isAuthenticated !== this.props.isAuthenticated && this.props.isAuthenticated) {
      this.volverInicio();
    }
  }

  componentWillUnmount() {
    if (this.unsubscribeAuth) {
      this.unsubscribeAuth();
    }
    if (this.focusListener) {
      this.focusListener();
    }
  }

  handleNombreChange = (nombre) => {
    this.setState({ nombre });
  };

  handleApellidoChange = (apellido) => {
    this.setState({ apellido });
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handlePassword2Change = (password2) => {
    this.setState({ password2 });
  };

  volverInicio() {
    const { navigation, isAuthenticated } = this.props;
    if (isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Inicio" }],
      });
    }
  }

  resetForm() {
    this.setState({
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      password2: "",
      errorLocal: "",
    });
  }

  resetPassword() {
    this.setState({
      password: "",
      password2: "",
    });
  }

  handleRegister() {
    const { nombre, apellido, email, password, password2, errorLocal } = this.state;
    if (!nombre || !apellido || !email || !password || !password2) {
      errorLocal = "Todos los campos son obligatorios.";
      this.setState({ errorLocal });
      return;
    }
    else if (!email.includes("@") || !email.includes(".")) {
      errorLocal = "El email no es válido.";
      this.setState({ errorLocal });
      return;
    }
    else if (password.length < 6) {
      errorLocal = "La contraseña debe tener al menos 6 caracteres.";
      this.setState({ errorLocal });
      return;
    }
    else if (password !== password2) {
      errorLocal = "Las contraseñas no coinciden.";
      this.setState({ errorLocal });
      return;
    }
    this.props.registerUser(nombre, apellido, email, password);
    this.resetPassword();
    this.props.clearError();
  }

  render() {
    const { nombre, apellido, email, password, password2, errorLocal } = this.state;
    const { loading, error } = this.props;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.form}>
            <Input
              inputStyle={{ padding: 10 }}
              placeholder="Nombre"
              leftIcon={<Icon name="user" type="font-awesome" size={24} />}
              value={nombre}
              onChangeText={this.handleNombreChange}
            />
            <Input
              inputStyle={{ padding: 10 }}
              name="apellido"
              placeholder="Apellido"
              leftIcon={<Icon name="user" type="font-awesome" size={24} />}
              value={apellido}
              onChangeText={this.handleApellidoChange}
            />
            <Input
              inputStyle={{ padding: 10 }}
              name="email"
              placeholder="Email"
              leftIcon={<Icon name="envelope" type="font-awesome" size={24} />}
              value={email}
              onChangeText={this.handleEmailChange}
              autoCapitalize="none"
            />
            <Input
              inputStyle={{ padding: 10 }}
              name="password"
              placeholder="Contraseña"
              leftIcon={<Icon name="lock" type="font-awesome" size={24} />}
              value={password}
              secureTextEntry
              onChangeText={this.handlePasswordChange}
              autoCapitalize="none"
            />
            <Input
              inputStyle={{ padding: 10 }}
              name="password2"
              placeholder="Repite la contraseña"
              leftIcon={<Icon name="lock" type="font-awesome" size={24} />}
              value={password2}
              secureTextEntry
              onChangeText={this.handlePassword2Change}
              autoCapitalize="none"
            />
          </View>
          {(errorLocal || error) && (
            <Text style={styles.errorText}>
              {errorLocal || "Fallo al registrar el usuario, inténtelo de nuevo."}
            </Text>
          )}
          <View style={styles.fila}>
            <Button
              title={"Iniciar Sesión"}
              type="clear"
              onPress={() => navigate("LoginNavegador")}
              disabled={loading}
            />
            <Button
              title={loading ? "Cargando..." : "Registrarse"}
              onPress={this.handleRegister}
              disabled={loading}
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
    backgroundColor: colorAzulClaro,
    justifyContent: "center",
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: 20,
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: colorAmarilloClaro,
  },
  form: {
    width: "90%",
    padding: 20,
  },
  fila: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  errorText: {
    color: "red",
    marginVertical: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Registro);
