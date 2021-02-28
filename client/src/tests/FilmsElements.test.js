import React from "react";
import { mount } from "enzyme";

import Films from "../views/Films";
import { findElement } from "./testUtils";

const defaultProps = {
  location: {
    pathname: "/test",
  },
  match: {
    params: {
      id: "123",
    },
  },
};

const setupMount = (props = defaultProps) => {
  return mount(<Films {...props} />);
};

describe("Elements existing in Films page", () => {
  it("Share button exists when entering the page", () => {
    const wrapper = setupMount();
    const shareBtn = findElement(wrapper, "share");
    expect(shareBtn.length).toBe(1);
  });

  it("opens modal window after button was clicked", () => {
    const wrapper = setupMount();

    expect(wrapper.state("open")).toBeFalsy();
    const shareBtn = findElement(wrapper, "share");
    shareBtn.simulate("click");

    expect(wrapper.state("open")).toBeTruthy();
  });
});
