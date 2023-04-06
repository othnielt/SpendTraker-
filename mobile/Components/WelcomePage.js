import React, { useEffect, useRef } from "react";
import { View, Text, Image, Button, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import animationData from "../media/wallet.json";

const WelcomePage = () => {
  return (
    <View>
      
      <MoneyAnimation />
    </View>
  );
}

const WelcomePageImage = () => {
  return (
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={require("../media/undraw_invest.png")} />
    </View>
  );
}

const NavigateButton = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.button}>
      <Button
        title="Continue"
        onPress={() => navigation.navigate("SignUp")}
        style={styles.button}
      />
    </View>
  );
}

const MoneyAnimation = () => {
  const container = useRef(null);

  useEffect(() => {
    container.current.play();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.animationContainer}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <LottieView
          ref={container}
          source={animationData}
          loop={true}
          autoPlay={true}
          style={styles.animation}
        />
        <Text style={styles.text}>
          Track and optimize your expenses with Spend Tracker
        </Text>
      </View>

      <NavigateButton />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#FFFFFF",
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
  animationContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 50,
  },
  animation: {
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 50,
    marginTop: 50,
  },
  buttonContainer: {
    fontSize: 24,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#000000",
    padding: 10,
    borderRadius: 5,
  },

  button: {
    marginTop: 50,
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#87CEFA",
    color: "#FFFFFF",
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#87CEFA"
  }
  
  
});

export default WelcomePage;


