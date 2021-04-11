import React from "react";
import { AreaChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";

class Graph extends React.PureComponent {
  render() {
    const { values, warning } = this.props;

    return (
      <AreaChart
        style={{ height: "100%", width: "100%" }}
        data={values}
        contentInset={{ top: 30, bottom: 30 }}
        curve={shape.curveNatural}
        svg={{
          fill: "black",
        }}
      >
        <Grid />
      </AreaChart>
    );
  }
}
export default Graph;
