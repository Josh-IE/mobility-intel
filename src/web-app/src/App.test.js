import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import expect from "expect";
import App from "./App";

it("renders without crashing", done => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  done();
  ReactDOM.unmountComponentAtNode(div);
});

it("simulate method is called", done => {
  const wrapper = shallow(<App />);
  const instance = wrapper.instance();
  const spy = jest.spyOn(instance, "simulate");
  wrapper.update();
  instance.forceUpdate();
  instance.simulate();
  done();
  expect(spy).toHaveBeenCalled();

  expect(instance.viewport).toBeDefined();
  expect(instance.pointPaintProperties).toBeDefined();
  expect(instance.heatmapPaintProperties).toBeDefined();
  expect(instance.histogramDimension).toBeDefined();
  expect(instance.cdfDimension).toBeDefined();
});
