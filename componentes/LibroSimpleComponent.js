import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colorAmarillo, colorAmarilloClaro } from "../app.config";

const LibroSimple = ({ libro, mostrarValidacion }) => {
  const { imagen, titulo, autor } = libro;
  const cantidad = mostrarValidacion ? libro.valoracion : libro.comentarios;
  const icono = mostrarValidacion ? "star" : "comment";

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imagen }} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{titulo}</Text>
        <Text style={styles.author}>{autor}</Text>
        <View style={styles.ratingContainer}>
          <FontAwesome name={icono} size={20} color="black" />
          <Text style={styles.rating}>{cantidad}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
    backgroundColor: colorAmarilloClaro,
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: colorAmarillo,
  },
  imageContainer: {
    width: "50%",
    height: "75%",
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
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  author: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LibroSimple;
