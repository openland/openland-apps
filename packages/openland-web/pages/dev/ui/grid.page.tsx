import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import glamorous from 'glamorous';
import { XContent } from 'openland-x-layout/XContent';
import XStyles from 'openland-x/XStyles';
import { XTitle } from 'openland-x/XTitle';
import { XVertical2 } from 'openland-x/XVertical2';

const Small = glamorous.div({
    width: XStyles.paddings.small,
    height: XStyles.paddings.small,
    backgroundColor: '#522BFF',
});

const Medium = glamorous.div({
    width: XStyles.paddings.medium,
    height: XStyles.paddings.medium,
    backgroundColor: '#522BFF',
});

const Large = glamorous.div({
    width: XStyles.paddings.large,
    height: XStyles.paddings.large,
    backgroundColor: '#522BFF',
});

const XLarge = glamorous.div({
    width: XStyles.paddings.xlarge,
    height: XStyles.paddings.xlarge,
    backgroundColor: '#522BFF',
});

export default withApp('UI Framework - Typograpthy', 'viewer', props => {
    return (
        <DevDocsScaffold title="Typography">
            <XContent>
                <XVertical2>
                    <XTitle>XLarge</XTitle>
                    <div>24px, padding between content and side of a container</div>
                    <XLarge />
                    <XTitle>Large</XTitle>
                    <div>
                        16px, common padding between group of components. For example, between
                        components in XVertical.
                    </div>
                    <Large />
                    <XTitle>Medium</XTitle>
                    <div>8px, common padding between components.</div>
                    <Medium />
                    <XTitle>Small</XTitle>
                    <div>4px, grid step, can be used to fine grained design improvements</div>
                    <Small />
                </XVertical2>
            </XContent>
        </DevDocsScaffold>
    );
});
