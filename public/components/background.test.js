import React from 'react';
import {shallow} from 'enzyme';

import Background from './components/background';

describe('<Background />', () => {
    it('Renders without crashing', () => {
        shallow(<Background />);
                });
    });
