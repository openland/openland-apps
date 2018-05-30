import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { withSampleTask } from '../../../api';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';

const SampleTask = withSampleTask((props) => {
    return (
        <XVertical>
            {props.task.status}
            {props.task.result && JSON.stringify(props.task.result)}
            <XButton onClick={() => props.task.startTask({})} text="Start Task" alignSelf="flex-start" />
        </XVertical>
    );
});

export default withApp('UI Framework - Tasks', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Tasks">
            <XContent>
                <SampleTask />
            </XContent>
        </DevDocsScaffold>
    );
});