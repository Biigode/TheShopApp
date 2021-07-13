import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
} from "react-native";

import InputComponent from "../../components/UI/Input";
import Colors from "../../constants/Colors";

import { useDispatch } from "react-redux";
import * as authAction from "../../reduxStore/actions/auth";

const AuthScreen = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const dispatch = useDispatch();
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.containerText}>
        <InputComponent
          textValue={email}
          setText={setEmail}
          label="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <InputComponent
          textValue={password}
          setText={setPassWord}
          label="Password"
          keyboardType="default"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          color={Colors.primary}
          onPress={() => {
            dispatch(authAction.signUp(email, password));
          }}
        />
        <Button
          title="Sign up"
          color={Colors.accent}
          onPress={() => {
            props.navigation.navigate({ name: "CreateUser" });
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  containerText: {
    width: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
});
export default AuthScreen;