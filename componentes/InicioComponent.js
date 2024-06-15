import { React, Component } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { colorAmarillo } from "../app.config";
import { Divider, Icon } from "@rneui/base";
import LibroSimple from "./LibroSimpleComponent";
import EventoSimple from "./EventoSimpleComponent";

const { width: screenWidth } = Dimensions.get("window");

const libros = [
  {
    imagen: "https://firebasestorage.googleapis.com/v0/b/arcanum-reactnative-dsm-2024.appspot.com/o/libros%2F0.jpg?alt=media&token=311d6ee9-cc8d-4913-9546-591bd045b073",
    titulo: "El Señor de los Anillos",
    autor: "J.R.R. Tolkien",
    valoracion: 5,
    comentarios: 10,
  },
  {
    imagen: "https://firebasestorage.googleapis.com/v0/b/arcanum-reactnative-dsm-2024.appspot.com/o/libros%2F0.jpg?alt=media&token=311d6ee9-cc8d-4913-9546-591bd045b073",
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    valoracion: 4,
    comentarios: 8,
  },
  {
    imagen: "https://firebasestorage.googleapis.com/v0/b/arcanum-reactnative-dsm-2024.appspot.com/o/libros%2F0.jpg?alt=media&token=311d6ee9-cc8d-4913-9546-591bd045b073",
    titulo: "Harry Potter y la piedra filosofal",
    autor: "J.K. Rowling",
    valoracion: 4.5,
    comentarios: 5,
  },
];

const eventos = [
  {
    fecha: "2024-06-01",
    titulo: "Presentación de libro",
    imagen: require("./imagenes/logo.png"),
  },
  {
    fecha: "2022-10-15",
    titulo: "Club de lectura",
    imagen: require("./imagenes/puntaEscarra.png"),
  },
  {
    fecha: "2022-11-01",
    titulo: "Firma de libros",
    imagen: require("./imagenes/jaizkibel.png"),
  },
];

function renderLibro({ item }) {
  return (
    <View style={styles.carousel}>
      <LibroSimple
        libro={item}
        mostrarValidacion={true}
        screenWidth={screenWidth}
      />
    </View>
  );
}

function renderDiscusion({ item }) {
  return (
    <View style={styles.carousel}>
      <LibroSimple libro={item} mostrarValidacion={false} />
    </View>
  );
}

function renderEvento({ item }) {
  return <EventoSimple evento={item} />;
}

function ListadoElementos(props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name={props.icono} type="font-awesome" size={30} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {" "}
          {props.titulo}{" "}
        </Text>
      </View>
      <Divider />
      <FlatList
        data={props.data}
        renderItem={props.elemento}
        horizontal
        pagingEnabled
        keyExtractor={Math.random}
      />
    </View>
  );
}

class Inicio extends Component {
  render() {
    return (
      <ScrollView>
        <ListadoElementos
          titulo={"Libros Destacados"}
          icono={"book"}
          elemento={renderLibro}
          data={libros}
        />
        <ListadoElementos
          titulo={"Próximos Eventos"}
          icono={"calendar"}
          elemento={renderEvento}
          data={eventos}
        />
        <ListadoElementos
          titulo={"Discusiones Abiertas"}
          icono={"comment"}
          elemento={renderDiscusion}
          data={libros}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorAmarillo,
  },
  header: {
    margin: 10,
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  carousel: {
    width: screenWidth,
    height: 300,
  },
});

export default Inicio;
