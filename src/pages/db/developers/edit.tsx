import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { withDeveloperAlter } from '../../../api/Developers';
import { withLoader } from '../../../components/withLoader';
import { Segment } from 'semantic-ui-react';
import { XForm, XFormField, XFormSubmit } from '../../../components/X/XForm';
import { XContainer } from '../../../components/X/XContainer';
import { ImageUpload } from '../../../components/X/ImageUpload';
export default withPage(withDeveloperAlter(withLoader((props) => {
    return (
        <div style={{ paddingTop: 32, paddingBottom: 32 }}>
            <XContainer wide={true}>
                <Segment>
                    <XForm
                        defaultValues={{ title: props.data.developer.title, comments: props.data.developer.comments }}
                        mutate={props.mutate!!}
                        afterPath={'/developers/' + props.data.developer.slug}
                    >
                        <ImageUpload />
                        <XFormField hint="Developer Title" name="title" />
                        <XFormField hint="Comments" name="comments" />
                        <XFormSubmit title="Save" />
                    </XForm>
                </Segment>
            </XContainer>
        </div>
    );
})));