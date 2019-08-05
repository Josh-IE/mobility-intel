import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import CDFChart from "./CDFChart";
import { chartData, chartDimension } from "../../utils/testData";

it("renders without crashing", done => {
  const div = document.createElement("div");
  ReactDOM.render(
    <CDFChart mobilityData={chartData} dimension={chartDimension} />,
    div
  );
  done();
  ReactDOM.unmountComponentAtNode(div);
});

it("generates CDFChart on mount", () => {
  const spy = jest.spyOn(CDFChart.prototype, "generateCDFChart");
  const wrapper = mount(
    <CDFChart mobilityData={chartData} dimension={chartDimension} />
  );
  const instance = wrapper.instance();
  instance.generateCDFChart();
  expect(spy).toHaveBeenCalled();
});
