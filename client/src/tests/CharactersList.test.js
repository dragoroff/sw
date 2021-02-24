import React from "react";
import { mount, shallow } from "enzyme";
import moxios from "moxios";

import CharactersList from "../views/CharactersList";
import { findElement } from "./testUtils";
import { getCharacters, getTotalCount, getData } from "../requests";
import urls from "../requests/urls";

const setupShallow = (props = {}) => {
  return shallow(<CharactersList {...props} />);
};

const setupMount = (props = {}) => {
  return mount(<CharactersList {...props} />);
};

describe("Elements existing for CharactersList page", () => {
  test("Search box exists when entering the page", () => {
    const wrapper = setupMount();
    const search = findElement(wrapper, "search");
    expect(search.length).toBe(1);
  });

  test("Button exists when entering the page", () => {
    const wrapper = setupShallow();
    const button = findElement(wrapper, "suggest-movies");
    expect(button.length).toBe(1);
  });
});

// describe("REST for CharactersList page", () => {
//   beforeEach(() => {
//     moxios.install();
//   });

//   afterEach(() => {
//     moxios.uninstall();
//   });

//   test("adds list of characters to state", (done) => {
//     const results = [
//       { name: "Luke Skywalker" },
//       { name: "C-3PO" },
//       { name: "R2-D2" },
//     ];

//     const wrapper = setupShallow();

//     moxios.stubRequest(`${urls.getCharacters}`, {
//       status: 200,
//       response: {
//         count: 82,
//       },
//     });

//     moxios.wait();

//     for (let num = 1; num < 9; num++) {
//       moxios.stubRequest(`${urls.getCharacters}?page=${num}`, {
//         status: 200,
//         response: {
//           count: 82,
//           results: results,
//         },
//       });
//     }

//     getData();

//     moxios.wait(() => {
//       expect(wrapper.state().characters).toEqual(results);
//       done();
//     });
//   });

//   // test("request and gets data from multiple pages", () => {})
// });
