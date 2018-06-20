import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { XVertical } from 'openland-x-layout/XVertical';
import { XTitle } from 'openland-x/XTitle';
import { XAvatar } from 'openland-x/XAvatar';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { ContactPerson } from '../../../utils/OrganizationProfileFields';
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
import { withMyOrganizationProfile } from '../../../api/withMyOrganizationProfile';
import { sanitizeIamgeRef } from '../../../utils/sanitizer';
import { withQueryLoader } from '../../../components/withQueryLoader';

const CenteredButton = Glamorous(XButton)({
    alignSelf: 'center'
});

const ContactField = Glamorous.div({
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.27,
    letterSpacing: -0.1,
    textAlign: 'center',
    marginLeft: 0,
});

class ContactPersonItem extends React.Component<{ contact: ContactPerson, index: number }> {
    render() {
        return (
            <XHorizontal>
                <XAvatar photoRef={this.props.contact.photoRef || undefined} />
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

const clearContact = (c: ContactPerson): ContactPerson => {
    console.warn(c);

    return {
        name: c.name,
        email: c.email,
        link: c.link,
        phone: c.phone,
        role: c.role,
        photoRef: c.photoRef ? {
            uuid: c.photoRef.uuid,
            crop: c.photoRef.crop ? {
                x: c.photoRef.crop.x,
                y: c.photoRef.crop.y,
                w: c.photoRef.crop.w,
                h: c.photoRef.crop.h
            } : null
        } : null
    };
};

export default withApp('Organization profile edit', 'viewer', withMyOrganizationProfile(withQueryLoader((props) => {
    return (
        <Navigation title="Organization profile">
            <XHeader text="Organization profile" />
            <XContent>
                <XVertical alignSelf="stretch">
                    <XForm
                        defaultData={{
                            input: {
                                name: props.data.myOrganizationProfile!!.name,
                                website: props.data.myOrganizationProfile!!.website,
                                photo: props.data.myOrganizationProfile!!.photoRef,
                                twitter: props.data.myOrganizationProfile!!.twitter,
                                facebook: props.data.myOrganizationProfile!!.facebook,
                                about: props.data.myOrganizationProfile!!.about,
                                location: props.data.myOrganizationProfile!!.location,
                                photoRef: sanitizeIamgeRef(props.data.myOrganizationProfile!!.photoRef),
                                organizationType: props.data.myOrganizationProfile!!.organizationType,
                                lookingFor: props.data.myOrganizationProfile!!.lookingFor,
                                geographies: props.data.myOrganizationProfile!!.geographies,
                            }
                        }}
                        defaultAction={async (data) => {
                            await props.updateOrganizaton({
                                variables: {
                                    input: {
                                        name: data.input.name,
                                        website: data.input.website,
                                        photoRef: data.input.photoRef,
                                        twitter: data.input.twitter,
                                        facebook: data.input.facebook,
                                        location: data.input.location,
                                        about: data.input.about,
                                        alphaOrganizationType: data.input.organizationType,
                                        alphaLookingFor: data.input.lookingFor,
                                        alphaGeographies: data.input.geographies,
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
                                            <XInput field="input.name" />
                                        </XFormField>
                                        <XFormField title="Web Site">
                                            <XInput field="input.website" />
                                        </XFormField>
                                        <XFormField title="Location">
                                            <XInput field="input.location" />
                                        </XFormField>
                                        <XFormField title="Twitter">
                                            <XInput field="input.twitter" />
                                        </XFormField>
                                        <XFormField title="Facebook">
                                            <XInput field="input.facebook" />
                                        </XFormField>
                                        <XFormField title="About">
                                            <XTextArea valueStoreKey="fields.input.about" />
                                        </XFormField>

                                        <XFormField title="OrganizationType">
                                            <XSelect creatable={true} multi={true} valueStoreKey="fields.input.organizationType" />
                                        </XFormField>
                                        <XFormField title="LookingFor">
                                            <XSelect creatable={true} multi={true} valueStoreKey="fields.input.lookingFor" />
                                        </XFormField>
                                        <XFormField title="Geographies">
                                            <XSelect creatable={true} multi={true} valueStoreKey="fields.input.geographies" />
                                        </XFormField>
                                    </XVertical>
                                    <XFormField title="Photo">
                                        <XAvatarUpload field="input.photoRef" />
                                    </XFormField>
                                </XHorizontal>
                            </XFormLoadingContent>
                            <XFormSubmit text="Save" alignSelf="flex-start" style="primary" />
                        </XVertical>
                    </XForm>
                    <XTitle>Development Opportunities</XTitle>
                    <XForm
                        defaultData={{
                            input: {
                                doShapeAndForm: props.data.myOrganizationProfile!!.doShapeAndForm,
                                doCurrentUse: props.data.myOrganizationProfile!!.doCurrentUse,
                                doGoodFitFor: props.data.myOrganizationProfile!!.doGoodFitFor,
                                doSpecialAttributes: props.data.myOrganizationProfile!!.doSpecialAttributes,
                                doAvailability: props.data.myOrganizationProfile!!.doAvailability,

                                // alphaPotentialSites: props.data.myOrganizationProfile!!.potentialSites ? props.data.myOrganizationProfile!!.potentialSites!!.map(range => {
                                //     let rangeStr;
                                //     if ((range.to || Number.MAX_SAFE_INTEGER) <= 5) {
                                //         rangeStr = 'small';
                                //     } else if ((range.to || Number.MAX_SAFE_INTEGER) <= 50) {
                                //         rangeStr = 'medium';
                                //     } else {
                                //         rangeStr = 'large';
                                //     }
                                //     return rangeStr;
                                // }) : null,

                            }
                        }}
                        defaultAction={async (data) => {
                            // let potentialSites = data.input.alphaPotentialSites ? data.input.alphaPotentialSites.map((rangeStr: string) => (rangeStr === 'small' ? { from: 0, to: 5 } : rangeStr === 'medium' ? { from: 5, to: 50 } : { from: 50 })) : null;
                            // console.warn(potentialSites);
                            await props.updateOrganizaton({
                                variables: {
                                    input: {
                                        alphaDOShapeAndForm: data.input.doShapeAndForm,
                                        alphaDOCurrentUse: data.input.doCurrentUse,
                                        alphaDOGoodFitFor: data.input.doGoodFitFor,
                                        alphaDOSpecialAttributes: data.input.doSpecialAttributes,
                                        alphaDOAvailability: data.input.doAvailability,
                                    }
                                }
                            });
                        }}
                        defaultLayout={false}
                    >
                        <XVertical maxWidth={500}>
                            <XFormLoadingContent>
                                <XVertical>

                                    {/* <XFormField title="Potential Sites">
                                        <XSelect
                                            field="input.alphaPotentialSites"
                                            options={[{ label: '0-5 sites', value: 'small' }, { label: '5-50 sites', value: 'medium' }, { label: '50+ sites', value: 'large' }]}
                                            multi={true}
                                        />

                                    </XFormField> */}

                                    <XFormField title="Shape And Form">
                                        <XSelect
                                            field="input.doShapeAndForm"
                                            creatable={true}
                                            multi={true}
                                        />
                                    </XFormField>

                                    <XFormField title="Current Use">
                                        <XSelect
                                            field="input.doCurrentUse"
                                            creatable={true}
                                            multi={true}
                                        />
                                    </XFormField>

                                    <XFormField title="Good Fit For">
                                        <XSelect
                                            field="input.doGoodFitFor"
                                            creatable={true}
                                            multi={true}
                                        />
                                    </XFormField>

                                    <XFormField title="Special Attributes">
                                        <XSelect
                                            field="input.doSpecialAttributes"
                                            creatable={true}
                                            multi={true}
                                        />
                                    </XFormField>

                                    <XFormField title="Availability">
                                        <XSelect
                                            field="input.doAvailability"
                                            creatable={true}
                                            multi={true}
                                        />
                                    </XFormField>

                                </XVertical>
                            </XFormLoadingContent>
                            <XFormSubmit text="Save" alignSelf="flex-start" style="primary" />
                        </XVertical>
                    </XForm>

                    <XTitle>Acquisition requests</XTitle>
                    <XForm
                        defaultData={{
                            input: {
                                arGeographies: props.data.myOrganizationProfile!!.arGeographies,
                                arAreaRange: props.data.myOrganizationProfile!!.arAreaRange,
                                arHeightLimit: props.data.myOrganizationProfile!!.arHeightLimit,
                                arActivityStatus: props.data.myOrganizationProfile!!.arActivityStatus,
                                arAquisitionBudget: props.data.myOrganizationProfile!!.arAquisitionBudget,
                                arAquisitionRate: props.data.myOrganizationProfile!!.arAquisitionRate,
                                arClosingTime: props.data.myOrganizationProfile!!.arClosingTime,
                                arSpecialAttributes: props.data.myOrganizationProfile!!.arSpecialAttributes,
                                arLandUse: props.data.myOrganizationProfile!!.arLandUse,
                            }
                        }}
                        defaultAction={async (data) => {
                            await props.updateOrganizaton({
                                variables: {
                                    input: {
                                        alphaARGeographies: data.input.arGeographies,
                                        alphaARAreaRange: data.input.arAreaRange,
                                        alphaARHeightLimit: data.input.arHeightLimit,
                                        alphaARActivityStatus: data.input.arActivityStatus,
                                        alphaARAquisitionBudget: data.input.arAquisitionBudget,
                                        alphaARAquisitionRate: data.input.arAquisitionRate,
                                        alphaARClosingTime: data.input.arClosingTime,
                                        alphaARSpecialAttributes: data.input.arSpecialAttributes,
                                        alphaARLandUse: data.input.arLandUse,
                                    }
                                }
                            });
                        }}
                        defaultLayout={false}
                    >
                        <XVertical maxWidth={500}>
                            <XFormLoadingContent>
                                <XVertical>

                                    <XFormField title="Geographies">
                                        <XSelect
                                            field="input.arGeographies"
                                            creatable={true}
                                            multi={true}
                                        />
                                    </XFormField>

                                    <XFormField title="Area Range">
                                        <XSelect
                                            field="input.arAreaRange"
                                            creatable={true}
                                            multi={true}
                                        />
                                    </XFormField>

                                    <XFormField title="Height Limit">
                                        <XSelect
                                            field="input.arHeightLimit"
                                            creatable={true}
                                            multi={true}
                                        />
                                    </XFormField>

                                    <XFormField title="Activity Status">
                                        <XSelect
                                            field="input.arActivityStatus"
                                            creatable={true}
                                            multi={true}
                                        />
                                    </XFormField>

                                    <XFormField title="3-year Aquisition Budget">
                                        <XSelect
                                            field="input.arAquisitionBudget"
                                            creatable={true}
                                            multi={true}
                                        />
                                    </XFormField>

                                    <XFormField title="Aquisition Rate">
                                        <XSelect
                                            field="input.arAquisitionRate"
                                            creatable={true}
                                            multi={true}
                                        />
                                    </XFormField>

                                    <XFormField title="Closing Time">
                                        <XSelect
                                            field="input.arClosingTime"
                                            creatable={true}
                                            multi={true}
                                        />
                                    </XFormField>

                                    <XFormField title="Special Attributes">
                                        <XSelect
                                            field="input.arSpecialAttributes"
                                            creatable={true}
                                            multi={true}
                                        />
                                    </XFormField>

                                    <XFormField title="Land Use">
                                        <XSelect
                                            field="input.arLandUse"
                                            creatable={true}
                                            multi={true}
                                        />
                                    </XFormField>

                                </XVertical>
                            </XFormLoadingContent>
                            <XFormSubmit text="Save" alignSelf="flex-start" style="primary" />
                        </XVertical>
                    </XForm>

                    <XTitle>Contacts</XTitle>
                    {props.data.myOrganizationProfile!!.contacts.filter(c => c !== null).map((c, i) => <ContactPersonItem key={i} contact={c!!} index={i} />)}
                    <XButton query={{ field: 'addContact', value: 'true' }} text="Add Contact" style="primary" alignSelf="flex-start" />

                    {props.data.myOrganizationProfile!!.contacts[props.router.query.deleteContact] && (
                        <XModalForm
                            title="Delete?"
                            submitProps={{ text: 'Delete' }}
                            defaultData={{
                                contacts: props.data.myOrganizationProfile!!.contacts,
                            }}
                            defaultAction={async (data) => {
                                data.contacts.splice(Number(props.router.query.deleteContact), 1);
                                await props.updateOrganizaton({
                                    variables: {
                                        input: {
                                            contacts: data.contacts.map(clearContact)
                                        }
                                    }
                                });
                            }}
                            targetQuery="deleteContact"
                        />
                    )}
                    {props.data.myOrganizationProfile!!.contacts[props.router.query.editContact] && (
                        <XModalForm
                            title="Edit contact"
                            defaultData={{
                                contacts: props.data.myOrganizationProfile!!.contacts,
                                name: props.data!!.myOrganizationProfile!!.contacts!![props.router.query.editContact]!!.name,
                                phone: props.data.myOrganizationProfile!!.contacts!![props.router.query.editContact]!!.phone,
                                email: props.data.myOrganizationProfile!!.contacts!![props.router.query.editContact]!!.email,
                                link: props.data.myOrganizationProfile!!.contacts!![props.router.query.editContact]!!.link,
                                position: props.data.myOrganizationProfile!!.contacts!![props.router.query.editContact]!!.position,
                                photoRef: sanitizeIamgeRef(props.data.myOrganizationProfile!!.contacts!![props.router.query.editContact]!!.photoRef),
                            }}
                            defaultAction={async (data) => {
                                data.contacts[Number(props.router.query.editContact)] = {
                                    name: data.name,
                                    phone: data.phone,
                                    photoRef: data.photoRef,
                                    email: data.email,
                                    role: data.role,
                                    link: data.link,
                                };

                                await props.updateOrganizaton({
                                    variables: {
                                        input: {
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
                                    <XInput field="position" placeholder="Position" />
                                    <XAvatarUpload field="photoRef" />
                                </XVertical>
                            </XFormLoadingContent>
                        </XModalForm>

                    )}

                    <XModalForm
                        title="Add contact"
                        defaultData={{
                            contacts: props.data.myOrganizationProfile!!.contacts,
                        }}
                        defaultAction={async (data) => {
                            data.contacts.push({
                                name: data.name,
                                phone: data.phone,
                                photoRef: data.avatar,
                                email: data.email,
                                link: data.link,
                                role: data.role,
                            });
                            await props.updateOrganizaton({
                                variables: {
                                    input: {
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
                                <XInput field="position" placeholder="Position" />
                                <XAvatarUpload field="photoRef" />
                            </XVertical>
                        </XFormLoadingContent>
                    </XModalForm>

                </XVertical>
            </XContent>
        </Navigation >
    );
})));
