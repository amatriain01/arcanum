import { Component, React } from "react";
import {ListItem } from "react-native-elements";
import { Dimensions, FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import {colorAzulClaro } from "../app.config";
import LibroSimple from "./LibroSimpleComponent";

const libros = [
  {
    imagen: require("./imagenes/jaizkibel.png"),
    titulo: "El Señor de los Anillos",
    autor: "J.R.R. Tolkien",
    valoracion: 5,
    comentarios: 10,
  },
  {
    imagen: require("./imagenes/logo.png"),
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    valoracion: 4,
    comentarios: 8,
  },
  {
    imagen: require("./imagenes/puntaEscarra.png"),
    titulo: "Harry Potter y la piedra filosofal",
    autor: "J.K. Rowling",
    valoracion: 4.5,
    comentarios: 5,
  },
  {
    imagen: require("./imagenes/jaizkibel.png"),
    titulo: "El Señor de los Anillos",
    autor: "J.R.R. Tolkien",
    valoracion: 5,
    comentarios: 10,
  },
  {
    imagen: require("./imagenes/logo.png"),
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    valoracion: 4,
    comentarios: 8,
  },
  {
    imagen: require("./imagenes/puntaEscarra.png"),
    titulo: "Harry Potter y la piedra filosofal",
    autor: "J.K. Rowling",
    valoracion: 4.5,
    comentarios: 5,
  },
  {
    imagen: require("./imagenes/jaizkibel.png"),
    titulo: "El Señor de los Anillos",
    autor: "J.R.R. Tolkien",
    valoracion: 5,
    comentarios: 10,
  },
  {
    imagen: require("./imagenes/logo.png"),
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    valoracion: 4,
    comentarios: 8,
  },
  {
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
          onPress={() => navigate("Inicio", { excursionId: item.id })}
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
          // keyExtractor={(item) => item.id.toString()
          keyExtractor={Math.random}
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
