import React, { Component } from 'react';

import Header from '../ui/Header';
import Footer from '../ui/Footer';

const App = ({ children }) => (
  <div>
    <Header />

    <main>
      {children}
    </main>

    <Footer />
  </div>
);

export default App;
