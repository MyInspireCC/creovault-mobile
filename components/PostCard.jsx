import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Chat from "../assets/images/Chat.svg";
import Heart from "../assets/images/heart.svg";
import Plus from "../assets/images/plus.svg";

export default function PostCard({ post }) {
  function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (let key in intervals) {
      const value = Math.floor(seconds / intervals[key]);
      if (value > 0) return `${value} ${key}${value > 1 ? "s" : ""} ago`;
    }

    return "just now";
  }

  return (
    <View style={styles.card}>
      {/* TOP */}
      <View style={styles.top}>
        <View style={styles.profileDetail}>
          <Image
            source={{
              uri: post.user?.avatar || "https://i.pravatar.cc/150?img=64",
            }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{post.user.name}</Text>
        </View>
        <Text style={styles.time}>{timeAgo(post.createdAt)}</Text>
      </View>

      {/* MIDDLE */}
      <Image source={{ uri: post.image }} style={styles.postImage} />

      {/* BOTTOM */}
      <View style={styles.bottom}>
        <TouchableOpacity>
          <Plus width={20} height={20} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconGroup}>
          <Text>{post.comments}</Text>
          <Chat width={20} height={20} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconGroup}>
          <Text>{post.likes}</Text>
          <Heart width={20} height={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginTop: 20,
    borderRadius: 10,
    paddingVertical: 10,
  },

  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },

  profileDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  avatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },

  name: {
    fontWeight: "600",
    color: "#242424",
    fontSize: 18,
  },

  time: {
    color: "#BDBDBD",
    fontSize: 16,
  },

  postImage: {
    width: "100%",
    height: 220,
    marginTop: 10,
  },

  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 10,
  },

  iconGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
