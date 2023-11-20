import { Stack, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

export const LogoutButton = () => {
  const { signOut } = useAuth();

  const doLogout = () => {
    signOut();
  };

  return (
    <Pressable onPress={doLogout} style={{ marginRight: 10 }}>
      <Ionicons name="log-out-outline" size={24} color={"#000"} />
    </Pressable>
  );
};

const Layout = () => {
  const { isSignedIn } = useAuth();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
      }}
    >
      <Stack.Screen
        name="home"
        options={{
          headerTitle: "Home",
          headerRight: () => <LogoutButton />,
        }}
        redirect={!isSignedIn}
      />

      <Stack.Screen
        name="employees"
        options={{
          headerTitle: "Employee List",
        }}
      />

      <Stack.Screen
        name="adddetails"
        options={{
          headerTitle: "Add Employee",
        }}
      />
    </Stack>
  );
};

export default Layout;
