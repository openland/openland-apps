import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withParcelMetadataForm } from '../../../api/withParcelMetadataForm';
import { XHeader } from 'openland-x/XHeader';
import { Scaffold } from '../../../components/Scaffold';
import { XButton } from 'openland-x/XButton';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XForm } from 'openland-x-forms/XForm';
import { XFooter } from 'openland-x/XFooter';
import { XFormField } from 'openland-x-forms/XFormField';
import { withQueryLoader } from '../../../components/withQueryLoader';

export default withApp('Parcel Edit', ['super-admin', 'editor'], withParcelMetadataForm(withQueryLoader((props) => {
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
                        <XFormField title="Description">
                            <XForm.Text field="description" />
                        </XFormField>
                        <XFormField title="Is Available to buy?">
                            <XForm.Boolean field="available" />
                        </XFormField>
                        <XFormField title="Is Of For Tower?">
                            <XForm.Boolean field="isOkForTower" />
                        </XFormField>
                        <XFormField title="Current Use">
                            <XForm.Select field="currentUse" options={[{ title: 'Parking', value: 'PARKING' }, { title: 'Public Storage', value: 'STORAGE' }]} />
                        </XFormField>
                        <XFooter>
                            <XForm.Submit style="primary" text="Save" />
                            <XButton path={'/parcels/' + props.data.item.id} text="Cancel" />
                        </XFooter>
                    </XForm>

                </Scaffold.Content>
            </Scaffold>
        </>
    );
})));
