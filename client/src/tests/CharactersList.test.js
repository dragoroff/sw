import React from "react";
import { mount, shallow } from "enzyme";
import moxios from "moxios";
import sinon from "sinon";

import CharactersList from "../views/CharactersList";
import { findElement } from "./testUtils";
import { getData } from "../actions";

const setupShallow = (props = {}) => {
  return shallow(<CharactersList {...props} />);
};

const setupMount = (props = {}) => {
  return mount(<CharactersList {...props} />);
};

describe("Elements existing in CharactersList page", () => {
  it("Search box exists when entering the page", () => {
    const wrapper = setupMount();
    const search = findElement(wrapper, "search");
    expect(search.length).toBe(1);
  });

  it("Search button exists when entering the page", () => {
    const wrapper = setupMount();
    const search = findElement(wrapper, "search-btn");
    expect(search.length).toBe(1);
  });

  it("'Suggest Movies' button exists when entering the page", () => {
    const wrapper = setupShallow();
    const button = findElement(wrapper, "suggest-movies");
    expect(button.length).toBe(1);
  });

  it("Pagination exists when entering the page", () => {
    const wrapper = setupMount();
    const pagination = findElement(wrapper, "pagination");
    expect(pagination.length).not.toBe(0);
  });
});

describe("Search", () => {
  const characters = [
    { name: "Luke Skywalker", url: "http://swapi.dev/api/people/1/" },
    { name: "C-3PO", url: "http://swapi.dev/api/people/2/" },
    { name: "R2-D2", url: "http://swapi.dev/api/people/3/" },
  ];

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("filters out characters", (done) => {
    const wrapper = setupMount();

    moxios.stubRequest(/swapi.*/, {
      status: 200,
      response: {
        count: 1,
        results: characters,
      },
    });

    let onFulfilled = sinon.spy();
    getData().then(onFulfilled);

    moxios.wait(() => {
      const search = findElement(wrapper, "search");
      search.simulate("change", { target: { value: "Luke" } });

      expect(wrapper.state().filtered.length).toEqual(1);

      search.simulate("change", { target: { value: "Empty value" } });
      expect(wrapper.state().filtered.length).toEqual(0);

      done();
    });
  });
});

describe("REST for CharactersList page", () => {
  const characters = [
    { name: "Luke Skywalker", url: "http://swapi.dev/api/people/1/" },
  ];

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("adds list of characters to state", (done) => {
    const wrapper = setupShallow();

    moxios.stubRequest(/swapi.*/, {
      status: 200,
      response: {
        count: 1,
        results: characters,
      },
    });

    let onFulfilled = sinon.spy();
    getData().then(onFulfilled);

    moxios.wait(() => {
      expect(wrapper.state().characters).toEqual([
        {
          id: "1",
          name: characters[0].name,
        },
      ]);
      done();
    });
  });
});
