import React, { useCallback, useRef, useState, useMemo, useEffect, Component } from "react";
import { useCallbackRef } from 'use-callback-ref' 
import { Container, Row, Col } from 'react-bootstrap';
import "./audioplayer.css";
import  Country from "../Assets/country.mp3"
import WaveSurfer from 'wavesurfer.js';
import { WaveformContianer, Wave, PlayButton } from './waveform.styled';
// import { WaveSurfer, WaveForm } from "wavesurfer-react";
// import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min";



class AudioPlayer extends Component {  
  state = { playing: false };
  constructor(props){
    super(props)
    this.props=props
  }
  componentDidMount() {
    const track = document.querySelector('#track');
    let peaks = [0.0218, 0.0183, 0.0165, 0.0198, 0.2137, 0.2888, 0.2313, 0.15, 0.2542, 0.2538, 0.2358, 0.1195, 0.1591, 0.2599, 0.2742, 0.1447, 0.2328, 0.1878, 0.1988, 0.1645, 0.1218, 0.2005, 0.2828, 0.2051, 0.1664, 0.1181, 0.1621, 0.2966, 0.189, 0.246, 0.2445, 0.1621, 0.1618, 0.189, 0.2354, 0.1561, 0.1638, 0.2799, 0.0923, 0.1659, 0.1675, 0.1268, 0.0984, 0.0997, 0.1248, 0.1495, 0.1431, 0.1236, 0.1755, 0.1183, 0.1349, 0.1018, 0.1109, 0.1833, 0.1813, 0.1422, 0.0961, 0.1191, 0.0791, 0.0631, 0.0315, 0.0157, 0.0166, 0.0108]
    let audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    
    
    
    this.waveform = WaveSurfer.create({
      container: '#waveform',
      backend: 'MediaElement',
      xhr: { mode: 'no-cors' },
      drawingContextAttributes: {desynchronized: true},
      forceDecode: true,
      responsive: true,
      height: 80,
      barWidth: 2,
      barHeight: 4.5,
      waveColor: '#51555E',
      cursorWidth: 3,
      cursorColor: '#E3C06D',
      progressColor: '#51555E',
    });
    
    this.waveform.load(track);
    this.waveform.on('waveform-ready',()=> console.log(`We Ready`))
  };
  
  
  handlePlay = () => {
    this.setState({ playing: !this.state.playing });
    this.waveform.playPause();
  };
  
  
  render() {
  // console.log(this.props, "==================================================================")
    const url = this.props.url? this.props.url : Country
    return  (
      <WaveformContianer>
        <PlayButton onClick={this.handlePlay} >
          {!this.state.playing ? 'Play' : 'Pause'}
        </PlayButton>
        <Wave id="waveform" />
        <audio id="track" src={url} />
      </WaveformContianer>
    );
  }
};

export default AudioPlayer;



// export default function AudioPlayer(url){

//   const [waveform, setWaveform] = useState(false)
//   const [update, setUpdate] = useState()
  
//   const rerender = () => setUpdate({})

  
//   const plugins = useMemo(() => {
//     return [
//       { plugin: TimelinePlugin,
//         options: { 
//           container: "#timeline",
//           // primaryColor: "#E3C06D",
//           // secondaryColor: "#E3C06D",
//           // primaryFontColor: "#E3C06D",
//           }
//       }
//     ].filter(Boolean);
//   }, []);

//   const switchWaveform = (Waveform) => setWaveform(!waveform) 

//   const wavesurferRef = useCallbackRef(false, ()=> {
//     // wavesurferRef.current.load(Country);
//     wavesurferRef.current.load('https://consilium.s3-us-west-2.amazonaws.com/f347077a81a14fa5beae990bdd8d6220.wav');
//     wavesurferRef.current.on("waveform-ready", () => console.log("WaveSurfer is ready"));
//     rerender()
//   });
  
//   const handleWSMount = useCallback(function(waveSurfer){
//     wavesurferRef.current = waveSurfer;
//     },[]
//     );
    
//   //   useEffect(()=>{
//   //   // wavesurferRef.current.load(url);
//   //   wavesurferRef.current.load('https://consilium.s3-us-west-2.amazonaws.com/01+Country+Idea+Demo+(It+works).mp3');
//   //   wavesurferRef.current.on("ready", () => console.log("WaveSurfer is ready"));
//   // },[wavesurferRef, url])

//   let xhr = { 
//     mode: 'no-cors',
//     // method: 'GET',
//   // credentials: 'same-origin',
//   // redirect: 'follow',
//   // referrer: 'client',
//   // headers: [{ key: 'Authorization', value: 'my-token' }]
//   };

//   const play = () => wavesurferRef.current.playPause()

//   return (

//     <Container id="audio-player">
//       <Row>
//         <button onClick={play}>Play / Pause</button>
//         <WaveSurfer 
//           plugins={plugins} 
//           onMount={handleWSMount}
//           mediaContainer={waveform} 
//           >
//             <WaveForm
//             xhr={xhr}
//             waveColor={'#51555E'} 
//             progressColor={'#E3C06D'}
//             cursorColor={'#E3C06D'}
//             barHeight={4.5}
//             minBarHeight={4.5}
//             barWidth={2}
//             // barGap={1}
//             barRadius={3}
//             responsive={true}
//             maxCanvasWidth={8000}
//             responsive={true}
//             backend={'MediaElement'}
//             preload={'auto'}
//             id="waveform" 
//             />
  
//           <div id="timeline" />
//         </WaveSurfer>
//       </Row>
//     </Container>

//   );
// }