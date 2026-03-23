import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { auth } from "../../FirebaseConfig";

export default function VerifyOtp() {
  const router = useRouter();
  const { email, fullname, password } = useLocalSearchParams();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const handleVerify = async () => {
    if (!otp) {
      Alert.alert("Enter OTP");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://10.156.184.24:3000/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (data.success) {
        // 🔥 NOW create Firebase user
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );

        await updateProfile(userCredential.user, {
          displayName: fullname,
        });

        Alert.alert("Success!", "Account created successfully");
        router.replace("/(tabs)/home");
      } else {
        if (data.error === "OTP expired") {
          Alert.alert(
            "Expired Code",
            "Your code has expired. Please request a new one.",
          );
        } else if (data.error === "Invalid OTP") {
          Alert.alert("Invalid Code", "The code you entered is incorrect.");
        } else {
          Alert.alert("Error", data.error);
        }
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (countdown === 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = async () => {
    setResendLoading(true);

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
        Alert.alert("OTP Sent", "A new code has been sent to your email.");
      } else {
        Alert.alert("Error", "Failed to resend OTP");
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
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
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.innerTopContainer}>
                <View style={styles.heading}>
                  <Text style={styles.headerText}>VERIFICATION</Text>

                  <View style={styles.notifyContainer}>
                    <Text style={styles.notify}>
                      A message with verification code was sent to your email
                    </Text>
                  </View>
                </View>

                <TextInput
                  placeholder="Type verification code"
                  value={otp}
                  onChangeText={setOtp}
                  style={styles.textinput}
                  keyboardType="numeric"
                  placeholderTextColor={"#BDBDBD"}
                />

                <View style={{ alignItems: "center", gap: 5 }}>
                  <Text style={styles.loginoptiontext}>
                    {"DIDN'T RECEIVE THE CODE?"}
                  </Text>

                  <Pressable
                    onPress={handleResend}
                    disabled={countdown > 0 || resendLoading}
                  >
                    <Text style={{ color: "#5252C7", fontWeight: "bold" }}>
                      {countdown > 0
                        ? `RESEND IN ${countdown}s`
                        : resendLoading
                          ? "Sending..."
                          : "RESEND OTP"}
                    </Text>
                  </Pressable>
                </View>

                <LinearGradient
                  colors={["#5151C6", "#888BF4"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientBtn}
                >
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
                </LinearGradient>
              </View>
              <View style={styles.innerBottomContainer}>
                <Image source={require("../../assets/images/pattern.png")} />
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  maincontainer: { flex: 1 },
  topcontainerbg: { height: 250 },
  topcontainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 42, fontWeight: "bold", color: "#fff", marginTop: -20 },
  bottomcontainer: {
    flex: 1,
    padding: 25,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: "#fff",
    marginTop: -30,
    gap: 20,
  },

  innerTopContainer: {
    flex: 1,
    gap: 30,
  },

  innerBottomContainer: {
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },

  notifyContainer: {
    backgroundColor: "#F1F1FE",
    padding: 20,
    borderRadius: 13,
  },

  notify: {
    textAlign: "center",
    color: "#242424",
    fontSize: 20,
    lineHeight: 30,
    fontWeight: 500,
  },

  textinput: {
    backgroundColor: "#F3F5F7",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 18,
    marginTop: 15,
    textAlign: "center",
  },

  heading: {
    gap: 20,
  },

  headerText: {
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 20,
    fontWeight: 600,
    color: "#5252C7",
  },

  loginoptiontext: {
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 18,
    fontWeight: 400,
    color: "#606060",
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
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});
