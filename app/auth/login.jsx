import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { auth, googleProvider } from "../../FirebaseConfig";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  // Email login
  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        alert("Please verify your email first!");
        return;
      }

      router.replace("/(tabs)/home"); // navigate to home
    } catch (error) {
      alert(error.message);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      router.replace("/(tabs)/home");
    } catch (error) {
      alert(error.message);
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
        <Pressable>
          <Text style={styles.forgotpassword}>Forgot Password</Text>
        </Pressable>
        <LinearGradient
          colors={["#5151C6", "#888BF4"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBtn}
        >
          <Pressable style={styles.loginbtn} onPress={handleLogin}>
            <Text style={styles.loginbtntext}>LOG IN</Text>
          </Pressable>
        </LinearGradient>
        <View style={styles.loginoption}>
          <Text style={styles.loginoptiontext}>OR LOG IN BY</Text>
          <View style={styles.sociallogin}>
            <Pressable
              style={styles.socialloginBtn}
              onPress={handleGoogleLogin}
            >
              <Image source={require("../../assets/images/google-Icon.png")} />
            </Pressable>
            <Pressable style={styles.socialloginBtn}>
              <Image
                source={require("../../assets/images/facebook-icon.png")}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.noaccount}>
          <Text style={styles.noaccounttextleft}>
            {"Don't have an account?"}
          </Text>
          <Pressable onPress={() => router.push("/auth/signup")}>
            <Text style={styles.noaccounttextright}>SIGN UP </Text>
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
  forgotpassword: {
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 18,
    fontWeight: 400,
    color: "#5252C7",
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
  loginoption: {
    gap: 15,
  },
  loginoptiontext: {
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 18,
    fontWeight: 400,
    color: "#606060",
  },
  sociallogin: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  socialloginBtn: {
    backgroundColor: "#E3E4FC",
    borderRadius: 100,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
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
