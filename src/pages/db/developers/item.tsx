import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { withDeveloperQuery } from '../../../api/Developers';
import { withLoader } from '../../../components/withLoader';
import { XContainer } from '../../../components/X/XContainer';
import { Segment } from 'semantic-ui-react';
import { XButton } from '../../../components/X/XButton';
import { XWriteAcces } from '../../../components/X/XWriteAccess';

export default withPage(withDeveloperQuery(withLoader((props) => {
    return (
        <React.Fragment>
            <div style={{ paddingTop: 32, paddingBottom: 32 }}>
                <XContainer wide={true}>
                    <Segment>
                        <XWriteAcces>
                            <XButton content="Edit" icon="edit" path={'/developers/' + props.data.developer.slug + '/edit'} />
                        </XWriteAcces>
                        <div>Slug: {props.data.developer.slug}</div>
                        <div>Title: {props.data.developer.title}</div>
                        {props.data.developer.comments && (<div>Comments: {props.data.developer.comments}</div>)}
                    </Segment>
                </XContainer>
            </div>
        </React.Fragment>
    );
})));