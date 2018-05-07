import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { withParcelsFavorites } from '../../../api/';
import { TableParcels } from '../../../components/TableParcels';
import Types from 'openland-api';
import * as FileSaver from 'file-saver';
import { XHeader } from '../../../components/X/XHeader';
import { Scaffold } from '../../../components/Scaffold';
import { XLink } from 'openland-x/XLink';
import { XButton } from 'openland-x/XButton';

let Link = Glamorous(XLink)({
    color: '#3297d3',
});

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
            v.number.title,
            v.address,
            v.extrasLandValue,
            v.extrasImprovementValue
        ]);

    let header = 'Parcel ID,Address,Land Value,Improvement Value';
    let escaped = rows.map((v) => v.map((r) => escapeRecord(r)).join()).join('\n');

    let contents = new Blob([header + '\n' + escaped], { type: 'text/csv' });
    FileSaver.saveAs(contents, 'favorites.csv');
}

export default withApp('Favorites', 'viewer', withParcelsFavorites((props) => {
    return (
        <>
            <XHead title={['Favorites']} />
            <Scaffold>
                <Scaffold.Content>
                    <XHeader text="Favorites" description={props.data.items.length === 0 ? 'No parcels' : props.data.items.length + ' parcels'}>
                        <XButton
                            style="primary"
                            onClick={(e) => { e.preventDefault(); exportCSV(props.data.items); }}
                            text="Export to CSV"
                        />
                    </XHeader>
                    {(props.data.items.length === 0)
                        ? (
                            <XCard.Empty icon="favorite_border" text="You can find your first parcel at">
                                <Link path="/">
                                    Explore page
                                    </Link>
                            </XCard.Empty>
                        )
                        : (
                            <TableParcels items={props.data.items} />
                        )}
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}));