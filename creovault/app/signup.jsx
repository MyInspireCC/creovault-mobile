import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ImageBackground,
  Pressable,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { db } from "../FirebaseConfig";
import emailjs from "@emailjs/browser";

import { generateOTP } from "../utils/generateOTP";

import { doc, setDoc } from "firebase/firestore";

export default function SignupScreen() {
  const router = useRouter();
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const handleSignup = async () => {
    const otp = generateOTP();
    try {
      await emailjs.send(
        "SERVICE_ID",
        "TEMPLATE_ID",
        {
          email: email,
          otp: otp,
        },
        "PUBLIC KEY",
      );
      await setDoc(doc(db, "otp_codes", email), {
        fullname,
        email,
        password,
        otp,
        createdAt: Date.now(),
      });
      Alert.alert("OTP sent to your email");
      navigation.navigate("Verify", { email });
    } catch (error) {
      Alert.alert("Error sending OTP");
    }
  };

  return (
    <View style={styles.maincontainer}>
      <ImageBackground
        source={require("../assets/images/Login-Image.png")}
        style={styles.topcontainerbg}
      >
        <View style={styles.topcontainer}>
          <Text style={styles.text}>CreoVault</Text>
          <Image
            source={require("../assets/images/WELCOME.png")}
            style={styles.welcomelogo}
          />
        </View>
      </ImageBackground>
      <View style={styles.bottomcontainer}>
        <View style={styles.textinputcontainer}>
          <TextInput
            placeholder="Full Name"
            value={fullname}
            onChangeText={setFullName}
            style={styles.textinput}
            placeholderTextColor="#BDBDBD"
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.textinput}
            placeholderTextColor="#BDBDBD"
          />
          <View style={styles.passwordcontainer}>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={hidePassword}
              style={styles.textinput}
              placeholderTextColor="#BDBDBD"
            />
            <Pressable
              onPress={() => setHidePassword(!hidePassword)}
              style={styles.passwordicon}
            >
              <Ionicons
                name={hidePassword ? "eye-off" : "eye"}
                size={24}
                color="#242424"
              />
            </Pressable>
          </View>
        </View>
        <LinearGradient
          colors={["#5151C6", "#888BF4"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBtn}
        >
          <Pressable style={styles.loginbtn} onPress={handleSignup}>
            <Text style={styles.loginbtntext}>SIGN UP</Text>
          </Pressable>
        </LinearGradient>
        <View style={styles.noaccount}>
          <Text style={styles.noaccounttextleft}>Already have an account?</Text>
          <Pressable onPress={() => router.push("/login")}>
            <Text style={styles.noaccounttextright}>LOG IN</Text>
          </Pressable>
        </View>
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
    marginTop: -60,
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  welcomelogo: {
    width: "60%",
    height: 50,
    resizeMode: "contain",
    marginTop: 20,
  },
  bottomcontainer: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 35,
    paddingBottom: 60,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: "#fff",
    marginTop: -40,
    gap: 40,
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
  },
  passwordcontainer: {
    position: "relative",
  },
  passwordicon: {
    position: "absolute",
    right: 15,
    top: "50%",
    transform: [{ translateY: -12 }],
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
  noaccount: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  noaccounttextleft: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 400,
    color: "#606060",
  },
  noaccounttextright: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 500,
    color: "#5252C7",
    marginLeft: 4,
  },
});
