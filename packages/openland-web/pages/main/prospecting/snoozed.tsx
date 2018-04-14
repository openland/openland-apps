import '../../../globals';
import * as React from 'react';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { OpportunitiesTable } from '../../../components/OpportunitiesTable';
import { ProspectingNavigation } from '../../../components/ProspectingNavigation';
import { XHeader } from '../../../components/X/XHeader';
import { Scaffold } from '../../../components/Scaffold';

export default withApp('Snoozed opportunities', 'viewer', () => {
    return (
        <>
            <XHead title="Snoozed opportunities" />
            <Scaffold>
                <Scaffold.Content bottomOffset={true}>
                    <ProspectingNavigation />

                    <XHeader text="Snoozed opportinities" />
                    <OpportunitiesTable variables={{ state: 'SNOOZED' }}>
                        <XCard.Empty text="No snoozed parcels" icon="sort" />
                    </OpportunitiesTable>

                </Scaffold.Content>
            </Scaffold>
        </>
    );
});