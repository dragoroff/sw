import React, { Component } from "react";

import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import { getData, postFavouriteChars } from "../../actions";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

import "./index.css";
import { getIdFromUrl } from "../../utils/stringHandler";
import { removeElement } from "../../utils/arrHandler";
import Cookies from "js-cookie";

class CharactersList extends Component {
  constructor() {
    super();
    this.state = {
      characters: [],
      filtered: [],
      page: 1,
      searchText: "",
      selected: [],
    };
  }

  async componentDidMount() {
    let characters = await getData();

    // leave only name and id
    if (characters.length) {
      characters = characters.map((char) => {
        const id = getIdFromUrl(char);

        return {
          id,
          name: char.name,
        };
      });
    }

    this.setState((state) => ({
      ...state,
      characters: characters,
    }));
  }

  selectCharacter = (e) => {
    const id = e.target.name;

    this.setState((state) => ({
      ...state,
      selected: state.selected.includes(id)
        ? removeElement(state.selected, id)
        : [...state.selected, id],
    }));
  };

  buildCharList = (data) => {
    return data.map((char, ind) => {
      return (
        <Card key={ind} className="mt-2">
          <CardContent>
            <span className="col-3">{char.name}</span>
            <div className="float-right">
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    name={char.id}
                    onChange={this.selectCharacter}
                    checked={this.state.selected.includes(char.id)}
                  />
                }
              />
            </div>
          </CardContent>
        </Card>
      );
    });
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

  suggestMovies = () => {
    if (!this.state.selected.length) {
      return;
    }

    const arrCharIds = this.state.characters.map((char) => char.id);

    const charIds = arrCharIds.filter((id) => this.state.selected.includes(id));

    if (!charIds.length) {
      return;
    }

    // send selected characters to server and move to next page
    postFavouriteChars(charIds);
  };

  render() {
    console.log(Cookies.get("charCookie"));
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
            <button data-test="search-btn" className="btn btn-success btn-sm ">
              Search
            </button>
          </div>
        </div>
        <div className="row justify-content-center mt-2">
          <button
            style={{ width: "20%" }}
            data-test="suggest-movies"
            className="btn btn-primary btn-sm"
            onClick={this.suggestMovies}
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
