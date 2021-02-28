/**
 * @jest-environment node
 */

import React from "react";
import { shallow } from "enzyme";
import moxios from "moxios";
import sinon from "sinon";

import Films from "../views/Films";
import { getData } from "../actions";
import urls from "../actions/urls";

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

const films = [
  {
    title: "Revenge of the Sith",
    url: "http://swapi.dev/api/films/1/",
    characters: [
      "http://swapi.dev/api/people/1/",
      "http://swapi.dev/api/people/2/",
      "http://swapi.dev/api/people/3/",
    ],
    release_date: "1977-05-25",
  },
  {
    title: "Return of the Jedi",
    url: "http://swapi.dev/api/films/2/",
    characters: ["http://swapi.dev/api/people/1/"],
    release_date: "1983-05-25",
  },
  {
    title: "The Empire Strikes Back",
    url: "http://swapi.dev/api/films/3/",
    characters: ["http://swapi.dev/api/people/1/"],
    release_date: "1980-05-17",
  },
];

const setupShallow = (props = defaultProps) => {
  return shallow(<Films {...props} />);
};

const getDataRequests = () => {
  moxios.stubRequest(/swapi.*/, {
    status: 200,
    response: {
      count: 1,
      results: films,
    },
  });

  moxios.stubRequest(/api.*/, {
    status: 200,
    response: {
      results: "1,2,3",
    },
  });

  let onFulfilled = sinon.spy();

  getData(urls.getFilms).then(onFulfilled);
  getData(`/api/fav-chars/123`).then(onFulfilled);
};

describe("REST for Films page", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("adds films to state", (done) => {
    const wrapper = setupShallow();

    getDataRequests();

    moxios.wait(() => {
      expect(wrapper.state("films").length).not.toBe(0);
      done();
    });
  });

  it("sorts films correctly by chosen favourite characters", (done) => {
    const wrapper = setupShallow();

    getDataRequests();

    moxios.wait(() => {
      expect(wrapper.state("films")[0].title).toBe(films[0].title);
      done();
    });
  });

  it("sorts films with the same rating correctly", (done) => {
    const wrapper = setupShallow();

    getDataRequests();

    moxios.wait(() => {
      expect(wrapper.state("films")[1].title).toBe(films[1].title);
      done();
    });
  });
});
