import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from '../../../components/DevDocsScaffold';
import { XVertical } from '../../../components/X/XVertical';
import glamorous from 'glamorous';
import XStyles from '../../../components/X/XStyles';
import { XCard } from '../../../components/X/XCard';
import { XTitle } from '../../../components/X/XTitle';

const Small = glamorous.div({
    width: XStyles.paddings.small,
    height: XStyles.paddings.small,
    backgroundColor: XStyles.color.primary
});

const Medium = glamorous.div({
    width: XStyles.paddings.medium,
    height: XStyles.paddings.medium,
    backgroundColor: XStyles.color.primary
});

const Large = glamorous.div({
    width: XStyles.paddings.large,
    height: XStyles.paddings.large,
    backgroundColor: XStyles.color.primary
});

const XLarge = glamorous.div({
    width: XStyles.paddings.xlarge,
    height: XStyles.paddings.xlarge,
    backgroundColor: XStyles.color.primary
});

export default withApp('UI Framework - Typograpthy', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Typography">
            <XCard.Content>
                <XVertical>
                    <XTitle>XLarge</XTitle>
                    <div>24px, padding between content and side of a container</div>
                    <XLarge />
                    <XTitle>Large</XTitle>
                    <div>16px, common padding between group of components. For example, between components in XVertical.</div>
                    <Large />
                    <XTitle>Medium</XTitle>
                    <div>8px, common padding between components.</div>
                    <Medium />
                    <XTitle>Small</XTitle>
                    <div>4px, grid step, can be used to fine grained design improvements</div>
                    <Small />
                </XVertical>
            </XCard.Content>
        </DevDocsScaffold>
    );
});