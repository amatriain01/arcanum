import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { colorAmarillo, colorAmarilloClaro } from "../app.config";

const LibroSimple = ({ libro }) => {
  const { imagen, titulo, autor } = libro;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imagen }} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{titulo}</Text>
        <Text style={styles.author}>{autor}</Text>
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
