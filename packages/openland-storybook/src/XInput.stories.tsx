import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { XInputBasic } from 'openland-x/basics/XInputBasic';

storiesOf('XInput', module).add(
    'inputs',
    () => <XInputBasic title="hello" onChange={value => console.log('new value', value)} />,
    {
        info: { inline: true },
    },
);
