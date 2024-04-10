import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import { App } from './pages/App';
import reportWebVitals from './reportWebVitals';
import UserContextProvider from './context/authcontext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

//axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;



root.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
