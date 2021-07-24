import React, { Component } from 'react'
import axios from "axios";
import AnimeList from "./AnimeList";
export class Anime extends Component {
    state = {
      title: "",
      type: "",
      episodes: "",
      image_url: "",
      isLoading: true,
      score: "",
      synopsis: "",
      title_japanese: "",
      animeArray: []
    }
    handleSearchAnime = async (title) => {
        try {
          //https://api.spoonacular.com/recipes/random?number=1&tags=vegetarian,dessert
          let results = await axios.get(
            `https://api.jikan.moe/v3/search/anime?q=${title}`
          );
            // console.log(result)
          this.setState({
            animeArray: results.data.results
          });
          // console.log(this.state.animeArray)
        } catch (e) {
          return e;
        }
      };
      handleOnChange = (event) => {
        this.setState({
          title: event.target.value,
        });
      };
      onSubmit = async (event) => {
          try {
              let results = await this.handleSearchAnime(this.state.title);
              console.log(results)
              this.setState({
                  animeArray: results.data.results,
              })
          } catch (e) {
              console.log(e);
          }
      }
    render() {
      console.log(this.state)
        return (
          <div>
            <div
                style={{
                width: 500,
                margin: "0 auto",
                textAlign: "center",
                marginTop: "50px",
                }}
            >
                <input
                type="text"
                placeholder="Search something..."
                name="title"
                onChange={this.handleOnChange}
                />
                <button onClick={this.onSubmit}>Search</button>
            </div>
            <div style={{
            width: 1200,
            margin: "0 auto",
            textAlign: "center",
            marginTop: "50px",
            display: "flex",
            }}
            >
              <h2>Animes </h2>
              <AnimeList animeArray={this.state.animeArray} />
            </div>
            </div>
        );
    }
}
export default Anime