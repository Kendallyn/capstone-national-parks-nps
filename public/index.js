require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';

import Intro from './components/intro';
import HowItWorks from './components/howitworks';
import Instructions from './components/instructions';
import Background from './components/background';



document.addEventListener('DOMContentLoaded', () =>
                          ReactDOM.render(<Intro />,
                          document.getElementById('reactIntro')) );

document.addEventListener('DOMContentLoaded', () =>
                          ReactDOM.render(<HowItWorks />,
                                          document.getElementById('reactHowItWorks')) );

document.addEventListener('DOMContentLoaded', () =>
                          ReactDOM.render(<Instructions />,
                                          document.getElementById('reactInstructions')) );

document.addEventListener('DOMContentLoaded', () =>
                          ReactDOM.render(<Background />,
                                          document.getElementById('reactBackground')) );

