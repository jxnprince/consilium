import React from 'react'
import styled from 'styled-components'

export const WaveformContianer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100%;
  overflow: scroll;
  background: transparent;
`;

export const Wave = styled.div`
  width: 100%;
  height: 10vh;
`;

export const PlayButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4vh;
  height: 4vh;
  background: #51555E;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin: 1vh;
  &:hover {
    background: #9094A2;
    color: "#E3C06D"
  }
  &:active {
    color: "#E3C06D"
  }
`;