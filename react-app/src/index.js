import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import { setModalMount } from './store/modal'
import './index.css';
import App from './App';
import configureStore from './store/index'
import { MuiThemeProvider } from '@material-ui/core'
import { theme } from './theme'

const store = configureStore();

const Root =  () => {
  const dispatch = useDispatch()
  const modalMooringRef = useRef(null)

  useEffect(()=> {
    dispatch(setModalMount(modalMooringRef.current))
  }, [dispatch]);


  return (
  <>
    {/* <MuiThemeProvider theme={theme}> */}
      <App />
      <div ref={modalMooringRef} className='modal' />
    {/* </MuiThemeProvider> */}
  </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
