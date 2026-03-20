import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [verifycode, setVerifyCode] = useState("");

  const handleLogin = () => {
    router.replace("/home");
  };

  return (
    <View style={styles.maincontainer}>
      <ImageBackground
        source={require("../assets/images/Login-Image.png")}
        style={styles.topcontainerbg}
      >
        <View style={styles.topcontainer}>
          <Text style={styles.text}>CreoVault</Text>
        </View>
      </ImageBackground>
      <View style={styles.bottomcontainer}>
        <View style={styles.textinputcontainer}>
          <MaskedView
            maskElement={<Text style={styles.headertext}>Verification</Text>}
          >
            <LinearGradient
              colors={["#5151C6", "#888BF4"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientBtn}
            >
              <Text style={[styles.headertext, { opacity: 0 }]}>
                Verification
              </Text>
            </LinearGradient>
          </MaskedView>
          <View style={styles.notifyBtn}>
            <Text style={styles.notify}>
              A message with verification code was sent to your email.
            </Text>
          </View>
        </View>

        <TextInput
          placeholder="Type verification code"
          value={verifycode}
          onChangeText={setVerifyCode}
          style={styles.textinput}
          placeholderTextColor="#BDBDBD"
        />
        <Text style={styles.loginoptiontext}>Didn't receive the code?</Text>
        <LinearGradient
          colors={["#5151C6", "#888BF4"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBtn}
        >
          <Pressable style={styles.loginbtn}>
            <Text style={styles.loginbtntext}>VERIFY</Text>
          </Pressable>
        </LinearGradient>
        <Image
          source={require("../assets/images/pattern.png")}
          style={styles.image}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    justifyContent: "center",
  },
  topcontainerbg: {
    height: 312,
  },
  topcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: -50,
    fontSize: 42,
    fontWeight: "bold",
    color: "#fff",
  },
  bottomcontainer: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 35,
    paddingBottom: 60,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: "#fff",
    marginTop: -80,
    gap: 40,
  },
  headertext: {
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#606060",
  },
  notifyBtn: {
    backgroundColor: "#F1F1FE",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 12,
  },
  notify: {
    fontSize: 22,
    textAlign: "center",
    color: "#242424",
  },
  textinputcontainer: {
    gap: 20,
  },
  textinput: {
    width: "100%",
    backgroundColor: "#F3F5F7",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 18,
    alignItems: "center",
  },
  gradientBtn: {
    borderRadius: 30,
  },
  loginbtn: {
    width: "100%",
    paddingVertical: 15,
    justifyContent: "center",
  },
  loginbtntext: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  loginoptiontext: {
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 18,
    fontWeight: 400,
    color: "#606060",
  },
  image: {
    alignSelf: "center",
  },
});
