import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { XForm } from 'openland-x-forms/XForm';
import { withEditCurrentOrganizationProfile, withCurrentOrganizationProfile } from '../../../api';
import { XVertical } from 'openland-x-layout/XVertical';
import glamorous from 'glamorous';
import { XTitle } from 'openland-x/XTitle';
import {
    DevelopmentModelsMap,
    AvailabilityMap,
    LandUseMap,
    GoodForMap,
    SpecialAttributesMap,
} from '../../../utils/OrganizationProfileFields';
import { XSelect } from 'openland-x/XSelect';

const Root = glamorous(XVertical)({
    padding: 24
});

const ProfileForm = withEditCurrentOrganizationProfile((props) => {
    return (
        <Root>
            <XTitle>Main Info</XTitle>
            <XForm defaultValues={(props as any).mainVals} mutationDirect={true} submitMutation={props.editOrganizationProfile} keepLoading={false}>
                <XForm.Field title="title">
                    <XForm.Text field="title" />
                </XForm.Field>
                <XForm.Field title="website">
                    <XForm.Text field="website" />
                </XForm.Field>
                <XForm.Field title="logo">
                    <XForm.Avatar field="logo" placeholder={{ add: (<><p>Add</p> <p>organization logo</p></>), change: <><p>Change</p> <p>organization logo</p></> }} />
                </XForm.Field>
                <XForm.Footer>
                    <XForm.Submit text="Save" />
                </XForm.Footer>
            </XForm>

            <XTitle>String extras</XTitle>
            <XForm defaultValues={(props as any).simpleExtras} submitMutation={props.editOrganizationProfile} keepLoading={false}>
                <XForm.Field title="description">
                    <XForm.Text field="description" />
                </XForm.Field>
                <XForm.Field title="twitter">
                    <XForm.Text field="twitter" />
                </XForm.Field>
                <XForm.Field title="facebook">
                    <XForm.Text field="facebook" />
                </XForm.Field>
                <XForm.Footer>
                    <XForm.Submit text="Save" />
                </XForm.Footer>
            </XForm>
            <XTitle>Tags</XTitle>
            <XForm defaultValues={(props as any).developmentModelsExtras} submitMutation={props.editOrganizationProfile} keepLoading={false}>
                <XForm.Field title="Development Models">
                    <XForm.Select
                        field="developmentModels"
                        options={DevelopmentModelsMap.map(o => {
                            return { ...o, title: o.label };
                        })}
                        component={XSelect}
                        multi={true}
                    />
                </XForm.Field>
                <XForm.Footer>
                    <XForm.Submit text="Save" />
                </XForm.Footer>
            </XForm>

            <XForm defaultValues={(props as any).availabilityExtras} submitMutation={props.editOrganizationProfile} keepLoading={false}>
                <XForm.Field title="availability">
                    <XForm.Select
                        field="availability"
                        options={AvailabilityMap.map(o => {
                            return { ...o, title: o.label };
                        })}
                        component={XSelect}
                        multi={true}
                    />
                </XForm.Field>
                <XForm.Footer>
                    <XForm.Submit text="Save" />
                </XForm.Footer>
            </XForm>

            <XForm defaultValues={(props as any).landUseExtras} submitMutation={props.editOrganizationProfile} keepLoading={false}>
                <XForm.Field title="LandUse">
                    <XForm.Select
                        field="landUse"
                        options={LandUseMap.map(o => {
                            return { ...o, title: o.label };
                        })}
                        component={XSelect}
                        multi={true}
                    />
                </XForm.Field>
                <XForm.Footer>
                    <XForm.Submit text="Save" />
                </XForm.Footer>
            </XForm>

            <XForm defaultValues={(props as any).goodForExtras} submitMutation={props.editOrganizationProfile} keepLoading={false}>
                <XForm.Field title="Good For">
                    <XForm.Select
                        field="goodFor"
                        options={GoodForMap.map(o => {
                            return { ...o, title: o.label };
                        })}
                        component={XSelect}
                        multi={true}
                    />
                </XForm.Field>
                <XForm.Footer>
                    <XForm.Submit text="Save" />
                </XForm.Footer>
            </XForm>

            <XForm defaultValues={(props as any).specialAttributesExtras} submitMutation={props.editOrganizationProfile} keepLoading={false}>
                <XForm.Field title="Special Attributes">
                    <XForm.Select
                        field="specialAttributes"
                        options={SpecialAttributesMap.map(o => {
                            return { ...o, title: o.label };
                        })}
                        component={XSelect}
                        multi={true}
                    />
                </XForm.Field>
                <XForm.Footer>
                    <XForm.Submit text="Save" />
                </XForm.Footer>
            </XForm>

            <XTitle>Contacts</XTitle>
            <XTitle>Ranges</XTitle>

        </Root>

    );
}) as React.ComponentClass<{
    mainVals: any,
    extrasVals: any,
    simpleExtras: any,
    developmentModelsExtras: any
    availabilityExtras: any
    landUseExtras: any
    goodForExtras: any
    specialAttributesExtras: any
}>;

export default withApp('Organization profile edit', 'viewer', withCurrentOrganizationProfile((props) => {
    return (
        <>
            <XDocumentHead title={'Edit Organization Profile'} />
            <Scaffold>
                <Scaffold.Content>
                    <ProfileForm
                        mainVals={{
                            title: props.data.alphaCurrentOrganizationProfile.title,
                            website: props.data.alphaCurrentOrganizationProfile.website,
                            logo: props.data.alphaCurrentOrganizationProfile.logo,

                        }}

                        simpleExtras={{
                            description: props.data.alphaCurrentOrganizationProfile.description,
                            twitter: props.data.alphaCurrentOrganizationProfile.twitter,
                            facebook: props.data.alphaCurrentOrganizationProfile.facebook,
                        }}

                        developmentModelsExtras={{
                            developmentModels: props.data.alphaCurrentOrganizationProfile.developmentModels,
                        }}

                        availabilityExtras={{
                            availability: props.data.alphaCurrentOrganizationProfile.availability,
                        }}

                        landUseExtras={{
                            landUse: props.data.alphaCurrentOrganizationProfile.landUse,
                        }}

                        goodForExtras={{
                            goodFor: props.data.alphaCurrentOrganizationProfile.goodFor,
                        }}

                        specialAttributesExtras={{
                            specialAttributes: props.data.alphaCurrentOrganizationProfile.specialAttributes,
                        }}

                        extrasVals={{
                            siteSizes: props.data.alphaCurrentOrganizationProfile.siteSizes,
                            potentialSites: props.data.alphaCurrentOrganizationProfile.potentialSites,
                            contacts: props.data.alphaCurrentOrganizationProfile.contacts,
                        }}
                    />
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}));
