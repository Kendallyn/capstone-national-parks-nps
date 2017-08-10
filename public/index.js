require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';

import Intro from './components/intro';
import HowItWorks from './components/howitworks';



document.addEventListener('DOMContentLoaded', () =>
                          ReactDOM.render(<Intro />,
                          document.getElementById('reactIntro')) );

document.addEventListener('DOMContentLoaded', () =>
                          ReactDOM.render(<HowItWorks />,
                                          document.getElementById('reactHowItWorks')) );

