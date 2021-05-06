import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import { setModalMount } from './store/modal'
import './index.css';
import App from './App';
import configureStore from './store/index'

const store = configureStore();

const Root =  () => {
  const dispatch = useDispatch()
  const modalMooringRef = useRef(null)

  useEffect(()=> {
    dispatch(setModalMount(modalMooringRef.current))
  }, [dispatch]);


  return (
  <>
    <App />
    <div ref={modalMooringRef} className='modal' />
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
