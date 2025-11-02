import { COLORS } from "@theme/colors";
import React, { ReactNode } from "react";
import { Platform, StyleSheet, View, useWindowDimensions } from "react-native";

export default function Popup({ children }: { children: ReactNode }) {
  const { width } = useWindowDimensions();
  const paddingV = width >= 700 ? 80 : 50;
  const paddingH = width >= 700 ? 120 : 50;
  return (
    <View style={styles.overlay}>
      <View
        style={[
          styles.popup,
          { paddingVertical: paddingV, paddingHorizontal: paddingH },
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.black,
  },
  popup: {
    minWidth: 300,
    minHeight: 200,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 30,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: COLORS.black,
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: Platform.OS === "android" ? 6 : 0,
  },
});
