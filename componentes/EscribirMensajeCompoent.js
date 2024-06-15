import { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  isAuthenticated: state.autenticacion.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  checkAuthState: () => dispatch(checkAuthState()),
});

class EscribirMensaje extends Component() {
  render() {
    return (
      <View>
        <Text>Este es el componente para escribir un mensaje</Text>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EscribirMensaje);
