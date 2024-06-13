import { Icon } from "@rneui/base";
import { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { colorAzulClaro, colorAmarilloClaro } from "../app.config";

class Registro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      password2: "",
    };
  }

  handlenNameChange = (nombre) => {
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

  resetForm() {
    this.setState({
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      password2: "",
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.resetForm();
  };

  render() {
    const { navigate } = this.props.navigation;
    const { loading, error, isAuthenticated } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.form}>
            <Input
              inputStyle={{ padding: 10 }}
              placeholder="Nombre"
              leftIcon={<Icon name="user" type="font-awesome" size={24} />}
              value={this.state.nombre}
              onChange={this.handlenNameChange}
            />
            <Input
              inputStyle={{ padding: 10 }}
              name="apellido"
              placeholder="Apellido"
              leftIcon={<Icon name="user" type="font-awesome" size={24} />}
              value={this.state.apellido}
              onChange={this.handleApellidoChange}
            />
            <Input
              inputStyle={{ padding: 10 }}
              name="email"
              placeholder="Email"
              leftIcon={<Icon name="envelope" type="font-awesome" size={24} />}
              value={this.state.email}
              onChange={this.handleEmailChange}
              autoCapitalize="none"
            />
            <Input
              inputStyle={{ padding: 10 }}
              name="password"
              placeholder="Contraseña"
              leftIcon={<Icon name="lock" type="font-awesome" size={24} />}
              value={this.state.password}
              secureTextEntry
              onChange={this.handlePasswordChange}
              autoCapitalize="none"
            />
            <Input
              inputStyle={{ padding: 10 }}
              name="password2"
              placeholder="Repite la contraseña"
              leftIcon={<Icon name="lock" type="font-awesome" size={24} />}
              value={this.state.password}
              secureTextEntry
              onChange={this.handlePassword2Change}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.fila}>
            <Button
              title={loading ? "Cargando..." : "Iniciar Sesión"}
              type="clear"
              onPress={() => navigate("LoginNavegador")}
              disabled={loading}
            />
            <Button
              title={loading ? "Cargando..." : "Registrarse"}
              onPress={this.handleSubmit}
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
  authenticatedText: {
    color: "green",
    marginVertical: 10,
  },
});

export default Registro;
