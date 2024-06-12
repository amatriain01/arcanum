import { React, Component } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  colorAmarillo,
  colorAmarilloClaro,
  colorAzulClaro,
} from "../app.config";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Divider, Icon } from "@rneui/base";
import LibroSimple from "./LibroSimpleComponent";
import EventoSimple from "./EventoSimpleComponent";

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
  return <LibroSimple libro={item} mostrarValidacion={true} />;
}

function renderDiscusion({ item }) {
  return <LibroSimple libro={item} mostrarValidacion={false} />;
}

function renderEvento({ item }) {
  return <EventoSimple evento={item} />;
}

function ListadoElementos(props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name={props.icono} type="font-awesome" size={30} />
        <Text style={{fontSize:20, fontWeight: "bold"}}> {props.titulo} </Text>
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
});

export default Inicio;
