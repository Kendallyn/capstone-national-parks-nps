import React from 'react';
import {shallow} from 'enzyme';

import HowItWorks from './components/howitworks';

describe('<HowItWorks />', () => {
    it('Renders without crashing', () => {
        shallow(<HowItWorks />);
                });
    });
