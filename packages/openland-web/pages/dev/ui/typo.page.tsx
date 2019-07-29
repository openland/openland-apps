import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { TextStyles, TextCaption, TextDensed, TextBody, TextLabel2, TextLabel1, TextTitle1, TextTitle2 } from 'openland-web/utils/TextStyles';
import { XView } from 'react-mental';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';

export default withApp('Typography', 'viewer', props => {
    return (
        <DevDocsScaffold title="Typography">
            <XHorizontal>
                <XVertical>
                    <XView {...TextStyles.title1}>XView Title1</XView>
                    <XView {...TextStyles.title2}>XView Title2</XView>
                    <XView {...TextStyles.label1}>XView Label1</XView>
                    <XView {...TextStyles.label2}>XView Label2</XView>
                    <XView {...TextStyles.body}>XView Body</XView>
                    <XView {...TextStyles.densed}>XView Densed</XView>
                    <XView {...TextStyles.caption}>XView Caption</XView>
                </XVertical>
                <XVertical>
                    <div className={TextTitle1}>Linaria Title1</div>
                    <div className={TextTitle2}>Linaria Title2</div>
                    <div className={TextLabel1}>Linaria Label1</div>
                    <div className={TextLabel2}>Linaria Label2</div>
                    <div className={TextBody}>Linaria Body</div>
                    <div className={TextDensed}>Linaria Densed</div>
                    <div className={TextCaption}>Linaria Caption</div>
                </XVertical>
            </XHorizontal>
        </DevDocsScaffold>
    );
});