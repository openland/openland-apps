import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { withParcels } from '../../../api/index';
import { AppContent } from '../../../components/App/AppContent';
import { XButton } from '../../../components/X/XButton';
import { XHead } from '../../../components/X/XHead';
import { AppFilters } from '../../../components/App/AppFilters';
import { TableParcels } from '../../../components/TableParcels';

export default withApp('viewer', withParcels((props) => {
    return (
        <>
            <XHead title={['Parcels']} />
            <AppContent>
                <XCard shadow="medium" separators={true}>
                    <XCard.Header text="San Francisco" description={props.data.items.pageInfo.itemsCount + ' parcels found'}>
                        <AppFilters isActive={true} onChange={(v) => props.router.pushQuery('query', v ? JSON.stringify(v) : undefined)} />
                    </XCard.Header>
                    <XCard.Loader loading={props.data.loading || false}>
                        <TableParcels items={props.data.items.edges.map((v) => v.node)} />
                    </XCard.Loader>
                    <XCard.Footer text={props.data.items.pageInfo.itemsCount + ' items'}>
                        {props.data.items.pageInfo.currentPage > 1 && (
                            <XButton query={{ field: 'page', value: (props.data.items.pageInfo.currentPage - 1).toString() }}>Prev</XButton>
                        )}
                        {(props.data.items.pageInfo.currentPage < props.data.items.pageInfo.pagesCount - 1) && (
                            <XButton query={{ field: 'page', value: (props.data.items.pageInfo.currentPage + 1).toString() }}>Next</XButton>
                        )}
                    </XCard.Footer>
                </XCard>
            </AppContent>
        </>
    );
}));