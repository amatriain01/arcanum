import { Icon } from "@rneui/base";
import React, { Component } from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { connect } from "react-redux";
import { colorAmarilloClaro, colorAzulClaro } from "../app.config";
import { checkAuthState, loginUser, clearError } from "../redux/actions/autenticacion";

const mapStateToProps = (state) => ({
  loading: state.autenticacion.loading,
  error: state.autenticacion.error,
  isAuthenticated: state.autenticacion.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (email, password) => dispatch(loginUser(email, password)),
  checkAuthState: () => dispatch(checkAuthState()),
  clearError: () => dispatch(clearError()),
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleLogin = this.handleLogin.bind(this);
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

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
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
      email: "",
      password: "",
    });
  }

  resetPassword() {
    this.setState({
      password: "",
    });
  }

  handleLogin() {
    const { email, password } = this.state;
    this.props.loginUser(email, password);
    this.resetPassword();
    this.props.clearError();
  }

  render() {
    const { email, password } = this.state;
    const { loading, error } = this.props;
    const { navigate } = this.props.navigation;

    if (error) {
      console.log('Error:', error);
    }

    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Image
            style={styles.image}
            source={require("./imagenes/logo.png")}
          />
          <View style={styles.form}>
            <Input
              inputStyle={{ padding: 10 }}
              placeholder="Correo electrónico"
              leftIcon={<Icon name="envelope" type="font-awesome" size={24} />}
              value={email}
              autoCapitalize="none"
              onChangeText={this.handleEmailChange}
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
            {error && (
              <Text style={styles.errorText}>
                Fallo al iniciar sesión, inténtelo de nuevo.
              </Text>
            )}
          </View>
          <View style={styles.fila}>
            <Button
              title={loading ? "Cargando..." : "Iniciar Sesión"}
              onPress={this.handleLogin}
              disabled={loading}
            />
            <Button
              title={"Registrarse"}
              type="clear"
              onPress={() => navigate("Registro")}
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
  image: {
    width: 100,
    height: 100,
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: 50,
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
