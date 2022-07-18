import React, { useState, useEffect } from 'react';
import Header from './components/Head';
import Figure from './components/Fig';
import WrongLetters from './components/WrongLetters';
import Word from './components/word';
import Popup from './components/Popup';
import Notification from './components/Notification';

import {showNotification as show} from './helpers/helpers';

import './App.css';
const words = ['AFGHANISTAN',
'ALBANIA',
'ALGERIA',
'ANDORRA',
'ANGOLA',
'ANTIGUA',
'ARGENTINA',
'ARMENIA',
'AUSTRALIA','AUSTRIA','AZERBAIJAN','BAHAMAS','BAHRAIN','BANGLADESH','BARBADOS','BELARUS','BELGIUM','BELIZE','BENIN','BHUTAN','BOLIVIA','BOSNIA','BOTSWANA','BRAZIL','BRUNEI','BULGARIA','BURUNDI',
'CABOVERDE','CAMBODIA','CAMEROON','CANADA','CHAD','CHILE','CHINA','COLOMBIA','COMOROS','CONGO','CROATIA','CUBA','CYPRUS','CZECH',
'DENMARK','DJIBOUTI','DOMINICA','ECUADOR','EGYPT','ERITREA','ESTONIA','ESWATINI','ETHIOPIA','FIJI','FINLAND','FRANCE','GABON','GAMBIA','GEORGIA','GERMANY','GHANA','GREECE','GRENADA','GUATEMALA','GUINEA','GUYANA',
'HAITI','HONDURAS','HUNGARY','ICELAND','INDIA','INDONESIA','IRAN','IRAQ','IRELAND','ISRAEL','ITALY','JAMAICA','JAPAN','JORDAN',
'KAZAKHSTAN','KENYA','KIRIBATI','KOREA','KOSOVO','KUWAIT','KYRGYZSTAN','LAOS','LATVIA','LEBANON','LESOTHO','LIBERIA','LIBYA','LIECHTENSTEIN','LITHUANIA','LUXEMBOURG','MADAGASCAR','MALAWI','MALAYSIA','MALDIVES','MALI','MALTA','MAURITANIA','MAURITIUS','MEXICO','MICRONESIA','MOLDOVA','MONACO','MONGOLIA','MONTENEGRO','MOROCCO','MOZAMBIQUE','MYANMAR','NAMIBIA','NAURU','NEPAL','NETHERLANDS','NEWZEALAND','NICARAGUA','NIGER','NIGERIA','NORTHMACEDONIA','NORWAY','OMAN','QATAR','PAKISTAN','PALAU','PANAMA','PAPUA','PARAGUAY','PERU','PHILIPPINES','POLAND','PORTUGAL','ROMANIA','RUSSIA','RWANDA','SENEGAL','SERBIA','SEYCHELLES','SINGAPORE','SLOVAKIA','SLOVENIA','SOMALIA','SOUTHAFRICA','SPAIN','SRILANKA','SUDAN','SURINAME','SWEDEN','SWITZERLAND','SYRIA','TAIWAN','TAJIKISTAN','TANZANIA','THAILAND','TOGO','TONGA','TUNISIA','TURKEY','TURKMENISTAN','TUVALU','UGANDA','UKRAINE','UNITEDKINGDOM','UNITEDSTATES','URUGUAY','UZBEKISTAN','VANUATU','VATICANCITY','VENEZUELA','VIETNAM','YEMEN','ZAMBIA','ZIMBABWE'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key;
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable]);
  
  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }


  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
       
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} /> 
      <Notification showNotification={showNotification} /> 
    </>
  );
}

export default App;