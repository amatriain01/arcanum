import { Component, React } from "react";
import { ListItem } from "react-native-elements";
import { FlatList, SafeAreaView, StyleSheet, View, Text } from "react-native";
import { colorAzulClaro } from "../app.config";
import LibroSimple from "./LibroSimpleComponent";
import { connect } from "react-redux";
import { fetchLibros } from "../redux/actions/libros";
import { IndicadorActividad } from "./IndicadorActividadComponent";

const mapStateToProps = (state) => ({
  loading: state.libros.loading,
  error: state.libros.errMess,
  libros: state.libros.libros,
});

const mapDispatchToProps = (dispatch) => ({
  fetchLibros: () => dispatch(fetchLibros()),
});

class Biblioteca extends Component {
  componentDidMount() {
    this.props.fetchLibros();
  }

  render() {
    const { navigate } = this.props.navigation;
    const { libros, loading, error } = this.props;

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
      return (
        <ListItem
          containerStyle={styles.container}
          key={index}
          onPress={() => navigate("DetalleLibro", { idLibro: item.idLibro })}
          bottomDivider>
          <LibroSimple libro={item} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Biblioteca);
