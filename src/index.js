import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import order from './store/order';
import { configureStore } from '@reduxjs/toolkit';
import auth from './store/auth';

const store = configureStore({
  reducer: {
  order: order,
  auth: auth, 
}})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();