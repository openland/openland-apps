import * as React from 'react';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/App/withApp';
import { AppContent } from '../../../components/App/AppContent';
import { XCard } from '../../../components/X/XCard';
import { withParcelsFavorites } from '../../../api';
import { XButton } from '../../../components/X/XButton';
import { XModal } from '../../../components/X/XModal';
import { TableParcels } from '../../../components/TableParcels';

export default withApp(withParcelsFavorites((props) => {
    return (
        <>
            <XHead title={['Statecraft', 'Favorites']} />
            <AppContent>
                <XCard shadow="medium">
                    <XCard.Header text="Favorites" description={props.data.items.length + ' parcels'}>
                        <XModal title="Export to CSV">
                            <XModal.Target>
                                <XButton>Export to CSV</XButton>
                            </XModal.Target>
                            <XModal.Content>
                                <XButton>Download</XButton>
                            </XModal.Content>
                        </XModal>
                        <XButton>Share</XButton>
                    </XCard.Header>
                    <TableParcels items={props.data.items} />
                </XCard>
            </AppContent>
        </>
    )
}));