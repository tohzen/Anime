import React, { Component } from 'react'
import axios from "axios";
import AnimeList from "./AnimeList";
import { Link } from "react-router-dom";
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
      animeArray: [],
      totalCount: 0,
    totalPage: 0,
    perPage: 10,
    currentPage: 1,
    maxPageLimit: 10,
    minPageLimit: 0,
    pageArray: [],
    }

    getTotalPages = (totalResults, perPage) => {
      let pages = [];
  
      for (let i = 1; i < Math.ceil(totalResults / perPage); i++) {
        pages.push(i);
      }
      return pages;
    };
  
    async componentDidMount() {
      try {
        //check for session storage
        let searchedAnimeTitleSessionStorage =
          window.sessionStorage.getItem("searchedAnimeTitle");
  
        if (searchedAnimeTitleSessionStorage) {
          let result = await this.handleSearchAnime(
            searchedAnimeTitleSessionStorage
          );
  
          let totalPageArray = this.getTotalPages(
            +result.data.totalResults,
            this.state.perPage
          );
  
          this.setState({
            anime: searchedAnimeTitleSessionStorage,
            movieArray: result.data.Search,
            totalPage: +result.data.totalResults, //in batman result is 440
            pageArray: totalPageArray,
          });
        } else {
          let randomAnimeTitle = this.handleRandomTitle();
          let result = await this.handleSearchAnime(randomAnimeTitle);
          // let result = await this.handleSearchAnime(randomAnimeTitle);
  
          let totalPageArray = this.getTotalPages(
            +result.data.totalResults,
            this.state.perPage
          );
  
          //logs results object where you can find total results
          console.log(result);
  
          console.log(totalPageArray);
  
          this.setState({
            anime: randomAnimeTitle,
            movieArray: result.data.Search,
            totalPage: +result.data.totalResults, //in batman result is 440
            pageArray: totalPageArray, //[1,2,3,4,5] all the way time 440 each page will contain 10 results
          });
  
          // let randomAnimeTitle = this.handleRandomTitle();
          // let result = this.handleSearchAnime(randomAnimeTitle);
          // let result2 = this.handleSearchAnime("batman");
          // let result3 = this.handleSearchAnime("the matrix");
          // let getAllPromiseAnimes = Promise.all([result, result2, result3]);
          // let resolvedAnime = await getAllPromiseAnimes;
          // console.log(resolvedAnime);
          // this.setState({
          //   movieArray: resolvedAnime[0].data.Search,
          //   movieArray2: resolvedAnime[1].data.Search,
          //   movieArray3: resolvedAnime[2].data.Search,
          // });
        }
      } catch (e) {
        console.log(e);
      }
    }
  
    handleRandomTitle = () => {
      let randomAnimeArray = [
        "Big trouble in little china",
        "the simpsons",
        "Rush hour",
        "the godfather",
        "Luca",
        "Pulp Fiction",
        "The Matrix",
      ];
  
      let randomSelectedAnimeIndex = Math.floor(
        Math.random() * randomAnimeArray.length
      );
  
      return randomAnimeArray[randomSelectedAnimeIndex];
    };
  
    handleSearchAnime = async (movieTitle) => {
      try {
        let randomAnimeData = await axios.get(
          `https://omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API}&s=${movieTitle}&page=${this.state.currentPage}`
        );
  
        return randomAnimeData;
      } catch (e) {
        return e;
      }
    };
  
    //creates handler function that sets following state
    handleOnChange = (event) => {
      this.setState({
        anime: event.target.value,
      });
    };
  
    //function that sets variable to ajax call and sets state movieArray to result.data.Search
    onSubmit = async (event) => {
      try {
        let result = await this.handleSearchAnime(this.state.anime);
  
        window.sessionStorage.setItem("searchedAnimeTitle", this.state.anime);
  
        let totalPageArray = this.getTotalPages(
          +result.data.totalResults,
          this.state.perPage
        );
  
        this.setState({
          movieArray: result.data.Search,
          totalPage: +result.data.totalResults,
          pageArray: totalPageArray,
        });
        //catches error and logs it
      } catch (e) {
        console.log(e);
      }
    };
  
    showpagination = () => {
      let totalPages = this.state.totalPage; // 440
      let perPage = this.state.perPage; // 10
      let currentPage = this.state.currentPage; // 1
      let maxPageLimit = this.state.maxPageLimit; // 10
      let minPageLimit = this.state.minPageLimit; // 0
  
      const buildPagination = () => {
        return (
          <>
            {this.state.pageArray.map((number) => {
              console.log(number < maxPageLimit + 1 && number > minPageLimit);
              // console.log("number: ", number);
              // console.log("maxPageLimit + 1", maxPageLimit);
  
              if (number < maxPageLimit + 1 && number > minPageLimit) {
                return (
                  <span
                    onClick={() => this.handleGoToPage(number)}
                    style={{
                      marginLeft: 15,
                      marginRight: 15,
                      cursor: "pointer",
                      color: currentPage === number ? "red" : "black",
                    }}
                    key={number}
                  >
                    {number}
                  </span>
                );
              }
            })}
          </>
        );
      };
  
      return (
        <div>
          <ul>{buildPagination()}</ul>
        </div>
      );
    };
  
    handleGoToPage = (number) => {
      this.setState(
        {
          currentPage: number,
        },
        async () => {
          let result = await this.handleSearchAnime(this.state.anime);
  
          this.setState({
            movieArray: result.data.Search,
          });
        }
      );
    };
  
    nextPage = () => {
      this.setState(
        (prevState) => {
          return {
            ...prevState,
            currentPage: prevState.currentPage + 1,
          };
        },
        async () => {
          let anime = "";
  
          let searchedAnimeTitleSessionStorage =
            window.sessionStorage.getItem("searchedAnimeTitle");
  
          anime = searchedAnimeTitleSessionStorage
            ? window.sessionStorage.getItem("searchedAnimeTitle")
            : this.state.anime;
  
          let result = await this.handleSearchAnime(anime);
          console.log(result);
          this.setState({
            movieArray: result.data.Search,
          });
        }
      );
  
      if (this.state.currentPage + 1 > this.state.maxPageLimit) {
        this.setState({
          maxPageLimit: this.state.maxPageLimit + this.state.perPage,
          minPageLimit: this.state.minPageLimit + this.state.perPage,
        });
      }
    };
  
    prevPage = () => {
      this.setState(
        (prevState) => {
          return {
            ...prevState,
            currentPage: prevState.currentPage - 1,
          };
        },
        async () => {
          let result = await this.handleSearchAnime("batman");
          console.log(result);
          this.setState({
            animeArray: result.data.Search,
          });
        }
      );

      if ((this.state.currentPage - 1) % this.state.perPage === 0) {
        this.setState({
          maxPageLimit: this.state.maxPageLimit - this.state.perPage,
          minPageLimit: this.state.minPageLimit - this.state.perPage,
        });
      }
    };
    
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
            width: 1500,
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