import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function CreateChallenge() {
  const router = useRouter();

  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("NGN");
  const [deadline, setDeadline] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Photography");
  const [inspirations, setInspirations] = useState([]);

  const [loading, setLoading] = useState(false);

  // CLOUDINARY CONFIG
  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dugoms36f/upload";
  const UPLOAD_PRESET = "Creovault-App";

  async function uploadImage(uri) {
    const formData = new FormData();

    const filename = uri.split("/").pop();

    formData.append("file", {
      uri,
      name: filename,
      type: "image/jpeg",
    });

    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await axios.post(CLOUDINARY_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("UPLOAD RESPONSE:", res.data);

      return res.data.secure_url;
    } catch (err) {
      console.log("UPLOAD ERROR AXIOS:", err.response || err.message);
      throw err;
    }
  }

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return Alert.alert("Permission needed");

    const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.7 });
    if (!result.canceled) setImage(result.assets[0].uri); // local uri only
  };

  const pickInspiration = async () => {
    if (inspirations.length >= 3) {
      Alert.alert("You can only add up to 3 inspirations");
      return;
    }

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return Alert.alert("Permission needed");

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const newUris = result.assets.map((img) => img.uri);
      setInspirations([...inspirations, ...newUris].slice(0, 3));
    }
  };

  const removeInspiration = (index) => {
    const updated = inspirations.filter((_, i) => i !== index);
    setInspirations(updated);
  };

  const handlePost = async () => {
    try {
      setLoading(true);
      if (
        !title ||
        !image ||
        !amount ||
        !description ||
        !inspirations ||
        !deadline ||
        !category ||
        !amount
      ) {
        setLoading(false);
        return Alert.alert("Fill all fields");
      }

      // Upload cover
      const coverUrl = await uploadImage(image);

      // Upload inspirations
      const inspirationUrls = await Promise.all(
        inspirations.map((uri) => uploadImage(uri)),
      );

      const challengeData = {
        title,
        image: coverUrl,
        inspirations: inspirationUrls,
        prize: `${currency} ${amount}`,
        deadline: deadline.toISOString(),
        description,
        collection: category,
        createdAt: new Date(),
        user: {
          name: currentUser?.displayName || "Anonymous",
          avatar: currentUser?.photoURL || "https://i.pravatar.cc/150?img=64",
          uid: currentUser?.uid,
        },
      };

      await addDoc(collection(db, "challenges"), challengeData);

      // ✅ Reset form fields
      setTitle("");
      setImage(null);
      setAmount("");
      setDescription("");
      setInspirations([]);

      Alert.alert("Challenge created 🔥");
      router.back();
    } catch (err) {
      Alert.alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.cancel}>Cancel</Text>
        </Pressable>

        <Text style={styles.titleHeader}>New Challenge</Text>

        <View style={{ width: 50 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* IMAGE */}
          <Pressable style={styles.imageBox} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Text style={styles.addImage}>+ Add Cover</Text>
            )}
          </Pressable>

          {/* FORM */}
          <View style={styles.form}>
            <TextInput
              placeholder="Challenge Title"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />

            <View style={styles.collectionBox}>
              <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
              >
                <Picker.Item label="📸   Photography" value="Photography" />
                <Picker.Item label="🎨   Design" value="Design" />
                <Picker.Item label="✏️   Illustration" value="Illustration" />
                <Picker.Item label="🎬   Video" value="Video" />
              </Picker>
            </View>

            {/* 💱 PRICE + CURRENCY */}
            <View style={styles.row}>
              <View style={styles.currencyBox}>
                <Picker
                  selectedValue={currency}
                  onValueChange={(itemValue) => setCurrency(itemValue)}
                >
                  <Picker.Item label="₦ NGN" value="NGN" />
                  <Picker.Item label="$ USD" value="USD" />
                  <Picker.Item label="€ EUR" value="EUR" />
                </Picker>
              </View>

              <TextInput
                placeholder="Amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                style={styles.amountInput}
              />
            </View>

            {/* 📅 DATE PICKER */}
            <Pressable style={styles.dateBox} onPress={() => setShowDate(true)}>
              <Text style={styles.dateText}>
                Deadline: {deadline.toDateString()}
              </Text>
            </Pressable>

            {showDate && (
              <DateTimePicker
                value={deadline}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDate(false);
                  if (selectedDate) setDeadline(selectedDate);
                }}
              />
            )}

            {/* DESCRIPTION */}
            <TextInput
              placeholder="Challenge Details"
              value={description}
              onChangeText={setDescription}
              style={styles.textarea}
              multiline
            />

            <View style={styles.inspirationSection}>
              <Text style={styles.sectionTitle}>INSPIRATION</Text>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.inspirationScrollView}
              >
                {inspirations.map((img, index) => (
                  <View key={index} style={styles.inspirationItem}>
                    <Image
                      source={{ uri: img }}
                      style={styles.inspirationImage}
                    />

                    <Pressable
                      style={styles.removeBtn}
                      onPress={() => removeInspiration(index)}
                    >
                      <Text style={{ color: "#fff" }}>×</Text>
                    </Pressable>
                  </View>
                ))}

                {inspirations.length < 3 && (
                  <Pressable
                    style={styles.addInspiration}
                    onPress={pickInspiration}
                  >
                    <Text style={{ color: "#5151C6", fontSize: 20 }}>+</Text>
                  </Pressable>
                )}
              </ScrollView>
            </View>
          </View>

          {/* BUTTON */}
          <LinearGradient
            colors={["#5151C6", "#888BF4"]}
            style={styles.buttonWrap}
          >
            <Pressable
              style={[styles.button, { opacity: loading ? 0.6 : 1 }]}
              onPress={handlePost}
              disabled={loading}
            >
              {loading ? (
                <Text style={styles.buttonText}>Posting...</Text>
              ) : (
                <Text style={styles.buttonText}>POST CHALLENGE</Text>
              )}
            </Pressable>
          </LinearGradient>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },

  cancel: {
    color: "#5151C6",
    fontSize: 16,
  },

  titleHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#242424",
  },

  imageBox: {
    height: 200,
    margin: 20,
    borderRadius: 15,
    backgroundColor: "#F1F1FE",
    justifyContent: "center",
    alignItems: "center",
  },

  addImage: {
    color: "#5151C6",
    fontSize: 16,
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },

  form: {
    paddingHorizontal: 20,
    gap: 15,
  },

  collectionBox: {
    backgroundColor: "#F3F5F7",
    borderRadius: 12,
    justifyContent: "center",
  },

  input: {
    backgroundColor: "#F3F5F7",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  currencyBox: {
    flex: 1,
    backgroundColor: "#F3F5F7",
    borderRadius: 12,
    justifyContent: "center",
  },

  amountInput: {
    flex: 1,
    backgroundColor: "#F3F5F7",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
  },

  dateBox: {
    backgroundColor: "#F3F5F7",
    padding: 15,
    borderRadius: 12,
  },

  dateText: {
    color: "#242424",
    fontSize: 16,
  },

  textarea: {
    backgroundColor: "#F3F5F7",
    borderRadius: 12,
    padding: 15,
    minHeight: 100,
    textAlignVertical: "top",
    fontSize: 16,
  },

  inspirationSection: {
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#5151C6",
  },

  inspirationScrollView: {
    paddingTop: 10,
  },

  inspirationItem: {
    marginRight: 10,
    position: "relative",
  },

  inspirationImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },

  removeBtn: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#FF4D4D",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  addInspiration: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: "#F1F1FE",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonWrap: {
    margin: 20,
    marginVertical: 40,
    borderRadius: 30,
  },

  button: {
    padding: 16,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
