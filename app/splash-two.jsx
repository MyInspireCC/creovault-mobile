//import { useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../assets/images/Splash-Background.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.text}>CreoVault</Text>
        <Image
          source={require("../assets/images/Splash-Image.png")}
          style={styles.logo}
        />
        <Text style={styles.tagline}>Share • Inspire • Connect</Text>
        <Pressable style={styles.btn} onPress={() => router.push("/login")}>
          <Text style={styles.btntext}>GET STARTED</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#fff",
  },
  tagline: {
    fontSize: 18,
    fontWeight: 500,
    textTransform: "uppercase",
    color: "#fff",
    marginTop: 40,
  },
  logo: {
    marginTop: 40,
    justifyContent: "center",
    width: 300,
    height: 370,
  },
  btn: {
    backgroundColor: "rgba(208, 208, 208, 0.3)",
    borderRadius: 100,
    marginTop: 40,
  },
  btntext: {
    color: "#fff",
    textAlign: "center",
    paddingVertical: 15,
    paddingHorizontal: 25,
    fontSize: 22,
    fontWeight: "bold",
  },
});
