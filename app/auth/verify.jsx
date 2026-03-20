import { useRouter, useSearchParams } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function VerifyOtp() {
  const router = useRouter();
  const params = useSearchParams(); // { email, otp }
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    if (code === params.otp) {
      Alert.alert("Success!", "Your email is verified.");
      router.replace("/(tabs)/home"); // go to home after verification
    } else {
      Alert.alert("Error", "Incorrect OTP. Try again.");
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
        </View>
      </ImageBackground>

      <View style={styles.bottomcontainer}>
        <Text style={styles.headertext}>Enter Verification Code</Text>
        <Text style={styles.notify}>
          We sent an OTP to your email. Enter it below.
        </Text>

        <TextInput
          placeholder="Type verification code"
          value={code}
          onChangeText={setCode}
          style={styles.textinput}
          keyboardType="numeric"
        />

        <Pressable
          style={[styles.loginbtn, { opacity: loading ? 0.6 : 1 }]}
          onPress={handleVerify}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginbtntext}>VERIFY</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: { flex: 1 },
  topcontainerbg: { height: 250 },
  topcontainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 42, fontWeight: "bold", color: "#fff", marginTop: -50 },
  bottomcontainer: {
    flex: 1,
    padding: 25,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: "#fff",
    marginTop: -80,
    justifyContent: "center",
    gap: 20,
  },
  headertext: { fontSize: 22, fontWeight: "bold", textAlign: "center" },
  notify: { textAlign: "center", color: "#606060", fontSize: 16 },
  textinput: {
    backgroundColor: "#F3F5F7",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 18,
    marginTop: 15,
  },
  loginbtn: {
    backgroundColor: "#5151C6",
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 20,
  },
  loginbtntext: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});
