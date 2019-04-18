import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XTitle } from 'openland-x/XTitle';
import { emoji } from 'openland-y-utils/emoji';
import { XVertical2 } from 'openland-x/XVertical2';

export default withApp('UI Framework - Files', 'viewer', props => {
    return (
        <DevDocsScaffold title="Files">
            <XContent>
                <XVertical2>
                    <XTitle>Simple</XTitle>
                    <span>
                        {emoji({
                            src: ':unicorn:🦄🌈👷🏽‍♂️',
                            size: 16,
                        })}
                    </span>
                    <span>
                        {emoji({
                            src: '🦄🌈👷🏽‍♂️',
                            size: 18,
                        })}
                    </span>
                    <span>
                        {emoji({
                            src: '🦄🌈👷🏽‍♂️',
                            size: 38,
                        })}
                    </span>
                </XVertical2>
            </XContent>
        </DevDocsScaffold>
    );
});
