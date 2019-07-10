import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XVertical2 } from 'openland-x/XVertical2';
import { XView } from 'react-mental';
import { XText, Mode } from 'openland-web/components/XText';

export default withApp('UI Framework - Typograpthy', 'viewer', props => {
    return (
        <DevDocsScaffold title="Typography">
            <XContent>
                <XVertical2>
                    <XView marginTop={24}>
                        <XText mode={Mode.TitleOne}>Title 1 — Bold 24/32</XText>
                    </XView>
                    <XView marginTop={24}>
                        <XText mode={Mode.TitleTwo}>Title 2 — Bold 17/24</XText>
                    </XView>
                    <XView marginTop={24}>
                        <XText mode={Mode.LabelSemicolumn}>Label — Semibold 15/24</XText>
                    </XView>
                    <XView marginTop={24}>
                        <XText mode={Mode.BodyRegular}>Body — Regular 15/24</XText>
                    </XView>
                    <XView marginTop={24}>
                        <XText mode={Mode.DensedRegular}>Densed — Regular 14/20</XText>
                    </XView>
                    <XView marginTop={24}>
                        <XText mode={Mode.CaptionRegular}>Caption — Regular 13/18</XText>
                    </XView>
                </XVertical2>
            </XContent>
        </DevDocsScaffold>
    );
});
