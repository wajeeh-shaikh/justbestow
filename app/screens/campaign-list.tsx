import HeaderBar from "@components/HeaderBar";
import { COLORS } from "@theme/colors";
import { FONT_SIZE } from "@theme/typography";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function CampaignList() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const campaigns = [
    {
      id: 1,
      title: "Hope for Tomorrow",
      desc: "Providing education and resources for underprivileged children.",
      active: true,
    },
    {
      id: 2,
      title: "Clean Water Initiative",
      desc: "Bringing clean and safe drinking water to communities in need.",
      active: true,
    },
    {
      id: 3,
      title: "Sadka: Nourishing Lives",
      desc: "Distributing food and essentials to families in crisis.",
      active: true,
    },
    {
      id: 4,
      title: "Medical Aid for All",
      desc: "Providing medical care and supplies to underserved regions.",
      active: false,
    },
    {
      id: 5,
      title: "Shelter for Hope",
      desc: "Building homes and providing shelter for homeless families.",
      active: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <HeaderBar title="Campaign" />

      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>Available Campaigns</Text>
        <Text style={styles.subHeader}>Currently running campaigns</Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: 16 + insets.bottom },
        ]}
      >
        <View style={styles.grid}>
          {campaigns.map((c) => (
            <TouchableOpacity
              key={c.id}
              style={[
                styles.card,
                c.active ? styles.activeCard : styles.inactiveCard,
                {
                  minHeight: width >= 600 ? 150 : 120,
                },
              ]}
              activeOpacity={c.active ? 0.7 : 1}
              onPress={() => c.active && router.push("/screens/donation")}
            >
              <Text
                style={[
                  styles.cardTitle,
                  { fontSize: width >= 600 ? FONT_SIZE.md : FONT_SIZE.xl },
                  !c.active && styles.disabledText,
                ]}
              >
                {c.title}
              </Text>
              <Text
                style={[
                  styles.cardDesc,
                  { fontSize: width >= 600 ? 16 : 13 },
                  !c.active && styles.disabledText,
                ]}
              >
                {c.desc}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGray },
  headerSection: {
    backgroundColor: COLORS.primary,
    alignItems: "center",
    paddingVertical: 30,
    borderRadius: 8,
    marginVertical: 20,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: FONT_SIZE.h4,
    fontWeight: "bold",
  },
  subHeader: { color: COLORS.white, fontSize: FONT_SIZE.sm, marginTop: 4 },
  scroll: { paddingHorizontal: 10, alignItems: "center" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  card: {
    minWidth: 320,
    flexGrow: 1,

    flexDirection: "column",
    justifyContent: "space-between",
    margin: 8,
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  activeCard: { backgroundColor: COLORS.primary },
  inactiveCard: { backgroundColor: COLORS.gray, cursor: "auto" },
  cardTitle: {
    color: COLORS.white,
    marginBottom: 8,
  },
  cardDesc: { color: COLORS.white },
  disabledText: { opacity: 0.7 },
});
