import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XVertical } from 'openland-x-layout/XVertical';
import { XTitle } from 'openland-x/XTitle';
import { emoji } from 'openland-y-utils/emoji';

export default withApp('UI Framework - Files', 'viewer', props => {
    return (
        <DevDocsScaffold title="Files">
            <XContent>
                <XVertical>
                    <XTitle>Simple</XTitle>
                    <span>
                        {emoji({
                            src: ':unicorn:🦄🌈👷🏽‍♂️',
                            size: 14,
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
                            size: 44,
                        })}
                    </span>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});
