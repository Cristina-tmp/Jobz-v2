import React, { useState } from "react";
import BarChartComp from "./BarChart";
import AreaChartComp from "./AreaChart";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/ChartsContainer";

export const ChartsContainer = () => {
  const { monthlyApplications: data } = useAppContext();

  const [barChart, setBarChart] = useState(true);

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? <BarChartComp data={data} /> : <AreaChartComp data={data} />}
    </Wrapper>
  );
};
