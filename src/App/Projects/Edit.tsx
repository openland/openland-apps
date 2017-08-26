import * as React from 'react';
import { withLoader } from '../Components/withLoader';
import { withProjectQuery } from '../../api/';
import * as C from '../Components';
import { Editor, EditorState } from 'draft-js';

const ViewRender = withProjectQuery(withLoader((props) => {
    return (
        <C.Page>
            <C.Header title="Projects" subtitle={props.data.project.name} />
            <C.Background />
            <C.Content>
                <Editor editorState={EditorState.createEmpty()} onChange={() => 1 + 1} />
            </C.Content>
        </C.Page>
    );
}));

export default ViewRender;