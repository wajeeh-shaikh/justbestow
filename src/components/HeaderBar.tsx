import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@theme/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HeaderBar({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="menu"
        size={26}
        color={COLORS.iconColor}
        style={styles.icon}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  icon: { marginRight: 10 },
  title: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
  },
});
