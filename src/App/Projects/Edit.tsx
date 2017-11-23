import * as React from 'react';
import { withLoader } from '../Components/withLoader';
import { withProjectEdit } from '../../api/';
import * as C from '../Components';

const ViewRender = withProjectEdit(withLoader((props) => {
    console.warn(props.data.project);
    return (
        <C.Page title={'Edit ' + props.data.project.name}>
            <C.Header title="Projects" subtitle={props.data.project.name} />
            <C.Background />
            <C.Content>
                <C.Form mutation={props.mutate!!} default={props.data.project} onComplete={() => props.history.push('/projects/' + props.data.project.slug)}>
                    <C.Section>
                        <div className="st-page--text">
                            <C.FormState />
                            <h2>Name Of Project</h2>
                            <C.FormText name="name" />
                            <h2>Intro to project</h2>
                            <C.FormMarkdown name="intro" />
                            <h2>Project Findings</h2>
                            <C.FormMarkdown name="findings" />
                            <h2>Project Description</h2>
                            <C.FormMarkdown name="description" />
                            <h2>Outputs</h2>
                            <C.FormLinks name="outputs" />
                            <h2>Sorting</h2>
                            <C.FormText name="sortKey" />
                        </div>
                    </C.Section>
                    <C.Section>
                        <C.FormSubmit name="Save" />
                    </C.Section>
                </C.Form>
            </C.Content>
        </C.Page>
    );
}));

export default ViewRender;