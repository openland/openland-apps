import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XVertical2 } from 'openland-x/XVertical2';
import { XView } from 'react-mental';
import { XText } from 'openland-web/components/XText';

export default withApp('UI Framework - Typograpthy', 'viewer', props => {
    return (
        <DevDocsScaffold title="Typography">
            <XContent>
                <XVertical2>
                    <XView marginTop={24}>
                        <XText mode="TitleOne">Title 1 — Bold 24/32</XText>
                    </XView>
                    <XView marginTop={24}>
                        <XText mode="TitleTwo">Title 2 — Bold 17/24</XText>
                    </XView>
                    <XView marginTop={24}>
                        <XText mode="LabelSemicolumn">Label — Semibold 15/24</XText>
                    </XView>
                    <XView marginTop={24}>
                        <XText mode="BodyRegular">Body — Regular 15/24</XText>
                    </XView>
                    <XView marginTop={24}>
                        <XText mode="DensedRegular">Densed — Regular 14/20</XText>
                    </XView>
                    <XView marginTop={24}>
                        <XText mode="CaptionRegular">Caption — Regular 13/18</XText>
                    </XView>
                </XVertical2>
            </XContent>
        </DevDocsScaffold>
    );
});
