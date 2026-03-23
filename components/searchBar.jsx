import { StyleSheet, TextInput, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function SearchBar() {
  return (
    <View>
      <TextInput style={styles.searchInput} />
      <Ionicons name="search" size={24} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    width: 300,
  },
});
