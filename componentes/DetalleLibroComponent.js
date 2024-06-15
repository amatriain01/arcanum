import { Component, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card, Icon } from "react-native-elements";
import { colorAmarillo, colorAmarilloClaro, colorAzul, colorAzulClaro } from "../app.config";
import { SelectList } from "react-native-dropdown-select-list";
import { connect } from "react-redux";
import { fetchDetalleLibro } from "../redux/actions/libros";
import { IndicadorActividad } from "./IndicadorActividadComponent";

const mapStateToProps = (state) => ({
  loading: state.libros.loading,
  error: state.libros.errMess,
  libro: state.libros.libro,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDetalleLibro: (idLibro) => dispatch(fetchDetalleLibro(idLibro)),
});

function InfoLibro(props) {
  const listadoEstados = [
    {
      key: 0,
      value: "Sin estado",
    },
    {
      key: 1,
      value: "Pendiente",
    },
    {
      key: 2,
      value: "Leyendo",
    },
    {
      key: 3,
      value: "Leído",
    },
  ];

  //Aqui sería que compruebe si ya hay uno y lo ponga y si no por defecto
  // estado != null ? estado : "Selecciona un estado" 
  const [selected, setSelected] = useState("Selecciona un estado");
  return (
    <View>
      <Card containerStyle={styles.container}>
        <Card.Title style={styles.titulo}>{props.libro.titulo}</Card.Title>
        <View style={styles.cuerpo}>
          <Card.Image source={props.libro.imagen} style={styles.imagen} />
          <View style={styles.info}>
            <SelectList
              setSelected={(val) => setSelected(val)}
              data={listadoEstados}
              save="value"
              search={false}
              placeholder="Selecciona un estado"
              defaultOption={{ key: 0, value: selected }}
              style={{ width: 300, color: colorAzul }}
            />
            <Text style={styles.texto}>Autor: {props.libro.autor}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.texto}>Puntuación: {props.libro.valoracion} </Text>
              <Icon
                name="star"
                type="font-awesome"
                size={20}
                color={colorAmarillo}
              />
            </View>
            <Text style={styles.texto}>{props.libro.descripcion}</Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.boton}
              onPress={() => props.navigate("Discusion")}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.texto}>Ver la discusión del libro</Text>
              </View>
              <Icon
                name="arrow-right"
                type="font-awesome"
                size={20}
                color={colorAzul}
                style={{ margin: 5 }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.boton}
              onPress={() => props.navigate("Valoraciones")}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.texto}>Ver las reseñas del libro</Text>
              </View>
              <Icon
                name="arrow-right"
                type="font-awesome"
                size={20}
                color={colorAzul}
                style={{ margin: 5 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </View>
  );
}

class DetalleLibro extends Component {
  componentDidMount() {
    this.props.fetchDetalleLibro(this.props.route.params.idLibro);
  }

  render() {
    const { navigate } = this.props.navigation;
    const { libro, loading, error } = this.props;

    if (loading) {
      return <IndicadorActividad />;
    }

    if (error) {
      return (
        <View>
          <Text>Error al cargar el libro.</Text>
        </View>
      );
    }

    return (
      <ScrollView style={{ backgroundColor: colorAmarilloClaro }}>
        <InfoLibro navigate={navigate} libro={libro} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: colorAzul,
    height: "100%",
    padding: 10,
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: colorAzul,
  },
  imagen: {
    height: 250,
    resizeMode: "contain",
    margin: 10,
  },
  cuerpo: {
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: colorAzulClaro,
    backgroundColor: colorAzulClaro,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    backgroundColor: colorAzul,
    color: colorAmarillo,
  },
  info: {
    alignItems: "center",
    padding: 10,
  },
  texto: {
    fontSize: 16,
    padding: 5,
    textAlign: "justify",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  boton: {
    margin: 5,
    backgroundColor: colorAmarillo,
    padding: 10,
    flexDirection: "row",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: colorAmarillo,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleLibro);
