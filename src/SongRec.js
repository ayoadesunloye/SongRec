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
        let dataArray = [];

        for (let i = 0; i < data[1].length; i++) {
           dataArray.push(data[1][i]);
        }
        console.log(dataArray)
        console.log(dataArray[0]["1"].song);

      //   for (let i = 0; i < data[0].length; i++) {
      //     tmpArray.push({ title: data[0]., artist: "", id: "" })
      //   }

      //   this.setState({
      //     recs: tmpArray
      // })

      })
      .catch(err => console.log('Request Failed', err))
      .finally((this.setState({value: ''})));
    
  }
  
  render() {

    const { value, recs } = this.state;

    return (
      <div className="SongRec">
        <nav>
          <p className="nav-header">SongRec</p>
        </nav>
        <h2 style={{ margin: "0px" }}>Find me songs similar to:</h2>
        <MusicForm onSubmit={this.handleSubmit} onChange={this.handleChange} value={value} />
        <ul>
          {recs.map(song => <li key="">{song}</li>)}
        </ul>
      </div>
    );
  }

}

export default SongRec;
