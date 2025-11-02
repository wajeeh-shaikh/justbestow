import { COLORS } from "@theme/colors";
import { FONT_SIZE } from "@theme/typography";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type ButtonType = "primary" | "secondary";

interface Props {
  label: string;
  onPress: () => void;
  type?: ButtonType;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

export default function Button({
  label,
  onPress,
  type = "primary",
  style,
  disabled = false,
}: Props) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        type === "primary" ? styles.primary : styles.secondary,
        disabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    maxWidth: 300,
  },
  primary: { backgroundColor: COLORS.primary2 },
  secondary: { backgroundColor: COLORS.gray },
  disabled: { opacity: 0.6 },
  text: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: FONT_SIZE.xs,
  },
});
