import Button from "@components/Button";
import DonationModal from "@components/DonationModal";
import HeaderBar from "@components/HeaderBar";
import { COLORS } from "@theme/colors";
import { FONT_SIZE } from "@theme/typography";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const AMOUNT_PRESETS = [10, 25, 50, 100] as const;
type Frequency = "once" | "monthly";

export default function Donation() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const [selectedType, setSelectedType] = useState<Frequency>("once");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorAddress, setDonorAddress] = useState("");
  const [donorMessage, setDonorMessage] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleDonate = () => {
    setShowModal(true);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <HeaderBar title="Campaign" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.container,
            { paddingBottom: insets.bottom + 16 },
          ]}
        >
          <View style={styles.toggleContainer}>
            {(["once", "monthly"] as Frequency[]).map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.toggleButton,
                  selectedType === type && styles.activeButton,
                ]}
                onPress={() => setSelectedType(type)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.toggleText,
                    selectedType === type && styles.activeText,
                  ]}
                >
                  {type === "once" ? "Once" : "Monthly"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View
            style={[
              styles.sectionWrapper,
              { flexDirection: width >= 600 ? "row" : "column" },
            ]}
          >
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Amount</Text>

              <View style={styles.amountContainer}>
                {AMOUNT_PRESETS.map((amt) => (
                  <TouchableOpacity
                    key={amt}
                    style={[
                      styles.amountButton,
                      selectedAmount === amt && styles.amountSelected,
                    ]}
                    onPress={() => {
                      setSelectedAmount(amt);
                      setCustomAmount("");
                    }}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        selectedAmount === amt && styles.amountTextSelected,
                      ]}
                    >
                      ${amt}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TextInput
                style={styles.input}
                placeholder="Enter custom amount"
                placeholderTextColor={COLORS.gray}
                keyboardType="numeric"
                value={customAmount}
                onChangeText={(text) => {
                  setCustomAmount(text);
                  setSelectedAmount(null);
                }}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Provide details below for the receipt (optional)
              </Text>

              <TextInput
                style={[styles.input, { textAlign: "center" }]}
                placeholder="Enter Your Full Name"
                placeholderTextColor={COLORS.gray}
                value={donorName}
                onChangeText={setDonorName}
                autoCapitalize="words"
              />
              <TextInput
                style={[styles.input, { textAlign: "center" }]}
                placeholder="Enter Your Email Address"
                placeholderTextColor={COLORS.gray}
                keyboardType="email-address"
                autoCapitalize="none"
                value={donorEmail}
                onChangeText={setDonorEmail}
              />
              <TextInput
                style={[styles.input, { textAlign: "center" }]}
                placeholder="Enter Your Address"
                placeholderTextColor={COLORS.gray}
                value={donorAddress}
                onChangeText={setDonorAddress}
              />
              <TextInput
                style={[styles.input, { textAlign: "center" }]}
                placeholder="Enter Your Special Message"
                placeholderTextColor={COLORS.gray}
                value={donorMessage}
                onChangeText={setDonorMessage}
              />
            </View>
          </View>

          <View style={styles.buttonRow}>
            <Button
              label="Back"
              type="primary"
              onPress={() => router.back()}
              style={{ flex: 1 }}
            />
            <Button label="Donate" onPress={handleDonate} style={{ flex: 1 }} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <DonationModal visible={showModal} onClose={() => setShowModal(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.white },
  flex: { flex: 1 },
  container: { padding: 20 },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 35,
  },
  toggleButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.black,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  toggleText: {
    color: COLORS.black,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: FONT_SIZE.sm,
  },
  activeButton: { backgroundColor: COLORS.primary2 },
  activeText: { color: COLORS.white },

  sectionWrapper: {
    justifyContent: "space-between",
    gap: 35,
    marginBottom: 20,
  },
  section: {
    borderWidth: 1,
    borderColor: COLORS.black,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    flex: 1,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.sm,
    fontWeight: "600",
    borderColor: COLORS.black,
    paddingVertical: 15,
    paddingHorizontal: 20,
    textTransform: "capitalize",
    borderRadius: 25,
    borderWidth: 1,
    textAlign: "center",
    marginBottom: 15,
    width: "100%",
  },
  amountContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  amountButton: {
    width: "47%",
    padding: 30,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 15,
    marginVertical: 5,
    alignItems: "center",
  },
  amountSelected: { backgroundColor: COLORS.primary2 },
  amountTextSelected: { color: COLORS.white },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
    fontSize: FONT_SIZE.xs,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 10,
  },
});
