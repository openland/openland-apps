import '../../../globals';
import * as React from 'react';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { OpportunitiesTable } from '../../../components/OpportunitiesTable';
import { ProspectingNavigation } from '../../../components/ProspectingNavigation';
import { XHeader } from '../../../components/X/XHeader';
import { Scaffold } from '../../../components/Scaffold';

export default withApp('Approved opportunities', 'viewer', () => {
    return (
        <>
            <XHead title="Approved opportunities" />
            <Scaffold>
                <Scaffold.Content bottomOffset={true} padding={false}>
                    <ProspectingNavigation />
                    <XHeader text="Approved opportinities" />
                    <OpportunitiesTable variables={{ state: 'APPROVED' }}>
                        <XCard.Empty text="No approved parcels" icon="sort" />
                    </OpportunitiesTable>

                </Scaffold.Content>
            </Scaffold>
        </>
    );
});