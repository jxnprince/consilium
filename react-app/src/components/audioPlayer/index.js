import React, { useCallback, useRef, useState, useMemo, useEffect, Component } from "react";
import { useCallbackRef } from 'use-callback-ref' 
import { Container, Row, Col } from 'react-bootstrap';
import "./audioplayer.css";
import  Country from "../Assets/country.mp3"
import WaveSurfer from 'wavesurfer.js';
import { WaveformContianer, Wave, PlayButton } from './waveform.styled';

class AudioPlayer extends Component {  
  state = { playing: false };
  constructor(props){
    super(props)
    this.props=props
  }
  componentDidMount() {
    const track = document.querySelector('#track');
    this.waveform = WaveSurfer.create({
      container: '#waveform',
      backend: 'MediaElement',
      xhr: { mode: 'no-cors' },
      height: 80,
      barWidth: 3.5,
      barHeight: 4.5,
      waveColor: '#51555E',
      cursorWidth: 3,
      cursorColor: '#E3C06D',
      progressColor: '#E3C06D',
      responsive: true,
    });
    
    this.waveform.empty();
    this.waveform.drawBuffer(track);
    this.waveform.load(track);
    this.waveform.on('waveform-ready',()=> console.log(`We Ready`))
  };

  handlePlay = () => {
    this.setState({ playing: !this.state.playing });
    this.waveform.playPause();
  };


  render() {
    const url = this.props.url? this.props.url : Country
    return  (
      <WaveformContianer>
        <PlayButton onClick={this.handlePlay} >
          {!this.state.playing ? <i className="fas fa-play"></i> : <i className="fas fa-pause"></i>}
        </PlayButton>
        <Wave id="waveform" />
        <audio id="track" src={url} />
      </WaveformContianer>
    );
  }
};

export default AudioPlayer;