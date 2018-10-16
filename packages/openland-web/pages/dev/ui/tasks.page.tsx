import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { withSampleTask } from '../../../api/withSampleTask';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { XModal } from 'openland-x-modal/XModal';
import { XTitle } from 'openland-x/XTitle';
import { XLoader } from 'openland-x/XLoader';

const SampleTask = withSampleTask((props) => {
    return (
        <XVertical>
            {props.task.status}
            {props.task.result && JSON.stringify(props.task.result)}
            <XButton onClick={() => props.task.startTask({ value: 10 })} text="Start Task" alignSelf="flex-start" />
        </XVertical>
    );
});

const SampleTaskContent = withSampleTask<{ value: number }>((props) => {
    props.task.startTask({ value: props.value });
    return (
        <XVertical minHeight={props.task.status === 'IN_PROGRESS' ? 100 : undefined}>
            <XLoader loading={props.task.status === 'IN_PROGRESS'} />
            {props.task.status === 'COMPLETED' && <pre>{JSON.stringify(props.task.result)}</pre>}
            {props.task.status === 'FAILED' && <span>Failed!</span>}
        </XVertical>
    );
});

export default withApp('UI Framework - Tasks', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Tasks">
            <XContent>
                <XVertical>
                    <XTitle>Simple Example</XTitle>
                    <SampleTask />
                    <XTitle>Modal Example</XTitle>
                    <XModal target={<XButton text="Start Task In Modal" />} title="Doing complex multiplications..." closeOnClick={false}>
                        <SampleTaskContent value={400} />
                    </XModal>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});