import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import ControlBox from "./ControlBox";

it("should call submit handler when the form is submitted", () => {
  const onSubmitFn = jest.fn();
  const wrapper = mount(<ControlBox onSubmit={onSubmitFn} />);
  wrapper.prop("onSubmit") === onSubmitFn;
  const form = wrapper.find("form");
  form.simulate("submit");
  expect(onSubmitFn).toHaveBeenCalledTimes(1);
});
