import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { withSampleTask, withFolderExportTask } from '../../../api';
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

const FolderExportTask = withFolderExportTask((props) => {

    const exportCVS = (downloadLink: string, folderName: string) => {
       
        var link = document.createElement('a');

        // TODO replace with actual downloadLink
        link.setAttribute('href', downloadLink);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            {props.task.status !== 'COMPLETED' && <XButton onClick={() => props.task.startTask({ folderId: 'NjZ8Zg' })} text="Export" alignSelf="flex-start" loading={props.task.status === 'IN_PROGRESS'} />}
            {props.task.status === 'COMPLETED' && <XButton onClick={() => exportCVS(props.task.result!!.downloadLink, 'folder')} text={'Download folder.csv'} alignSelf="flex-start" />}
        </>
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
                    <FolderExportTask />
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});