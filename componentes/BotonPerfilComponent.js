import { Icon } from "@rneui/base";
import { StyleSheet } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import {
  colorAmarillo,
  colorAmarilloClaro,
  colorAzul,
  colorAzulClaro,
} from "../app.config";

const BotonPerfil = (props) => {
  const { navigate } = props;
  let length = 0;
  if (props.data !== undefined && props.data.length !== undefined) {
    length = props.data.length;
  }
  let idLibros = [];
  if (!props.isComentarios && length !== 0) {
    props.data.forEach((libro) => {
      idLibros.push(libro.idLibro);
    });
  }
  return (
    <View>
      <TouchableOpacity
        style={styles.boton}
        onPress={() => {
          if (length === 0) {
            alert("No hay información disponible.");
          } else {
            props.isComentarios
              ? navigate("MisComentarios")
              : navigate("BibliotecaFiltrada", {
                  estado: props.titulo,
                  idLibros: idLibros,
                });
          }
        }}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Icon
            name={props.icono}
            type="font-awesome"
            size={30}
            color={colorAzul}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colorAzul,
              marginLeft: 10,
            }}>
            {props.titulo} ({length})
          </Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorAzulClaro,
  },
  boton: {
    padding: 10,
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorAmarillo,
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: colorAzul,
  },
  infoContainer: {
    padding: 10,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colorAmarilloClaro,
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: colorAzul,
  },
  textoInfo: {
    marginLeft: 10,
    padding: 10,
    flex: 1,
  },
  texto: {
    fontSize: 16,
    padding: 5,
    textAlign: "justify",
  },
  logoutButton: {
    backgroundColor: "red",
    padding: 10,
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "red",
  },
});

export default BotonPerfil;
