import { COLORS } from "@theme/colors";
import { FONT_SIZE } from "@theme/typography";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Popup from "./Popup";

type DonationStage = "initiating" | "tap" | "processing" | "success";
type Timer = ReturnType<typeof setTimeout>;

interface DonationModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function DonationModal({
  visible,
  onClose,
}: DonationModalProps) {
  const { width } = useWindowDimensions();
  const [stage, setStage] = useState<DonationStage>("initiating");
  const processTimerRef = useRef<Timer | null>(null);
  const openTimerRef = useRef<Timer | null>(null);
  const router = useRouter();

  const iconSize = width >= 700 ? 150 : 100;

  const handleTap = useCallback(() => {
    setStage("processing");
    processTimerRef.current = setTimeout(() => setStage("success"), 1500);
  }, []);

  useEffect(() => {
    if (visible) {
      setStage("initiating");
      openTimerRef.current = setTimeout(() => setStage("tap"), 1500);
    }
    return () => {
      if (openTimerRef.current) clearTimeout(openTimerRef.current);
      if (processTimerRef.current) clearTimeout(processTimerRef.current);
    };
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Popup>
        {stage === "initiating" && (
          <>
            <ActivityIndicator size="large" color={COLORS.primary2} />
            <Text
              style={[
                styles.text,
                { fontSize: width >= 600 ? FONT_SIZE.xs : FONT_SIZE.lg },
              ]}
            >
              Initiating Donation...
            </Text>
          </>
        )}

        {stage === "tap" && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleTap}
            style={styles.tapContainer}
          >
            <View style={styles.row}>
              <Image
                source={require("../../assets/tap-card.png")}
                style={{ width: iconSize, height: iconSize }}
                resizeMode="contain"
              />
              <Image
                source={require("../../assets/hand.png")}
                style={{ width: iconSize, height: iconSize }}
                resizeMode="contain"
              />
            </View>
            <Text
              style={[
                styles.text,
                { fontSize: width >= 600 ? FONT_SIZE.xs : FONT_SIZE.sm },
              ]}
            >
              Please tap your card on the reader to complete{"\n"}the
              transaction
            </Text>
          </TouchableOpacity>
        )}

        {stage === "processing" && (
          <>
            <ActivityIndicator size="large" color={COLORS.primary2} />
            <Text
              style={[
                styles.text,
                { fontSize: width >= 600 ? FONT_SIZE.xs : FONT_SIZE.lg },
              ]}
            >
              Processing Donation...
            </Text>
          </>
        )}

        {stage === "success" && (
          <>
            <Image
              source={require("../../assets/success.png")}
              style={styles.imageSuccess}
              resizeMode="contain"
            />
            <Text
              style={[
                styles.text,
                styles.successTitle,
                { fontSize: width >= 600 ? FONT_SIZE.sm : FONT_SIZE.lg },
              ]}
            >
              Payment Successful!
            </Text>
            <Text style={styles.subText}>Thank you for your donation.</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                onClose();
                setTimeout(() => router.push("/screens/campaign-list"), 500);
              }}
            >
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </>
        )}
      </Popup>
    </Modal>
  );
}

const styles = StyleSheet.create({
  tapContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  imageSuccess: {
    maxWidth: 130,
  },
  text: {
    fontWeight: "600",
    marginTop: 20,
    textAlign: "center",
  },
  subText: {
    marginTop: 5,
    textAlign: "center",
  },
  successTitle: {
    color: COLORS.primary2,
  },
  button: {
    marginTop: 20,
    backgroundColor: COLORS.primary2,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: FONT_SIZE.sm,
  },
});
