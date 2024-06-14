import { Component, React } from "react";
import {ListItem } from "react-native-elements";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import {colorAzulClaro } from "../app.config";
import LibroSimple from "./LibroSimpleComponent";

const libros = [
  {
    id: 0,
    imagen: require("./imagenes/jaizkibel.png"),
    titulo: "El Señor de los Anillos",
    autor: "J.R.R. Tolkien",
    valoracion: 5,
    comentarios: 10,
  },
  {
    id: 1,
    imagen: require("./imagenes/logo.png"),
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    valoracion: 4,
    comentarios: 8,
  },
  {
    id: 2,
    imagen: require("./imagenes/puntaEscarra.png"),
    titulo: "Harry Potter y la piedra filosofal",
    autor: "J.K. Rowling",
    valoracion: 4.5,
    comentarios: 5,
  },
  {
    id: 3,
    imagen: require("./imagenes/jaizkibel.png"),
    titulo: "El Señor de los Anillos",
    autor: "J.R.R. Tolkien",
    valoracion: 5,
    comentarios: 10,
  },
  {
    id: 4,
    imagen: require("./imagenes/logo.png"),
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    valoracion: 4,
    comentarios: 8,
  },
  {
    id: 5,
    imagen: require("./imagenes/puntaEscarra.png"),
    titulo: "Harry Potter y la piedra filosofal",
    autor: "J.K. Rowling",
    valoracion: 4.5,
    comentarios: 5,
  },
  {
    id: 6,
    imagen: require("./imagenes/jaizkibel.png"),
    titulo: "El Señor de los Anillos",
    autor: "J.R.R. Tolkien",
    valoracion: 5,
    comentarios: 10,
  },
  {
    id: 7,
    imagen: require("./imagenes/logo.png"),
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    valoracion: 4,
    comentarios: 8,
  },
  {
    id: 8,
    imagen: require("./imagenes/puntaEscarra.png"),
    titulo: "Harry Potter y la piedra filosofal",
    autor: "J.K. Rowling",
    valoracion: 4.5,
    comentarios: 5,
  },
];

class Biblioteca extends Component {
  render() {
    const { navigate } = this.props.navigation;

    const renderBibliotecaItem = ({ item, index }) => {
      return (
        <ListItem
          containerStyle={styles.container}
          key={index}
          onPress={() => navigate("DetalleLibro", { libroId: item.id })}
          bottomDivider>
            <LibroSimple libro={item} mostrarValidacion={true} />
        </ListItem>
      );
    };

    return (
      <SafeAreaView>
        <FlatList
          data={libros}
          renderItem={renderBibliotecaItem}
          keyExtractor={(item) => item.id.toString()}
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

export default Biblioteca;
