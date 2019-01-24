import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { XButton } from './XButton';

describe('XButton', () => {
    it('should render correctly', () => {
        expect(renderer.create(<XButton text="X Button Test" />).toJSON()).toMatchSnapshot();
    });
});