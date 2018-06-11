import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withEditCurrentOrganizationProfile } from '../../../api';
import { XVertical } from 'openland-x-layout/XVertical';
import { XTitle } from 'openland-x/XTitle';
import {
    DevelopmentModelsMap,
    AvailabilityMap,
    LandUseMap,
    GoodForMap,
    SpecialAttributesMap,
} from '../../../utils/OrganizationProfileFields';
import { XSelect } from 'openland-x/XSelect';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XFormField } from 'openland-x-forms/XFormField';
import { Navigation } from './_navigation';
import { XForm } from 'openland-x-forms/XForm2';
import { XInput } from 'openland-x/XInput';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XHeader } from 'openland-x/XHeader';
import { XContent } from 'openland-x-layout/XContent';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XTextArea } from 'openland-x/XTextArea';

export default withApp('Organization profile edit', 'viewer', withEditCurrentOrganizationProfile((props) => {
    return (
        <Navigation title="Organization profile">
            <XHeader text="Organization profile" />
            <XContent>
                <XVertical alignSelf="stretch">
                    <XForm
                        defaultData={{
                            name: props.data.alphaCurrentOrganizationProfile.name,
                            website: props.data.alphaCurrentOrganizationProfile.website,
                            photo: props.data.alphaCurrentOrganizationProfile.photoRef,
                            twitter: props.data.alphaCurrentOrganizationProfile.twitter,
                            facebook: props.data.alphaCurrentOrganizationProfile.facebook,
                            about: props.data.alphaCurrentOrganizationProfile.about,
                        }}
                        defaultAction={async (data) => {
                            await props.editOrganizationProfile({
                                variables: {
                                    title: data.name,
                                    website: data.website,
                                    logo: data.photoRef,
                                    data: {
                                        twitter: data.twitter,
                                        facebook: data.facebook,
                                        about: data.about
                                    }
                                }
                            });
                        }}
                        defaultLayout={false}
                    >
                        <XVertical>
                            <XFormLoadingContent>
                                <XHorizontal>
                                    <XVertical flexGrow={1} maxWidth={500}>
                                        <XFormField title="Name">
                                            <XInput field="name" />
                                        </XFormField>
                                        <XFormField title="Web Site">
                                            <XInput field="website" />
                                        </XFormField>
                                        <XFormField title="Location">
                                            <XInput field="location" />
                                        </XFormField>
                                        <XFormField title="Twitter">
                                            <XInput field="twitter" />
                                        </XFormField>
                                        <XFormField title="Facebook">
                                            <XInput field="facebook" />
                                        </XFormField>
                                        <XFormField title="About">
                                            <XTextArea valueStoreKey="fields.about" />
                                        </XFormField>
                                    </XVertical>
                                    <XFormField title="Photo">
                                        <XAvatarUpload field="photo" />
                                    </XFormField>
                                </XHorizontal>
                            </XFormLoadingContent>
                            <XFormSubmit text="Save" alignSelf="flex-start" style="primary" />
                        </XVertical>
                    </XForm>
                    <XTitle>Opportunities</XTitle>
                    <XForm
                        defaultData={{
                            developmentModels: props.data.alphaCurrentOrganizationProfile.developmentModels,
                            availability: props.data.alphaCurrentOrganizationProfile.availability,
                            landUse: props.data.alphaCurrentOrganizationProfile.landUse,
                            goodFor: props.data.alphaCurrentOrganizationProfile.goodFor,
                            specialAttributes: props.data.alphaCurrentOrganizationProfile.specialAttributes,
                        }}
                        defaultAction={async (data) => { await props.editOrganizationProfile({ variables: { data } }); }}
                        defaultLayout={false}
                    >
                        <XVertical maxWidth={500}>
                            <XFormLoadingContent>
                                <XVertical>
                                    <XFormField title="Development Models">
                                        <XSelect
                                            field="developmentModels"
                                            options={DevelopmentModelsMap.map(o => {
                                                return { ...o, title: o.label };
                                            })}
                                            multi={true}
                                        />
                                    </XFormField>
                                    <XFormField title="Availability">
                                        <XSelect
                                            field="availability"
                                            options={AvailabilityMap.map(o => {
                                                return { ...o, title: o.label };
                                            })}
                                            multi={true}
                                        />
                                    </XFormField>
                                    <XFormField title="Land Use">
                                        <XSelect
                                            field="landUse"
                                            options={LandUseMap.map(o => {
                                                return { ...o, title: o.label };
                                            })}
                                            multi={true}
                                        />
                                    </XFormField>
                                    <XFormField title="Good For">
                                        <XSelect
                                            field="goodFor"
                                            options={GoodForMap.map(o => {
                                                return { ...o, title: o.label };
                                            })}
                                            multi={true}
                                        />
                                    </XFormField>
                                    <XFormField title="Special Attributes">
                                        <XSelect
                                            field="specialAttributes"
                                            options={SpecialAttributesMap.map(o => {
                                                return { ...o, title: o.label };
                                            })}
                                            multi={true}
                                        />
                                    </XFormField>
                                </XVertical>
                            </XFormLoadingContent>
                            <XFormSubmit text="Save" alignSelf="flex-start" style="primary" />
                        </XVertical>
                    </XForm>
                </XVertical>
            </XContent>
        </Navigation>
    );
}));
