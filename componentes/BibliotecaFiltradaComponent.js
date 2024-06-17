import { Component } from "react";
import { connect } from "react-redux";
import { ListItem } from "react-native-elements";
import { colorAzulClaro } from "../app.config";
import LibroSimple from "./LibroSimpleComponent";
import { IndicadorActividad } from "./IndicadorActividadComponent";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { Text } from "react-native";
import { fetchLibrosPorIds } from "../redux/actions/libros";

const mapStateToProps = (state) => ({
  loading: state.libros.loading,
  error: state.libros.errMess,
  libros: state.libros.libros,
});

const mapDispatchToProps = (dispatch) => ({
  fetchLibrosPorIds: (idLibros) => dispatch(fetchLibrosPorIds(idLibros)),
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
    const { idLibros } = this.props.route.params;
    this.props.fetchLibrosPorIds(idLibros);
  }

  componentDidUpdate(prevProps) {
    const { estado } = this.props.route.params;
    if (prevProps.route.params.estado !== estado) {
      if (estado !== "Discusiones") {
        this.props.navigation.setOptions({ title: "Mis Libros " + estado });
      } else {
        this.props.navigation.setOptions({ title: "Mis Discusiones" });
      }
      const { idLibros } = this.props.route.params;
      this.props.fetchLibrosPorIds(idLibros);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { libros, loading, error } = this.props;
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
      return (
        <ListItem
          containerStyle={[styles.container, { height: 200 }]}
          key={index}
          onPress={() => {
            if (isDiscusion) {
              navigate("Biblioteca", {
                screen: "Discusion",
                params: { idLibro: item.idLibro },
              });
            } else {
              {
                navigate("Biblioteca", {
                  screen: "DetalleLibro",
                  params: { idLibro: item.idLibro },
                });
              }
            }
          }}
          bottomDivider>
          <LibroSimple libro={item} />
        </ListItem>
      );
    };

    return (
      <SafeAreaView style={styles.container}>
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
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BibliotecaFiltrada);
