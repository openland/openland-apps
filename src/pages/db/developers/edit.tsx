import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { withDeveloperAlter } from '../../../api/Developers';
import { withLoader } from '../../../components/withLoader';
import { Segment } from 'semantic-ui-react';
import { XForm, XFormField, XFormImage, XFormSubmit } from '../../../components/X/XForm';
import { XContainer } from '../../../components/X/XContainer';
import { XButton } from '../../../components/X/XButton';

export default withPage(withDeveloperAlter(withLoader((props) => {

    return (
        <div style={{paddingTop: 32, paddingBottom: 32}}>
            <XContainer wide={true}>
                <Segment>
                    <XForm
                        defaultValues={props.data.organization}
                        mutate={props.alter}
                        afterPath={'/organizations/' + props.data.organization.slug}
                    >
                        <XFormField hint="Developer Title" name="title"/>
                        <XFormImage name="logo"/>
                        <XFormField hint="Comments" name="comments"/>
                        <XFormSubmit title="Save"/>
                        <XButton mutation={props.remove} afterPath="/organizations/" negative={true}>Remove</XButton>
                    </XForm>
                </Segment>
            </XContainer>
        </div>
    );
})));