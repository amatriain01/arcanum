import { Dimensions, Image, StyleSheet, View } from "react-native";
import { Text } from "react-native";
import { colorAzulClaro } from "../app.config";
import { MaterialIcons } from "@expo/vector-icons";

const { width: screenWidth } = Dimensions.get("window");

const EventoSimple = ({ evento }) => {
  const { imagen, fecha, titulo } = evento;
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imagen} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.fecha}>{fecha}</Text>
        <Text style={styles.title}>{titulo}</Text>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: screenWidth,
    height: 250,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 10,
    backgroundColor: colorAzulClaro,
  },
  imageContainer: {
    width: "50%",
    height: 200,
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  infoContainer: {
    flex: 1,
  },
  fecha: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    color: "#666",
    marginBottom: 5,
  },
});


export default EventoSimple;
