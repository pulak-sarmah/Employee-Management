import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const employees = () => {
  const [employees, setEmployees] = useState([]);
  const [input, setInput] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchEmployeeData = async function () {
      try {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_BASE_URL}/employees`
        );
        setEmployees(response.data);
      } catch (err) {
        console.log("Error fetching Employee data", err);
      }
    };
    fetchEmployeeData();
  }, []);

  console.log(employees);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            height: 40,
            borderRadius: 4,
          }}
        >
          <AntDesign name="search1" size={20} color="black" />
          <TextInput
            value={input}
            onChangeText={(text) => setInput(text)}
            placeholder="search"
            style={{ flex: 1 }}
          />
          {employees.length > 0 && (
            <View>
              <Pressable>
                <AntDesign name="pluscircle" size={24} color="black" />
              </Pressable>
            </View>
          )}
        </Pressable>
      </View>
      <Pressable onPress={() => router.push("/(auth)/adddetails")}>
        <AntDesign name="pluscircle" size={24} color="#0072b1" />
      </Pressable>
    </View>
  );
};

export default employees;

const styles = StyleSheet.create({});
