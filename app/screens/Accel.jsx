import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Engine from "../components/Engine";
import Graph from "../components/Graph";

const Accel = (props) => {
  const [values, setValues] = useState([]);
  const [warning, setWarning] = useState("rgba(134, 65, 244, 0.5)");

  return (
    <React.Fragment>
      <View style={styles.half}>
        <Graph warning={warning} values={values} />
      </View>
      <View style={styles.half}>
        <Engine
          values={values}
          warning={warning}
          setWarning={setWarning}
          setValues={setValues}
        />
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  half: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: "50%",
  },
});

export default Accel;
