import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import Point from "./Point";
import {
  mobilityData,
  pointPaintProperties,
  viewport
} from "../../utils/testData";
import MAP_STYLE from "../../map/style.json";

it("renders without crashing", done => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Point
      mobilityData={mobilityData}
      paintProperties={pointPaintProperties}
      viewport={viewport}
    />,
    div
  );
  done();
  ReactDOM.unmountComponentAtNode(div);
});

it("generates point cloud layers on mount", () => {
  // assert the length of the base style is 24 before mounting
  expect(MAP_STYLE.layers.length).toBe(24);
  // mount <Point/>
  const wrapper = shallow(
    <Point
      mobilityData={mobilityData}
      paintProperties={pointPaintProperties}
      viewport={viewport}
    />
  );
  // assert its state after mounting
  expect(wrapper.state("mapStyle").toJS().layers.length).toBe(26);
  expect(wrapper.state("viewport")).toBe(viewport);
  // instance of component
  const instance = wrapper.instance();
  expect(instance.paintProperties).toBe(pointPaintProperties);

  // console.log(mapStyle.toJS().sources.heatmapcol)
});
