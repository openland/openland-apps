import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { XStorybookTest } from 'openland-x/XStorybookTest';

storiesOf('Storybook openland-x', module).add('with text', () => <XStorybookTest />, {
    info: { inline: true },
});
