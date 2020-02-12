import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { TextStyles, TextCaption, TextDensed, TextBody, TextLabel2, TextLabel1, TextTitle1, TextTitle3 } from 'openland-web/utils/TextStyles';
import { XView } from 'react-mental';

export default withApp('Typography', 'viewer', props => {
    return (
        <DevDocsScaffold title="Typography">
            <XView>
                <XView flexDirection="column">
                    <XView {...TextStyles.Title1}>XView Title1</XView>
                    <XView {...TextStyles.Title3}>XView Title2</XView>
                    <XView {...TextStyles.Label1}>XView Label1</XView>
                    <XView {...TextStyles.Label2}>XView Label2</XView>
                    <XView {...TextStyles.Body}>XView Body</XView>
                    <XView {...TextStyles.Densed}>XView Densed</XView>
                    <XView {...TextStyles.Caption}>XView Caption</XView>
                </XView>
                <XView flexDirection="column">
                    <div className={TextTitle1}>Linaria Title1</div>
                    <div className={TextTitle3}>Linaria Title2</div>
                    <div className={TextLabel1}>Linaria Label1</div>
                    <div className={TextLabel2}>Linaria Label2</div>
                    <div className={TextBody}>Linaria Body</div>
                    <div className={TextDensed}>Linaria Densed</div>
                    <div className={TextCaption}>Linaria Caption</div>
                </XView>
            </XView>
        </DevDocsScaffold>
    );
});
