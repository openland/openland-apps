import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { withParcelMetadataForm } from '../../../api/';
import { AppContent } from '../../../components/App/AppContent';
import { XButton } from '../../../components/X/XButton';
import { XForm } from '../../../components/X/XForm';
import { XHead } from '../../../components/X/XHead';

export default withApp('Parcel Edit', ['super-admin', 'editor'], withParcelMetadataForm((props) => {
    return (
        <>
            <XHead title={['Edit Parcel #' + props.data.item.title]} />
            <AppContent>
                <XCard shadow="medium" separators={true}>
                    <XCard.Header text={'Update Parcel #' + props.data.item.title} />
                    <XForm
                        defaultValues={props.data.item.metadata}
                        submitMutation={props.parcelAlterMetadata}
                        completePath={'/parcels/' + props.data.item.id}
                    >
                        <XForm.Field title="Description">
                            <XForm.Text field="description" />
                        </XForm.Field>
                        <XForm.Field title="Is Available to buy?">
                            <XForm.Boolean field="available" />
                        </XForm.Field>
                        <XForm.Field title="Is Of For Tower?">
                            <XForm.Boolean field="isOkForTower" />
                        </XForm.Field>
                        <XForm.Field title="Current Use">
                            <XForm.Select field="currentUse" options={[{ title: 'Parking', value: 'PARKING' }, { title: 'Public Storage', value: 'STORAGE' }]} />
                        </XForm.Field>
                        <XForm.Footer>
                            <XForm.Submit style="dark">Save</XForm.Submit>
                            <XButton path={'/parcels/' + props.data.item.id}>Cancel</XButton>
                        </XForm.Footer>
                    </XForm>
                </XCard>
            </AppContent>
        </>
    );
}));
