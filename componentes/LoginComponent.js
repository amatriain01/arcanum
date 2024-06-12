import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { checkAuthState, loginUser } from '../redux/actions/autenticacion';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    loading: state.autenticacion.loading,
    error: state.autenticacion.error,
    isAuthenticated: state.autenticacion.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
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

    handleEmailChange = email => {
        this.setState({ email });
    };

    handlePasswordChange = password => {
        this.setState({ password });
    };

    resetForm() {
        this.setState({
            email: '',
            password: ''
        });
    }

    handleLogin() {
        const { email, password } = this.state;
        console.log('Email:', email);
        console.log('Password:', password);
        this.props.loginUser(email, password);
        this.resetForm();
    };

    render() {
        const { email, password } = this.state;
        const { loading, error, isAuthenticated } = this.props;

        return (
            <View style={styles.container}>
                <Input
                    placeholder="Correo electrónico"
                    onChangeText={this.handleEmailChange}
                    value={email}
                    autoCapitalize="none"
                />
                <Input
                    placeholder="Contraseña"
                    onChangeText={this.handlePasswordChange}
                    value={password}
                    secureTextEntry
                    autoCapitalize="none"
                />
                {error && <Text style={styles.errorText}>{error}</Text>}
                {isAuthenticated && <Text style={styles.authenticatedText}>Autenticado con éxito</Text>}
                <Button
                    title={loading ? "Cargando..." : "Iniciar Sesión"}
                    onPress={this.handleLogin}
                    disabled={loading}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorText: {
        color: 'red',
        marginVertical: 10,
    },
    authenticatedText: {
        color: 'green',
        marginVertical: 10,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);