import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SignupScreen() {
  const router = useRouter();
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    // ✅ Validate inputs
    if (!fullname || !email || !password) {
      Alert.alert("All fields are required");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Password too short",
        "Password must be at least 6 characters",
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://10.156.184.24:3000/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert("OTP sent to your email");

        router.push({
          pathname: "/auth/verify",
          params: { email, fullname, password },
        });
      } else {
        Alert.alert("Failed to send OTP");
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.maincontainer}>
      <ImageBackground
        source={require("../../assets/images/Login-Image.png")}
        style={styles.topcontainerbg}
      >
        <View style={styles.topcontainer}>
          <Text style={styles.text}>CreoVault</Text>
          <Image
            source={require("../../assets/images/WELCOME.png")}
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
          <Pressable
            style={[styles.loginbtn, { opacity: loading ? 0.6 : 1 }]}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginbtntext}>SIGN UP</Text>
            )}
          </Pressable>
        </LinearGradient>

        <View style={styles.noaccount}>
          <Text style={styles.noaccounttextleft}>Already have an account?</Text>
          <Pressable onPress={() => router.push("/auth/login")}>
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
