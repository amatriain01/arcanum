import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colorAmarillo, colorAzul } from "../app.config";

const Avatar = ({ nombre }) => {
  const initials = nombre
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");

  return (
    <View style={[styles.avatarContainer]}>
      <Text style={styles.initials}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: colorAzul,
  },
  initials: {
    color: colorAmarillo,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Avatar;
