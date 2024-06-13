import { Icon } from "@rneui/base";
import React, { Component } from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { checkAuthState, loginUser } from "../redux/actions/autenticacion";
import { connect } from "react-redux";
import { colorAmarilloClaro, colorAzulClaro } from "../app.config";

const mapStateToProps = (state) => ({
  loading: state.autenticacion.loading,
  error: state.autenticacion.error,
  isAuthenticated: state.autenticacion.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (email, password) => dispatch(loginUser(email, password)),
  checkAuthState: () => dispatch(checkAuthState()),
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
        this.props.checkAuthState();
    }

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  resetForm() {
    this.setState({
      email: "",
      password: "",
    });
  }

  handleLogin() {
    const { email, password } = this.state;
    console.log("Email:", email);
    console.log("Password:", password);
    this.props.loginUser(email, password);
    this.resetForm();
  }

  render() {
    const { email, password } = this.state;
    const { loading, error, isAuthenticated } = this.props;
    const { navigate } = this.props.navigation;

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
            {error && <Text style={styles.errorText}>{error}</Text>}
            {isAuthenticated && (
              <Text style={styles.authenticatedText}>
                Autenticado con éxito
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
              title={loading ? "Cargando..." : "Registrarse"}
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
  authenticatedText: {
    color: "green",
    marginVertical: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
