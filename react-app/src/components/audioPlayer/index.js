import React, { useCallback, useRef, useState, useMemo, useEffect } from "react";
import { useCallbackRef } from 'use-callback-ref' 
import { WaveSurfer, WaveForm } from "wavesurfer-react";
import { Container, Row, Col } from 'react-bootstrap';
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min";
import "./audioplayer.css";
import  Country from "../Assets/country.mp3"

export default function AudioPlayer(url){

  const [waveform, setWaveform] = useState(false)
  const [update, setUpdate] = useState()
  
  const rerender = () => setUpdate({})

  
  const plugins = useMemo(() => {
    return [
      { plugin: TimelinePlugin,
        options: { 
          container: "#timeline",
          // primaryColor: "#E3C06D",
          // secondaryColor: "#E3C06D",
          // primaryFontColor: "#E3C06D",
          }
      }
    ].filter(Boolean);
  }, []);

  const switchWaveform = (Waveform) => setWaveform(!waveform) 

  const wavesurferRef = useCallbackRef(false, ()=> {
    // wavesurferRef.current.load(Country);
    wavesurferRef.current.load('https://consilium.s3-us-west-2.amazonaws.com/f347077a81a14fa5beae990bdd8d6220.wav');
    wavesurferRef.current.on("waveform-ready", () => console.log("WaveSurfer is ready"));
    rerender()
  });
  
  const handleWSMount = useCallback(function(waveSurfer){
    wavesurferRef.current = waveSurfer;
    },[]
    );
    
  //   useEffect(()=>{
  //   // wavesurferRef.current.load(url);
  //   wavesurferRef.current.load('https://consilium.s3-us-west-2.amazonaws.com/01+Country+Idea+Demo+(It+works).mp3');
  //   wavesurferRef.current.on("ready", () => console.log("WaveSurfer is ready"));
  // },[wavesurferRef, url])

  let xhr = { 
    mode: 'no-cors',
    // method: 'GET',
  // credentials: 'same-origin',
  // redirect: 'follow',
  // referrer: 'client',
  // headers: [{ key: 'Authorization', value: 'my-token' }]
  };

  const play = () => wavesurferRef.current.playPause()

  return (

    <Container id="audio-player">
      <Row>
        <button onClick={play}>Play / Pause</button>
        <WaveSurfer 
          plugins={plugins} 
          onMount={handleWSMount}
          mediaContainer={waveform} 
          >
            <WaveForm
            xhr={xhr}
            waveColor={'#51555E'} 
            progressColor={'#E3C06D'}
            cursorColor={'#E3C06D'}
            barHeight={4.5}
            minBarHeight={4.5}
            barWidth={2}
            // barGap={1}
            barRadius={3}
            responsive={true}
            maxCanvasWidth={8000}
            responsive={true}
            backend={'MediaElement'}
            preload={'auto'}
            id="waveform" 
            />
  
          <div id="timeline" />
        </WaveSurfer>
      </Row>
    </Container>

  );
}