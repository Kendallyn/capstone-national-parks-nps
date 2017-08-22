import React from 'react';
import {shallow} from 'enzyme';


import Intro from './components/intro';


describe('<Intro />', () => {
    it('Renders without crashing', () => {
        shallow(<Intro />);
                });
    });
