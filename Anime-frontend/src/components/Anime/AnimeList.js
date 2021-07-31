import React from "react";

import { Link } from "react-router-dom";
import "./AnimeList.css";


function AnimeList(props) {
    return props.animeArray.map((item) => {
        console.log('animeList', item.mal_id)
        return (
            <div
        key={item.image_url}
        style={{ width: 100, height: 100, marginRight: 25, marginBottom: 100 }}
      >
      <Link
          to={{
            pathname: `/anime-detail/${item.mal_id}`,
          }}
        >
          <div>
            <button className="fav">Favorite</button>
            <img src={item.image_url} alt={item.title} />
          </div>
          <div>
            <ul>
              <li>Anime: {item.title}</li>
            </ul>
          </div>
        </Link>
      </div>
    );
  });
}
export default AnimeList;
// import React, { Component } from 'react'
// export class AnimeList extends Component {
//   render() {
//     return (
//       <div>
//         hello
//       </div>
//     )
//   }
// }
// export default AnimeList