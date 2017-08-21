import React from 'react';
import {shallow} from 'enzyme';


import Intro from './components/intro';
import HowItWorks from './components/howitworks';
import Instructions from './components/instructions';
import Background from './components/background';


describe('<Intro />', () => {
    it('Renders without crashing', () => {
        shallow(<Intro />);
                });
    });

describe('<HowItWorks />', () => {
    it('Renders without crashing', () => {
        shallow(<HowItWorks />);
                });
    });

describe('<Instructions />', () => {
    it('Renders without crashing', () => {
        shallow(<Instructions />);
                });
    });

describe('<Background />', () => {
    it('Renders without crashing', () => {
        shallow(<Background />);
                });
    });
