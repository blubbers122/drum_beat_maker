import React from 'react';
import logo from './logo.svg';
import $ from "jquery";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export class BeatMaker extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      notePosition: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
      instrumentBank: [
        {
          drum: "Crash1",
          url: "https://freewavesamples.com/files/Crash-Cymbal-1.wav"
        },
        {
          drum: "Crash2",
          url: "https://freewavesamples.com/files/Crash-Cymbal-2.wav"
        },
        {
          drum: "RideBell",
          url: "https://freewavesamples.com/files/Roland-SC-88-Ride-Bell.wav"
        },
        {
          drum: "Ride",
          url: "https://freewavesamples.com/files/Ride-Cymbal-1.wav"
        },
        {
          drum: "Tom1",
          url: "https://freewavesamples.com/files/Hi-Tom-1.wav"
        },
        {
          drum: "Tom2",
          url: "https://freewavesamples.com/files/Floor-Tom-1.wav"
        },
        {
          drum: "Tom3",
          url: "https://freewavesamples.com/files/Floor-Tom-3.wav"
        },
        {
          drum: "HHOpen",
          url: "https://freewavesamples.com/files/Open-Hi-Hat-1.wav"
        },
        {
          drum: "HHClosed",
          url: "https://freewavesamples.com/files/Closed-Hi-Hat-1.wav"
        },
        {
          drum: "HHPedal",
          url: "https://freewavesamples.com/files/Pedal-Hi-Hat-1.wav"
        },
        {
          drum: "Snare",
          url: "https://freewavesamples.com/files/Roland-R-8-Fat-Snare.wav"
        },
        {
          drum: "Kick",
          url: "https://freewavesamples.com/files/Bass-Drum-1.wav"
        }
      ],
      paused: true,
      selectedNotes: [],
      bpm: 100
    }
   this.handleClick = this.handleClick.bind(this);
   this.handleControls = this.handleControls.bind(this);
   this.prepareBeat = this.prepareBeat.bind(this);
   this.playBeat = this.playBeat.bind(this);
   this.stopBeat = this.stopBeat.bind(this);
  }

  handleClick(drum, url, pos) {
    var currentNote = ("#" + drum + "-" + pos);
    var selectedNotes = this.state.selectedNotes;
    var myAudio = new Audio(url);
    var velocity = $(currentNote).attr("velocity")
    $("#reset").css("animation", "none");

    console.log(velocity)

    if (url == "clear note") {
      $(currentNote).attr("velocity", 0);
      $(currentNote).css("background", "black");
      selectedNotes.splice(selectedNotes.indexOf(currentNote), 1)
    }
    else {
      switch(velocity) {
        case "0":
          $(currentNote).attr("velocity", 4)
          $(currentNote).css("background", "white")
          myAudio.play()
          selectedNotes.push(currentNote)
          break;
        case "1":
          $(currentNote).attr("velocity", 0);
          $(currentNote).css("background", "#000000");
          selectedNotes.splice(selectedNotes.indexOf(currentNote), 1)
          break;
        case "2":
          $(currentNote).attr("velocity", 1);
          $(currentNote).css("background", "#444444");
          myAudio.volume = .25;
          myAudio.play()
          break;
        case "3":
          $(currentNote).attr("velocity", 2);
          $(currentNote).css("background", "#888888");
          myAudio.volume = .50;
          myAudio.play()
          break;
        case "4":
          $(currentNote).attr("velocity", 3);
          $(currentNote).css("background", "#BBBBBB");
          myAudio.volume = .75;
          myAudio.play()
          break;
      }
    }
  }

  handleControls(control) {
    if (control == "stop") {
      this.stopBeat();
      return (
        this.setState({
          paused: true
        })
      )
    }
    else if (control == "start" && this.state.selectedNotes.length > 0) {
      this.prepareBeat();
      return (
        this.setState({
          paused: false
        })
      )
    }
    else if (control == "reset") {//reset
      $("#reset").css("animation", "spin 1s");
      this.stopBeat();
      this.state.selectedNotes.forEach(note => (
        $(note).css("background", "black"),
        $(note).attr("velocity", "0")
      ))
      return (
        this.setState({
          paused: true,
          selectedNotes: [],
          bpm: 100
        })
      )
    }
  }

  changeInput(event) {
    return (
      this.setState({
        bpm: event.target.value
      })
    )
  }

  prepareBeat() {



    this.playBeat()
  }

  playBeat() {
    var state = this.state;
    var beat = [];// holds arrays containing
    var index = -1;
    for (let i = 1; i < 17; i++) {//repeats for each 16th note
      var regex = new RegExp("-" + i.toString() + "$");//for searching for notes on current 16th note
      var noteStack = 0;//items in 2nd array in beat

      for (let j = 0; j < state.selectedNotes.length; j++) {//repeats for each selected note
        var note = state.selectedNotes[j]//current selected note
        if (note.match(regex)) {
          if (noteStack != 0) {//if not first note in stack
            beat[index].push(note);
          }
          else {//if first note in stack
            beat.push([note]);
            index++;
          }
          noteStack++//each match adds an array item
        }
      }
    }

    let count = 0;
    let beatIndex = 0;

    this.timer = setInterval(function () {
      var countRegex = new RegExp("-" + count.toString() + "$");

      if (beat[beatIndex][0].match(countRegex)) {
        for (let x = 0; x < beat[beatIndex].length; x++) {
          let chosenDrum = beat[beatIndex][x].replace("-" + count.toString(), "").replace("#", "")
          var audio = new Audio(state.instrumentBank.find( ({ drum }) => drum === chosenDrum ).url)
          audio.volume = $(beat[beatIndex][x]).attr("velocity") / 4
          audio.play()
        }
        if (beatIndex != beat.length - 1) {
          beatIndex++;
        }
      }
      if (count == 16) {
        count = 0;
        beatIndex = 0;
      }
      console.log(count)
      count++;
    }, 15000 / state.bpm)//repeats each 16th note
  }

  stopBeat() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <>
        <div class="bg-dark text-center p-2" id="instructions-container">
          <h3>Controls</h3>
          <p>Left click to place notes on the grid, multiple clicks adjust the volume of the note. </p>
          <p>Middle click to erase notes.</p>
        </div>
        <div id="beat-maker-container" class="container">
          <h1 id="title" class="mt-3">DRUM BEAT MAKER</h1>
          <div id="beat-count-label" className="row">
            {this.state.notePosition.map(note => (
              <h6 id={"count" + note} className="count">{note}</h6>
            ))}
          </div>
          <div id="labels-and-grid" className="row">
            <div id="labels">
              {this.state.instrumentBank.map((instrument, index) => (
                  <h6 className={"drum-label"}>{instrument.drum}</h6>
              ))
              }
            </div>
            <div id="composer-grid-box" class="container p-0 row">
              {this.state.notePosition.map(pos => (//creates every row
                <Instrument
                  bank={this.state.instrumentBank}
                  handleClick={(drum, url, pos) => this.handleClick(drum, url, pos)}
                  pos={pos} />
              ))}
            </div>
          </div>
          <ControlPanel
            paused={this.state.paused}
            callback={(control) => this.handleControls(control)}
            bpm={this.state.bpm}
            input={this.changeInput.bind(this)}/>
        </div>
      </>
    )
  }
}

const Instrument = props => {
  return (
    <div className="composer-column">
      {props.bank.map(instrument => (//creates every column
        <div
          className="note"
          id={instrument.drum + "-" + props.pos}
          velocity={0}
          onClick={() => props.handleClick(instrument.drum, instrument.url, props.pos)}
          onMouseDown={(event) => event.button == 1 ? props.handleClick(instrument.drum, "clear note", props.pos) : ""}>
        </div>
      ))}
    </div>
  )
}

const ControlPanel = props => {
  return (
    <div id="control-panel-container" className="row">
      { props.paused &&
        <i id="start_stop" onClick={() => props.callback("start")} className="fas fa-play hvr-grow"></i>
      }
      { !props.paused &&
        <i id="start_stop" onClick={() => props.callback("stop")} className="fas fa-pause hvr-grow"></i>
      }
        <i id="reset" onClick={() => props.callback("reset")} className="fas fa-sync-alt hvr-grow"></i>
      <input id="bpm" value={props.bpm} onChange={props.input} maxLength="3" />
      <h6 id="bpm-label">bpm</h6>
    </div>
  )
}
