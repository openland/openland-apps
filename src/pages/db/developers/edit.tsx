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
                            title: props.data.organization.title,
                            comments: props.data.organization.comments,
                            logo: props.data.organization.logo
                        }}
                        mutate={props.mutate!!}
                        afterPath={'/organizations/' + props.data.organization.slug}
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