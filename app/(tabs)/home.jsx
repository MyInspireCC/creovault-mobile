import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PostCard from "../../components/PostCard";
import SearchBar from "../../components/searchBar";
import { db } from "../../FirebaseConfig";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["Popular", "Trending", "Following"];

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const q = query(
          collection(db, "challenges"),
          orderBy("createdAt", "desc"),
        );
        const snapshot = await getDocs(q);
        const challenges = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(challenges);
      } catch (err) {
        console.log("Error fetching challenges:", err);
      }
    };

    fetchChallenges();
  }, []);

  return (
    <SafeAreaView style={styles.safeareaview}>
      <View style={styles.header}>
        <SearchBar />
        <View style={styles.tabsContainer}>
          {tabs.map((tab, index) => {
            const isActive = activeTab === index;

            return (
              <TouchableOpacity
                key={index}
                style={[styles.tab, isActive && styles.activeTab]}
                onPress={() => setActiveTab(index)}
              >
                <Text
                  style={isActive ? styles.activeText : styles.inactiveText}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <ScrollView
        style={styles.scrollview}
        showsVerticalScrollIndicator={false}
      >
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={{
              user: {
                name: post.user?.name || "Unknown",
                avatar: post.user?.avatar,
              },
              image: post.image,
              likes: post.likes || 0,
              comments: post.comments || 0,
              title: post.title,
              description: post.description,
              prize: post.prize,
              deadline: post.deadline,
              inspirations: post.inspirations || [],
              collection: post.collection,
            }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 20,
  },

  header: {
    paddingHorizontal: 20,
    paddingBottom: 7,
  },

  scrollview: {
    flex: 1,
    backgroundColor: "#F1F1FE",
    paddingHorizontal: 20,
  },

  tabsContainer: {
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: "#fff",
  },

  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },

  activeTab: {
    backgroundColor: "#F1F1FE",
  },

  activeText: {
    fontWeight: "600",
    color: "#5151C6",
    fontSize: 18,
  },

  inactiveText: {
    color: "#BDBDBD",
    fontWeight: "500",
    fontSize: 18,
  },
});
