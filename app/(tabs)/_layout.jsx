import { Tabs } from "expo-router";
import ActivityIcon from "../../assets/images/Activity.svg";
import CreateIcon from "../../assets/images/Create.svg";
import DiscoverIcon from "../../assets/images/Discover.svg";
import HomeIcon from "../../assets/images/Home.svg";
import ProfileIcon from "../../assets/images/Profile.svg";
import IconWrapper from "../../components/IconWrapper";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 10,
          paddingTop: 10,
          paddingBottom: 10,
          height: 80,
        },
        tabBarActiveTintColor: "purple",
        tabBarInactiveTintColor: "#D9D9D9",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <IconWrapper
              Icon={HomeIcon}
              active={focused}
              width={24}
              height={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ focused }) => (
            <IconWrapper
              Icon={DiscoverIcon}
              active={focused}
              width={24}
              height={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ focused }) => (
            <IconWrapper
              Icon={CreateIcon}
              active={focused}
              width={24}
              height={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          tabBarIcon: ({ focused }) => (
            <IconWrapper
              Icon={ActivityIcon}
              active={focused}
              width={24}
              height={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <IconWrapper
              Icon={ProfileIcon}
              active={focused}
              width={24}
              height={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
