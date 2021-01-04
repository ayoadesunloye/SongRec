import React from "react";

import MusicForm from "./components/MusicForm"

class SongRec extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      recs: [], //recommendations
      // array of objects with song title, object and unique id properties
    };
  }

  handleChange = (e) => {
    this.setState({value: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const song = {
      id: parseInt(this.state.value),
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json', 
        'accept': 'application/json'
      },
  };

    fetch(`http://localhost:8000/song_rec/${song.id}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        let tmpArray = [];

        for (let i = 0; i < data[1].length; i++) {
          let songObj = data[1][i];
          let songArtist = songObj.artist.replace(/-/g, ' '); // removes hyphens from artist string
          
          // Capitalizes first letter of each "word" of artist string
          songArtist = songArtist.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');

          tmpArray.push({ title: songObj.song, artist: songArtist, id: songObj.id })
        }

        this.setState({ recs: tmpArray })
      })
      .catch(err => console.log('Request Failed', err))
      .finally((this.setState({value: ''})));
    
  }
  
  render() {

    const { value, recs } = this.state;

    return (
      <div className="SongRec" style={{ marginLeft: "30px" }}>
        <nav>
          <p className="nav-header">SongRec</p>
        </nav>
        <h2 style={{ margin: "0px" }}>Find me songs similar to:</h2>
        <MusicForm onSubmit={this.handleSubmit} onChange={this.handleChange} value={value} />
        <ul style={{ listStyle: "none", padding: "0px" }}>
          {recs.map(song => <li key={song.id}>{song.title + " by " + song.artist}</li>)}
        </ul>
      </div>
    );
  }

}

export default SongRec;
