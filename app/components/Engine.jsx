import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Alert, Text, TouchableOpacity, View } from "react-native";
import { Accelerometer } from "expo-sensors";

const Engine = ({ values, setValues, setWarning, warning }) => {
  const [active, setActive] = useState(false);
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [high, setHigh] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const { x, y, z } = data;
  const styles = StyleSheet.create({
    container: {
      backgroundColor: warning ? "white" : "pink",
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 10,
    },
    val: {
      justifyContent: "center",
      alignSelf: "center",

      fontSize: 48,
    },
    text: {
      textAlign: "center",
    },
    buttonContainer: {
      width: "100%",
      flexDirection: "row",
      alignItems: "stretch",
      marginTop: 15,
    },
    button: {
      flex: 1,
      borderColor: "black",
      borderWidth: 10,
      margin: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#eee",
      padding: 10,
    },
    middleButton: {
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: "#ccc",
    },
  });
  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setData(accelerometerData);
      })
    );
    Accelerometer.setUpdateInterval(16);
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  if (z < high) {
    setHigh(z);
    setWarning(true);
  }
  useInterval(() => {
    setValues(values.concat(-z));
    if (values.length > 60) {
      values.shift();
      setValues(values);
    }
  }, 256);

  const init = () => {
    setValues([]);
    setHigh(0);
  };
  if (-high > 1.8) {
    setWarning(false);
    console.log("here");
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Most Recent Max</Text>
      <Text style={styles.val}>{-high.toFixed(8)}</Text>
      <Text style={styles.text}>Current: {-z.toFixed(8)}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => init()} style={styles.button}>
          <Text>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Engine;
