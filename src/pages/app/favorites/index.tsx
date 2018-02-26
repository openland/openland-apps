import * as React from 'react';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/App/withApp';
import { AppContent } from '../../../components/App/AppContent';
import { XCard } from '../../../components/X/XCard';
import { withParcelsFavorites } from '../../../api';
import { TableParcels } from '../../../components/TableParcels';
import * as Types from '../../../api/Types';
import { XButton } from '../../../components/X/XButton';
import * as FileSaver from 'file-saver';

function escapeRecord(src?: string | number | null) {
    if (src !== undefined && src !== null) {
        if (typeof src === 'string') {
            return '"' + src.replace('"', '"""') + '"';
        } else {
            return src.toString();
        }
    } else {
        return '';
    }
}

function exportCSV(items: Types.ParcelShortFragment[]) {
    let rows = items.map((v) =>
        [
            v.title,
            v.addresses.map((s) => s.streetNumber + ' ' + s.streetName + ' ' + s.streetNameSuffix).join(),
            v.extrasLandValue,
            v.extrasImprovementValue
        ])

    let header = 'Parcel ID,Address,Land Value,Improvement Value';
    let escaped = rows.map((v) => v.map((r) => escapeRecord(r)).join()).join('\n');

    let contents = new Blob([header + '\n' + escaped], { type: 'text/csv' });
    FileSaver.saveAs(contents, 'favorites.csv');
}

export default withApp(withParcelsFavorites((props) => {
    return (
        <>
            <XHead title={['Statecraft', 'Favorites']} />
            <AppContent>
                <XCard shadow="medium">
                    <XCard.Header text="Favorites" description={props.data.items.length + ' parcels'}>
                        <XButton
                            style="dark"
                            onClick={(e) => { e.preventDefault(); exportCSV(props.data.items) }}
                        >
                            Export to CSV
                        </XButton>
                    </XCard.Header>
                    <TableParcels items={props.data.items} />
                </XCard>
            </AppContent>
        </>
    )
}));