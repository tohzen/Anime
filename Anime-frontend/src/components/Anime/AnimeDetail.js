import React, { Component } from "react";
import axios from "axios";
import Axios from "../utils/Axios";
import { Link } from "react-router-dom";


export class AnimeDetail extends Component {
    state = {
      title: "",
      type: "",
      episodes: "",
      image_url: "",
      isLoading: true,
      score: "",
      synopsis: "",
    };
  

    async componentDidMount() {
      this.fetchAnime();
    }
  
    fetchAnime = async () => {
      console.log('AnimeDetails:',this.props.match)
      console.log('fetching id:',this.props.match.params.id)
      try {
        
        let results = await axios.get(
          `https://api.jikan.moe/v3/anime/${this.props.match.params.id}`
        );
        console.log(results)
        
        this.setState(
          {
              title: results.data.title,
              japanese_title:results.data.japanese_title,
              type: results.data.type,
              image: results.data.image_url,
              episodes: results.data.episodes,
              score: results.data.score,
              synopsis: results.data.synopsis,
              isLoading: false,
          },
          () => {
            this.setState({
              friendMessage: `I think this Dish is delicious. ${this.state.title}`,
            });
          }
        );
      } catch (e) {
        console.log(e);
      }
    };
  
    showAnimeDetail = () => {
      console.log('thisState:',this.state)
      return (
        <div style={{ display: "flex" }}>
          <div>
            <img src={this.state.image} alt={this.state.title} />
          </div>
          <ol>
          <li>Anime Title: {this.state.title}</li>
            <li>Type: {this.state.type}</li> 
            <li> episodes: {this.state.episodes}</li> 
            <li> score: {this.state.score}</li> 
            <li> synopsis: {this.state.synopsis}</li> 
            
          </ol>
          <Link to="../Home"> <button>go back</button></Link>
          
        </div>
      );
    };
  
    handleFormSubmit = async (event) => {
      event.preventDefault();
  
      // try {
      //   let message = this.state.friendMessage;
  
      //   let result = await Axios.post("/api/twilio/send-sms", {
      //     to: this.state.selectedFriendMobileNumber,
      //     message: message,
      //   });
  
      //   console.log(result);
      // } catch (e) {
      //   console.log(e.response);
      // }
    };
  
    handleSelectChange = (event) => {
      // console.log(JSON.parse(event.target.value));
      // console.log(event.target.value);
  
      let selectedUser = JSON.parse(event.target.value);
  
      this.setState({
        selectedFriendFirstName: selectedUser.firstName,
        selectedFriendLastName: selectedUser.lastName,
        selectedFriendID: selectedUser._id,
        selectedFriendMobileNumber: selectedUser.mobileNumber,
        friendMessage: `Hey ${selectedUser.firstName}, ${this.state.originalMessage}`,
      });
    };
  
    render() {
      // console.log(this.state);
      return (
        <div>
          {this.state.isLoading ? (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              ...Loading
            </div>
          ) : (
            <div>
              {this.showAnimeDetail()}
  
              {/* <div style={{ width: 250, margin: "0 auto", textAlign: "center" }}>
                <select onChange={this.handleSelectChange}>
                  <option>Select a friend</option>
                  {this.state.friendsArray.map((friend) => {
                    return (
                      <option key={friend._id} value={JSON.stringify(friend)}>
                        {friend.firstName} {friend.lastName}
                      </option>
                    );
                  })}
                </select>
                <textarea
                  col="50"
                  rows="20"
                  defaultValue={this.state.friendMessage}
                />
                <br />
                <button onClick={this.handleFormSubmit}>Submit</button>
              </div> */}
            </div>
          )}
        </div>
      );
    }
  }
  
  export default AnimeDetail;