import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, Typograph } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import logo from './logo.svg';
import { 
  Home,
  NavLinks,
  NewNote,
  AllNotes,
  Events,
  People,
  Places,
  Things,
  Families,
  Organizations
} from './components';
import './App.css';

function App() {
  const [view, setView] = useState('home');

  const renderView = () => {
    switch(view) {
      case 'home':
        return <Home />;
      case 'newNote':
        return <NewNote />
      case 'allNotes':
        return <AllNotes />
      case 'events':
        return <Events />;
      case 'people':
        return <People />;
        case 'places':
          return <Places />;
        case 'things':
          return <Things />;
        case 'families':
          return <Families />;
        case 'organizations':
          return <Organizations />;
      default:
        return <Home />;
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <div id="hleft">

        </div>
        <div id="hcent">
          <p id="htitle">D&D Notes-App</p>  
        </div>
        <div id ="hright">
          <div id = "user-profile">

          </div>
        </div>
      </header>
      <div className="App-body">
        <div id="bcont">
          <div id="bleft">
            <NavLinks setView={setView} />
          </div>
          <div id="bcent">
            {renderView()}
          </div>
          <div id="bright">

          </div>
        </div>
        
      </div>
    </div>
  );
}

export default App;
