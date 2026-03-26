import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Search from "../assets/images/Search.svg";
import Send from "../assets/images/Send.svg";

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={"#BDBDBD"}
        />
        <Search width={20} height={20} style={styles.searchIcon} />
      </View>
      <View style={styles.sendContainer}>
        <TouchableOpacity>
          <Send width={20} height={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchContainer: {
    gap: 20,
  },
  searchInput: {
    width: 260,
    backgroundColor: "#F3F5F7",
    borderRadius: 30,
    paddingLeft: 45,
    paddingRight: 10,
    fontSize: 18,
    height: 45,
  },
  searchIcon: {
    position: "absolute",
    left: 15,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
  sendContainer: {
    width: 45,
    height: 45,
    backgroundColor: "#F3F5F7",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
});
