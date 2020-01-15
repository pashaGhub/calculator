import React from 'react';
import { Calculator } from './components/Calculator';
import { Requirements } from './components/Requirements';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className='cont'>
      <Calculator />
      <Requirements />
    </div>
  );
};

export default App;
