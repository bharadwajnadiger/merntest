import React, { Component } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MainRouter from '../MainRouter'
import {BrowserRouter} from 'react-router-dom';
const App = ({ children }) => (
  <>
    <Header />

    <main>
      {children}
    </main>
    <BrowserRouter>

          <MainRouter/>

      </BrowserRouter>
    <Footer />
  </>
);

export default App;
