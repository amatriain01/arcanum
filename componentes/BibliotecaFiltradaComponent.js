import { Component } from "react";
import { connect } from "react-redux";
import { ListItem } from "react-native-elements";
import { colorAzulClaro } from "../app.config";
import LibroSimple from "./LibroSimpleComponent";
import { IndicadorActividad } from "./IndicadorActividadComponent";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { Text } from "react-native";
import { fetchLibros } from "../redux/actions/libros";
import { fetchComentariosValoracionMedia } from "../redux/actions/comentarios";

const mapStateToProps = (state) => ({
  loading: state.libros.loading,
  error: state.libros.errMess,
  libros: state.libros.libros,
  valoracionesMedias: state.comentarios.valoracionesMedias,
});

const mapDispatchToProps = (dispatch) => ({
  fetchLibros: () => dispatch(fetchLibros()), //aqui cambiar por la que coge los libros segun el estado y el usuario
  fetchComentariosValoracionMedia: (idLibro) => dispatch(fetchComentariosValoracionMedia(idLibro)),
});

class BibliotecaFiltrada extends Component {
  componentDidMount() {
    const { estado } = this.props.route.params;
    if (estado) {
      if (estado !== "Discusiones") {
        this.props.navigation.setOptions({ title: "Mis Libros " + estado });
      } else {
        this.props.navigation.setOptions({ title: "Mis Discusiones" });
      }
    }
    this.props.fetchLibros();
  }

  componentDidUpdate(prevProps) {
    const { estado } = this.props.route.params;
    if (prevProps.route.params.title !== estado) {
      if (estado !== "Discusiones") {
        this.props.navigation.setOptions({ title: "Mis Libros " + estado });
      } else {
        this.props.navigation.setOptions({ title: "Mis Discusiones" });
      }
    }
    if (this.props.libros !== prevProps.libros && !this.props.loading) {
      this.props.libros.forEach(libro => {
        this.props.fetchComentariosValoracionMedia(libro.idLibro);
      });
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { libros, loading, error, valoracionesMedias } = this.props;
    const { estado } = this.props.route.params;

    const isDiscusion = estado === "Discusiones";

    if (loading) {
      return <IndicadorActividad />;
    }

    if (error) {
      console.log("Error: ", error);
      return (
        <View>
          <Text>Error al cargar la Biblioteca.</Text>
        </View>
      );
    }

    const renderBibliotecaItem = ({ item, index }) => {
      const valoracionMedia = valoracionesMedias[item.idLibro];

      return (
        <ListItem
          containerStyle={styles.container}
          key={index}
          onPress={() => {
            if (isDiscusion) {
              navigate("Biblioteca", { screen: "Discusion", params: { idLibro: item.idLibro } });
            } else {
              {
                navigate("Biblioteca", { screen: "DetalleLibro", params: { idLibro: item.idLibro } });
              }
            }
          }}
          bottomDivider>
          <LibroSimple libro={item} valoracionMedia={valoracionMedia !== undefined ? valoracionMedia : "0"} />
        </ListItem>
      );
    };

    return (
      <SafeAreaView>
        <FlatList
          data={libros}
          renderItem={renderBibliotecaItem}
          keyExtractor={(item) => item.idLibro.toString()}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorAzulClaro,
    height: 200,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BibliotecaFiltrada);
