import { useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    //simulate loading for 2 seconds
    setTimeout(() => {
      router.replace("/splash-two"); //move to login screen
    }, 2500);
  }, []);

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
        <ActivityIndicator size="large" style={styles.activityindicator} />
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
  logo: {
    marginTop: 40,
    justifyContent: "center",
    width: 300,
    height: 370,
  },
  activityindicator: {
    marginTop: 20,
  },
});
