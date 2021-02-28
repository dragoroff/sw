import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import CustomDialog from "../../components/CustomDialog";
import { getData } from "../../actions";
import urls from "../../actions/urls";
import { SERVER_URL } from "../../config";
import { getIdFromUrl } from "../../utils/stringHandler";
import { convertStringToUnix } from "../../utils/dateParse";

class Films extends Component {
  constructor() {
    super();
    this.state = {
      films: [],
      open: false,
    };
  }

  async componentDidMount() {
    // get films and get choices

    const [films, favChars] = await Promise.all([
      getData(urls.getFilms),
      getData(`${SERVER_URL}/api/fav-chars/${this.props.match.params.id}`),
    ]);

    const splitedFavChars = favChars.split(",");

    const filmRatings = this.getFilmRating(films, splitedFavChars);

    const sortedFilms = filmRatings.length && filmRatings.sort(this.sortFilms);

    this.setState((state) => ({
      ...state,
      films: sortedFilms,
    }));
  }

  sortFilms = (film, filmNext) => {
    if (
      (!film.rating && film.rating !== 0) ||
      (!filmNext.rating && filmNext.rating !== 0) ||
      !film.release ||
      !filmNext.release
    ) {
      return null;
    }

    if (filmNext.rating < film.rating) {
      return -1;
    }

    if (filmNext.rating > film.rating) {
      return 1;
    }

    // filmNext.rating === film.rating
    const filmNextRelease = convertStringToUnix(filmNext.release);
    const filmRelease = convertStringToUnix(film.release);

    if (filmNextRelease < filmRelease) {
      return -1;
    }

    if (filmNextRelease > filmRelease) {
      return 1;
    }

    return 0;
  };

  getFilmRating = (films, charIds) => {
    const filmRatings = [];

    for (let film of films) {
      let rating = 0;
      const filmChars = film.characters.map((char) => getIdFromUrl(char));

      for (let char of filmChars) {
        if (charIds.includes(char)) {
          rating++;
        }
      }

      const filmObj = {
        title: film.title,
        rating: rating,
        release: film.release_date,
      };

      filmRatings.push(filmObj);
    }

    return filmRatings;
  };

  buildFilmList = (data) => {
    return data.map((film, ind) => {
      return (
        <Card key={ind} className="mt-2">
          <CardContent>
            <div className="row">
              <div className="col-6">Title:</div>
              <div className="col-6">{film.title}</div>
            </div>
            <div className="row">
              <div className="col-6">Release Date:</div>
              <div className="col-6">{film.release}</div>
            </div>
            <div className="row">
              <div className="col-6">Fav Characters</div>
              <div className="col-6">{film.rating}</div>
            </div>
          </CardContent>
        </Card>
      );
    });
  };

  toggleModal = () => {
    this.setState((state) => ({
      ...state,
      open: !state.open,
    }));
  };

  render() {
    const films = this.state.films.length
      ? this.buildFilmList(this.state.films)
      : null;
    return (
      <div>
        <div className="row justify-content-center">
          <div className="d-block mt-4" style={{ width: "25%" }}>
            {films}
          </div>
        </div>

        <div className="row justify-content-center">
          <CustomDialog
            url={this.props.location.pathname}
            handleClick={this.toggleModal}
            open={this.state.open}
          />
        </div>
      </div>
    );
  }
}

export default Films;
