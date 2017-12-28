import * as React from 'react';
import { Permit, withPermitsPagedQuery } from '../../../api/Permits';
import { withPage } from '../../../components/withPage';
import { Segment } from 'semantic-ui-react';
import { withPagedList } from '../../../components/withPagedList';
import { XContainer } from '../../../components/X/XContainer';
import { ListPermits } from '../../../components/ListPermits';

const PermitsItems = withPagedList<Permit>((props) => <ListPermits permits={props.items} />);

export default withPage(withPermitsPagedQuery((props) => {
    return (
        <div style={{ paddingBottom: 32, paddingTop: 32 }}>
            <XContainer wide={true}>
                <Segment>
                    <PermitsItems data={props.data} filter={true} />
                </Segment>
            </XContainer>
        </div>
    );
}));