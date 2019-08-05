import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import Histogram from "./Histogram";
import { chartData, chartDimension } from "../../utils/testData";

it("renders without crashing", done => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Histogram mobilityData={chartData} dimension={chartDimension} />,
    div
  );
  done();
  ReactDOM.unmountComponentAtNode(div);
});

it("generates histogram on mount", () => {
  const spy = jest.spyOn(Histogram.prototype, "generateHistogram");
  const wrapper = mount(
    <Histogram mobilityData={chartData} dimension={chartDimension} />
  );
  const instance = wrapper.instance();
  instance.generateHistogram();
  expect(spy).toHaveBeenCalled();
});
