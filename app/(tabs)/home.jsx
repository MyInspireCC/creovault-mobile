import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { View } from "react-native";
import { auth } from "../../FirebaseConfig";
import SearchBar from "../../components/searchBar";

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/login");
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchBar />
    </View>
  );
}
