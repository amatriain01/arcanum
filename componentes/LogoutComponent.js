import React, { Component } from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { colorAmarilloClaro, colorAzulClaro } from "../app.config";
import { clearError, logoutUser, checkAuthState } from "../redux/actions/autenticacion";

const mapStateToProps = (state) => ({
    loading: state.autenticacion.loading,
    error: state.autenticacion.error,
    isAuthenticated: state.autenticacion.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser()),
    checkAuthState: () => dispatch(checkAuthState()),
    clearError: () => dispatch(clearError()),
});

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogoutConfirmation: false,
        };
        this.handleLogout = this.handleLogout.bind(this);
        this.cancelLogout = this.cancelLogout.bind(this);
        this.confirmLogout = this.confirmLogout.bind(this);
    }

    componentDidMount() {
        this.props.clearError();
        this.unsubscribeAuth = this.props.checkAuthState();
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.props.clearError();
            this.unsubscribeAuth = this.props.checkAuthState();
        });
        if (!this.props.isAuthenticated) {
            this.volverInicio();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isAuthenticated !== this.props.isAuthenticated && !this.props.isAuthenticated) {
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

    handleLogout() {
        this.setState({ showLogoutConfirmation: true });
    };

    cancelLogout() {
        this.setState({ showLogoutConfirmation: false });
    };

    volverInicio() {
        const { navigation, isAuthenticated } = this.props;
        if (!isAuthenticated) {
            navigation.reset({
                index: 0,
                routes: [{ name: "Inicio" }],
            });
        }
    }

    confirmLogout() {
        this.props.logoutUser();
        this.setState({ showLogoutConfirmation: false });
    };

    render() {
        const { showLogoutConfirmation } = this.state;
        const { loading, error } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Image
                        style={styles.image}
                        source={require("./imagenes/logo.png")}
                    />
                    <View style={styles.form}>
                        {showLogoutConfirmation ? (
                            <View>
                                <Text style={styles.confirmationText}>
                                    ¿Quieres cerrar la sesión?
                                </Text>
                                <View style={styles.buttonContainer}>
                                    <Button
                                        title="Sí"
                                        buttonStyle={styles.yesButton}
                                        onPress={this.confirmLogout}
                                        disabled={loading}
                                    />
                                    <Button
                                        title="No"
                                        buttonStyle={styles.noButton}
                                        onPress={this.cancelLogout}
                                        disabled={loading}
                                    />
                                </View>
                            </View>
                        ) : (
                            <View>
                                <Button
                                    title={loading ? "Cargando..." : "Cerrar Sesión"}
                                    onPress={this.handleLogout}
                                    disabled={loading}
                                    buttonStyle={styles.logoutButton}
                                />
                                {error && (
                                    <Text style={styles.errorText}>
                                        Fallo al cerrar sesión, inténtelo de nuevo.
                                    </Text>
                                )}
                            </View>
                        )}
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
    confirmationText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    yesButton: {
        backgroundColor: "green",
        margin: 10,
    },
    noButton: {
        backgroundColor: "red",
        margin: 10,
    },
    logoutButton: {
        backgroundColor: "red",
        marginVertical: 10,
    },
    errorText: {
        color: "red",
        marginVertical: 10,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
