import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withEditCurrentOrganizationProfile } from '../../../api';
import { XVertical } from 'openland-x-layout/XVertical';
import { XTitle } from 'openland-x/XTitle';
import { XAvatar } from 'openland-x/XAvatar';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import {
    DevelopmentModelsMap,
    AvailabilityMap,
    LandUseMap,
    GoodForMap,
    SpecialAttributesMap,
    ContactPerson
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
import { XButton } from 'openland-x/XButton';
import { XContent } from 'openland-x-layout/XContent';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XTextArea } from 'openland-x/XTextArea';
import Glamorous from 'glamorous';

const ContactField = Glamorous.div({
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.27,
    letterSpacing: -0.1,
    textAlign: 'center',
    marginLeft: 0,
});

const CenteredButton = Glamorous(XButton)({
    alignSelf: 'center'
});
class ContactPersonItem extends React.Component<{ contact: ContactPerson, index: number }> {
    render() {
        return (
            <XHorizontal>
                <XAvatar src={this.props.contact.avatar || undefined} />
                <ContactField>{this.props.contact.name}</ContactField>
                <ContactField>{this.props.contact.role}</ContactField>
                <ContactField>{this.props.contact.phone}</ContactField>
                <ContactField>{this.props.contact.email}</ContactField>
                <ContactField>{this.props.contact.link}</ContactField>
                <CenteredButton text="edit" style="electric" query={{ field: 'editContact', value: String(this.props.index) }} />
                <CenteredButton text="delete" style="danger" query={{ field: 'deleteContact', value: String(this.props.index) }} />
            </XHorizontal>
        );
    }
}

const clearContact = (c: any) => {
    return { ...c, avatarRef: c.avatarRef ? { ...c.avatarRef, crop: { ...c.avatarRef.crop, __typename: undefined }, __typename: undefined } : undefined, __typename: undefined };
};

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
                    {props.data.alphaCurrentOrganizationProfile && props.data.alphaCurrentOrganizationProfile.contacts && (
                        <>
                            <XTitle>Contacts</XTitle>
                            {props.data.alphaCurrentOrganizationProfile.contacts.filter(c => c !== null).map((c, i) => <ContactPersonItem key={i} contact={c!!} index={i} />)}
                            <XButton query={{ field: 'addContact', value: 'true' }} text="Add Contact" style="primary" alignSelf="flex-start" />
                        </>
                    )}

                    {props.data.alphaCurrentOrganizationProfile.contacts && props.data.alphaCurrentOrganizationProfile.contacts[props.router.query.deleteContact] && (
                        <XModalForm
                            title="Delete?"
                            submitProps={{text: 'Delete'}}
                            defaultData={{
                                contacts: props.data.alphaCurrentOrganizationProfile.contacts,
                            }}
                            defaultAction={async (data) => {
                                data.contacts.splice(Number(props.router.query.deleteContact), 1);
                                await props.editOrganizationProfile({
                                    variables: {
                                        data: {
                                            contacts: data.contacts.map(clearContact)
                                        }
                                    }
                                });
                            }}
                            targetQuery="deleteContact"
                        />
                    )}
                    {props.data.alphaCurrentOrganizationProfile.contacts && props.data.alphaCurrentOrganizationProfile.contacts[props.router.query.editContact] && (

                        <XModalForm
                            title="Edit contact"
                            defaultData={{
                                contacts: props.data.alphaCurrentOrganizationProfile.contacts,
                                name: props.data!!.alphaCurrentOrganizationProfile.contacts!![props.router.query.editContact]!!.name,
                                phone: props.data.alphaCurrentOrganizationProfile.contacts!![props.router.query.editContact]!!.phone,
                                email: props.data.alphaCurrentOrganizationProfile.contacts!![props.router.query.editContact]!!.email,
                                link: props.data.alphaCurrentOrganizationProfile.contacts!![props.router.query.editContact]!!.link,
                                role: props.data.alphaCurrentOrganizationProfile.contacts!![props.router.query.editContact]!!.role,
                                avatar: props.data.alphaCurrentOrganizationProfile.contacts!![props.router.query.editContact]!!.avatarRef,
                            }}
                            defaultAction={async (data) => {
                                data.contacts[Number(props.router.query.editContact)] = {
                                    name: data.name,
                                    phone: data.phone,
                                    avatarRef: data.avatar,
                                    email: data.email,
                                    role: data.role,
                                    link: data.link,
                                };
                                await props.editOrganizationProfile({

                                    variables: {
                                        data: {
                                            contacts: data.contacts.map(clearContact)
                                        }
                                    }
                                });
                            }}
                            targetQuery="editContact"
                        >
                            <XFormLoadingContent>
                                <XVertical>
                                    <XInput field="name" required={true} placeholder="Name" />
                                    <XInput field="phone" placeholder="Phone" />
                                    <XInput field="email" placeholder="Email" />
                                    <XInput field="link" placeholder="Link" />
                                    <XInput field="role" placeholder="Role" />
                                    <XAvatarUpload field="avatar" />
                                </XVertical>
                            </XFormLoadingContent>
                        </XModalForm>

                    )}

                    {props.data.alphaCurrentOrganizationProfile && (

                        <XModalForm
                            title="Add contact"
                            defaultData={{
                                contacts: props.data.alphaCurrentOrganizationProfile.contacts || [],
                            }}
                            defaultAction={async (data) => {
                                data.contacts.push({
                                    name: data.name,
                                    phone: data.phone,
                                    avatarRef: data.avatar,
                                    email: data.email,
                                    link: data.link,
                                    role: data.role,
                                });
                                await props.editOrganizationProfile({
                                    variables: {
                                        data: {
                                            contacts: data.contacts.map(clearContact)
                                        }
                                    }
                                });
                            }}
                            targetQuery="addContact"
                        >
                            <XFormLoadingContent>
                                <XVertical>
                                    <XInput field="name" required={true} placeholder="Name" />
                                    <XInput field="phone" placeholder="Phone" />
                                    <XInput field="email" placeholder="Email" />
                                    <XInput field="link" placeholder="Link" />
                                    <XInput field="role" placeholder="Role" />
                                    <XAvatarUpload field="avatar" />
                                </XVertical>
                            </XFormLoadingContent>
                        </XModalForm>

                    )}

                </XVertical>
            </XContent>
        </Navigation>
    );
}));
