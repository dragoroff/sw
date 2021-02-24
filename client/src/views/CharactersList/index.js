import React, { Component } from "react";

import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import { getCharacters, getTotalCount, getData } from "../../requests";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

import "./index.css";

class CharactersList extends Component {
  constructor() {
    super();
    this.state = {
      characters: [],
      filtered: [],
      page: 1,
      searchText: "",
    };
  }

  async componentDidMount() {
    const characters = await getData();

    console.log("characters", characters);
    this.setState((state) => ({
      ...state,
      characters: characters,
    }));
  }

  buildCharList = (data) => {
    return data.map((char, ind) => (
      <Card key={ind} className="mt-2">
        <CardContent>
          <span className="col-3">{char.name}</span>
          <div className="float-right">
            <FormControlLabel
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  name="checkedH"
                />
              }
            />
          </div>
        </CardContent>
      </Card>
    ));
  };

  handlePageChange = (page) => {
    this.setState((state) => ({
      ...state,
      page: page,
    }));
  };

  handleSearchChange = (text) => {
    if (!this.state.characters.length) {
      return;
    }

    const filteredChars = this.state.characters.filter(
      (char) => char.name.toLowerCase().indexOf(text.toLowerCase()) !== -1
    );

    this.setState((state) => ({
      ...state,
      searchText: text,
      filtered: filteredChars,
    }));
  };

  render() {
    let charList;

    const isFiltered = this.state.filtered.length || this.state.searchText;
    if (this.state.characters.length) {
      const data = isFiltered ? this.state.filtered : this.state.characters;

      const sliced = data.slice(
        (this.state.page - 1) * 10,
        10 * this.state.page
      );

      charList = this.buildCharList(sliced);
    }

    return (
      <div className="char-bg">
        <div className="row justify-content-center">
          <SearchBar searchHandler={this.handleSearchChange} />
          <div className="mt-5">
            <button data-test="search" className="btn btn-success btn-sm ">
              Search
            </button>
          </div>
        </div>
        <div className="row justify-content-center mt-2">
          <button
            style={{ width: "20%" }}
            data-test="suggest-movies"
            className="btn btn-primary btn-sm"
          >
            Suggest Movies
          </button>
        </div>
        <div className="row justify-content-center mt-2">
          <div className="d-block">{charList}</div>
        </div>
        <div className="row justify-content-center mt-4">
          <Pagination
            count={Math.ceil(
              isFiltered
                ? this.state.filtered.length / 10
                : this.state.characters.length / 10
            )}
            handlePageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default CharactersList;
