import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { withDeveloperAlter } from '../../../api/Developers';
import { withLoader } from '../../../components/withLoader';
import { Segment } from 'semantic-ui-react';
import { XForm, XFormField, XFormImage, XFormSubmit } from '../../../components/X/XForm';
import { XContainer } from '../../../components/X/XContainer';

export default withPage(withDeveloperAlter(withLoader((props) => {
    return (
        <div style={{paddingTop: 32, paddingBottom: 32}}>
            <XContainer wide={true}>
                <Segment>
                    <XForm
                        defaultValues={{
                            title: props.data.developer.title,
                            comments: props.data.developer.comments,
                            logo: props.data.developer.logo
                        }}
                        mutate={props.mutate!!}
                        afterPath={'/developers/' + props.data.developer.slug}
                    >
                        <XFormField hint="Developer Title" name="title"/>
                        <XFormImage name="logo"/>
                        <XFormField hint="Comments" name="comments"/>
                        <XFormSubmit title="Save"/>
                    </XForm>
                </Segment>
            </XContainer>
        </div>
    );
})));