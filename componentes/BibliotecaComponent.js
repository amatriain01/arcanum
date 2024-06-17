import { Component, React } from "react";
import { ListItem } from "react-native-elements";
import { FlatList, SafeAreaView, StyleSheet, View, Text } from "react-native";
import { colorAzulClaro } from "../app.config";
import LibroSimple from "./LibroSimpleComponent";
import { connect } from "react-redux";
import { fetchLibros } from "../redux/actions/libros";
import { IndicadorActividad } from "./IndicadorActividadComponent";
import { fetchComentariosValoracionMedia } from "../redux/actions/comentarios";

const mapStateToProps = (state) => ({
  loading: state.libros.loading,
  error: state.libros.errMess,
  libros: state.libros.libros,
  valoracionesMedias: state.comentarios.valoracionesMedias,
});

const mapDispatchToProps = (dispatch) => ({
  fetchLibros: () => dispatch(fetchLibros()),
  fetchComentariosValoracionMedia: (idLibro) => dispatch(fetchComentariosValoracionMedia(idLibro)),
});

class Biblioteca extends Component {
  componentDidMount() {
    this.props.fetchLibros();
  }

  componentDidUpdate(prevProps) {
    if (this.props.libros !== prevProps.libros && !this.props.loading) {
      this.props.libros.forEach(libro => {
        this.props.fetchComentariosValoracionMedia(libro.idLibro);
      });
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { libros, loading, error, valoracionesMedias } = this.props;

    if (loading) {
      return (
        <IndicadorActividad />
      );
    }

    if (error) {
      console.log('Error: ', error);
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
          onPress={() => navigate("DetalleLibro", { idLibro: item.idLibro })}
          bottomDivider >
          <LibroSimple libro={item} valoracionMedia={valoracionMedia !== undefined ? valoracionMedia : "0"} />
        </ListItem >
      );
    };

    return (
      <SafeAreaView>
        <FlatList
          data={libros}
          renderItem={renderBibliotecaItem}
          keyExtractor={(item) => item.idLibro.toString()}
        />
      </SafeAreaView >
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

export default connect(mapStateToProps, mapDispatchToProps)(Biblioteca);
