import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { withDeveloperAlter } from '../../../api/Developers';
import { withLoader } from '../../../components/withLoader';
import { Segment } from 'semantic-ui-react';
import { XForm, XFormField } from '../../../components/X/XForm';
import { XContainer } from '../../../components/X/XContainer';

export default withPage(withDeveloperAlter(withLoader((props) => {
    return (
        <React.Fragment>
            <div style={{ paddingTop: 32, paddingBottom: 32 }}>
                <XContainer wide={true}>
                    <Segment>
                        <XForm
                            defaultValues={{ title: props.data.developer.title }}
                            mutate={props.mutate!!}
                            afterPath={'/developers/' + props.data.developer.slug}
                        >
                            <XFormField hint="Developer Title" name="title" />
                        </XForm>
                    </Segment>
                </XContainer>
            </div>
        </React.Fragment>
    );
})));