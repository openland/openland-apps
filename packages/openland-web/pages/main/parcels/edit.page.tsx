import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withParcelMetadataForm } from '../../../api/';
import { XHeader } from 'openland-x/XHeader';
import { Scaffold } from '../../../components/Scaffold';
import { XButton } from 'openland-x/XButton';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XForm } from 'openland-x-forms/XForm';

export default withApp('Parcel Edit', ['super-admin', 'editor'], withParcelMetadataForm((props) => {
    return (
        <>
            <XDocumentHead title={['Edit Parcel #' + props.data.item.number.title]} />
            <Scaffold>
                <Scaffold.Content bottomOffset={true}>
                    <XHeader text={'Update Parcel #' + props.data.item.number.title} />
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
                            <XForm.Submit style="primary" text="Save" />
                            <XButton path={'/parcels/' + props.data.item.id} text="Cancel" />
                        </XForm.Footer>
                    </XForm>

                </Scaffold.Content>
            </Scaffold>
        </>
    );
}));
