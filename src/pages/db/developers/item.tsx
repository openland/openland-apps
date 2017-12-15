import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { withDeveloperQuery } from '../../../api/Developers';
import { withLoader } from '../../../components/withLoader';
import { XContainer } from '../../../components/X/XContainer';
import { Segment } from 'semantic-ui-react';
import { XButton } from '../../../components/X/XButton';
import { XWriteAcces } from '../../../components/X/XWriteAccess';
import { XLink } from '../../../components/X/XLink';
import { XEnumeration } from '../../../components/X/XEnumerations';

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
                        <div>Projects: <XEnumeration>{props.data.developer.buildingProjects.map((p) => (
                            <XLink path={'/projects/' + p.slug}>{p.name}</XLink>
                        ))}</XEnumeration></div>
                    </Segment>
                </XContainer>
            </div>
        </React.Fragment>
    );
})));