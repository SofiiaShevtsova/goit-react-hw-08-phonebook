import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import { store, persistor } from 'redux/reduxStore';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Chakra } from 'components/theme';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
      <BrowserRouter basename='/goit-react-hw-08-phonebook/'>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Chakra>
            <App />
            </Chakra>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    
  </React.StrictMode>
);
