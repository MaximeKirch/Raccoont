import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import { Provider } from 'react-redux'
import store from './reducers/store';


// Dev tools 
import App from './App';
import { getUsers } from './actions/users.actions';
import { getPosts } from './actions/post.actions';



const root = ReactDOM.createRoot(document.getElementById('root'));

store.dispatch(getUsers())
store.dispatch(getPosts())

root.render(
  <Provider store={store}>
      <App/>
    </Provider>
);

