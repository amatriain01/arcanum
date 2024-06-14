import { Component, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Card, Icon } from "react-native-elements";
import {
  colorAmarillo,
  colorAmarilloClaro,
  colorAzul,
  colorAzulClaro,
} from "../app.config";
import { SelectList } from "react-native-dropdown-select-list";
import { color } from "@rneui/base";

function InfoLibro(props) {
  const libro = {
    id: 8,
    imagen: require("./imagenes/arcanum-ilimitado.jpg"),
    titulo: "Arcanum ilimitado",
    autor: "Brandon Sanderson",
    valoracion: 4.5,
    comentarios: 5,
    descripcion:
      "«Arcanum Ilimitado» es una antología de relatos que recopila las historias relacionadas con el Cosmere que Brandon Sanderson ha publicado a lo largo de los años. Aunque algunos son relatos independientes que se pueden disfrutar por separado, pero otras requieren haber leído previamente algunas novelas del Cosmere.",
  };

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
        <Card.Title style={styles.titulo}>{libro.titulo}</Card.Title>
        <View style={styles.cuerpo}>
          <Card.Image source={libro.imagen} style={styles.imagen} />
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
            <Text style={styles.texto}>Autor: {libro.autor}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.texto}>Puntuación: {libro.valoracion} </Text>
              <Icon
                name="star"
                type="font-awesome"
                size={20}
                color={colorAmarillo}
              />
            </View>
            <Text style={styles.texto}>{libro.descripcion}</Text>
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
  render() {
    const { navigate } = this.props.navigation;
    const { libroId } = this.props.route.params;
    return (
      <ScrollView style={{ backgroundColor: colorAmarilloClaro }}>
        <InfoLibro navigate={navigate} />
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

export default DetalleLibro;
