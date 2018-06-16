import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
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
    ContactPerson,
    FeaturedOpportunity
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
import { withMyOrganizationProfile } from '../../../api/withMyOrganizationProfile';
import { sanitizeIamgeRef } from '../../../utils/sanitizer';
import { XLocationPickerModal } from 'openland-x-map/XLocationPickerModal';
import { XStreetViewModalPreview } from 'openland-x-map/XStreetViewModalPreview';

const CenteredButton = Glamorous(XButton)({
    alignSelf: 'center'
});
class FeaturedPpportunityField extends React.Component<{ item: FeaturedOpportunity, index: number }> {
    render() {
        return (
            <XHorizontal>
                <XStreetViewModalPreview location={{ latitude: this.props.item.location.lat, longitude: this.props.item.location.lon }} width={170} height={130} />

                <XVertical>
                    <XTitle >{this.props.item.title}</XTitle>
                    <XTitle marginTop={0}>{this.props.item.locationTitle}</XTitle>
                    {(this.props.item.tags || []).join(' ')}
                    <XHorizontal>
                        <CenteredButton text="edit" style="electric" query={{ field: 'editFeaturedOpportunity', value: String(this.props.index) }} />
                        <CenteredButton text="delete" style="danger" query={{ field: 'deleteFeaturedOpportunity', value: String(this.props.index) }} />
                    </XHorizontal>
                </XVertical>
            </XHorizontal>
        );
    }
}

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

const cleanFeaturedOpp = (c: FeaturedOpportunity): FeaturedOpportunity => {
    return {
        title: c.title,
        location: { lat: c.location.lat, lon: c.location.lon },
        locationTitle: c.locationTitle,
        tags: c.tags,
    };
};

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

export default withApp('Organization profile edit', 'viewer', withMyOrganizationProfile((props) => {
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
                                    </XVertical>
                                    <XFormField title="Photo">
                                        <XAvatarUpload field="input.photoRef" />
                                    </XFormField>
                                </XHorizontal>
                            </XFormLoadingContent>
                            <XFormSubmit text="Save" alignSelf="flex-start" style="primary" />
                        </XVertical>
                    </XForm>
                    <XTitle>Opportunities</XTitle>
                    <XForm
                        defaultData={{
                            input: {
                                alphaDevelopmentModels: props.data.myOrganizationProfile!!.developmentModels,
                                alphaAvailability: props.data.myOrganizationProfile!!.availability,
                                alphaLandUse: props.data.myOrganizationProfile!!.landUse,
                                alphaGoodFor: props.data.myOrganizationProfile!!.goodFor,
                                alphaSpecialAttributes: props.data.myOrganizationProfile!!.specialAttributes,
                                alphaPotentialSites: props.data.myOrganizationProfile!!.potentialSites ? props.data.myOrganizationProfile!!.potentialSites!!.map(range => {
                                    let rangeStr;
                                    if ((range.to || Number.MAX_SAFE_INTEGER) <= 5) {
                                        rangeStr = 'small';
                                    } else if ((range.to || Number.MAX_SAFE_INTEGER) <= 50) {
                                        rangeStr = 'medium';
                                    } else {
                                        rangeStr = 'large';
                                    }
                                    return rangeStr;
                                }) : null,
                                alphaSiteSizes: props.data.myOrganizationProfile!!.siteSizes ? props.data.myOrganizationProfile!!.siteSizes!!.map(range => {
                                    let rangeStr;
                                    if ((range.to || Number.MAX_SAFE_INTEGER) <= 10000) {
                                        rangeStr = 'small';
                                    } else if ((range.to || Number.MAX_SAFE_INTEGER) <= 100000) {
                                        rangeStr = 'medium';
                                    } else {
                                        rangeStr = 'large';
                                    }
                                    return rangeStr;
                                }) : null,
                            }
                        }}
                        defaultAction={async (data) => {
                            let potentialSites = data.input.alphaPotentialSites ? data.input.alphaPotentialSites.map((rangeStr: string) => (rangeStr === 'small' ? { from: 0, to: 5 } : rangeStr === 'medium' ? { from: 5, to: 50 } : { from: 50 })) : null;
                            let siteSizes = data.input.alphaSiteSizes ? data.input.alphaSiteSizes.map((rangeStr: string) => (rangeStr === 'small' ? { from: 0, to: 10000 } : rangeStr === 'medium' ? { from: 10000, to: 100000 } : { from: 100000 })) : null;
                            console.warn(potentialSites);
                            await props.updateOrganizaton({
                                variables: {
                                    input: {
                                        alphaDevelopmentModels: data.input.alphaDevelopmentModels,
                                        alphaAvailability: data.input.alphaAvailability,
                                        alphaLandUse: data.input.alphaLandUse,
                                        alphaGoodFor: data.input.alphaGoodFor,
                                        alphaSpecialAttributes: data.input.alphaSpecialAttributes,
                                        alphaPotentialSites: potentialSites,
                                        alphaSiteSizes: siteSizes

                                    }
                                }
                            });
                        }}
                        defaultLayout={false}
                    >
                        <XVertical maxWidth={500}>
                            <XFormLoadingContent>
                                <XVertical>

                                    <XFormField title="Development Models">
                                        <XSelect
                                            field="input.alphaDevelopmentModels"
                                            options={DevelopmentModelsMap.map(o => {
                                                return { ...o, title: o.label };
                                            })}
                                            multi={true}
                                        />
                                    </XFormField>
                                    <XFormField title="Availability">
                                        <XSelect
                                            field="input.alphaAvailability"
                                            options={AvailabilityMap.map(o => {
                                                return { ...o, title: o.label };
                                            })}
                                            multi={true}
                                        />
                                    </XFormField>
                                    <XFormField title="Potential Sites">
                                        <XSelect
                                            field="input.alphaPotentialSites"
                                            options={[{ label: '0-5 sites', value: 'small' }, { label: '5-50 sites', value: 'medium' }, { label: '50+ sites', value: 'large' }]}
                                            multi={true}
                                        />

                                    </XFormField>
                                    <XFormField title="Site sizes ">
                                        <XSelect
                                            field="input.alphaSiteSizes"
                                            options={[{ label: 'small (up to 10,000 sf)', value: 'small' }, { label: 'medium (10,000 - 100,000 sf)', value: 'medium' }, { label: 'large (100,000 + sf)', value: 'large' }]}
                                            multi={true}
                                        />

                                    </XFormField>

                                    <XFormField title="Land Use">
                                        <XSelect
                                            field="input.alphaLandUse"
                                            options={LandUseMap.map(o => {
                                                return { ...o, title: o.label };
                                            })}
                                            multi={true}
                                        />
                                    </XFormField>
                                    <XFormField title="Good For">
                                        <XSelect
                                            field="input.alphaGoodFor"
                                            options={GoodForMap.map(o => {
                                                return { ...o, title: o.label };
                                            })}
                                            multi={true}
                                        />
                                    </XFormField>
                                    <XFormField title="Special Attributes">
                                        <XSelect
                                            field="input.alphaSpecialAttributes"
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

                    <XTitle>Featured Opportunities</XTitle>

                    {props.data.myOrganizationProfile && props.data.myOrganizationProfile.featuredOpportunities && (
                        props.data.myOrganizationProfile.featuredOpportunities.map((fo, i) => < FeaturedPpportunityField key={'fo_' + i} item={fo} index={i} />)
                    )}

                    <XButton query={{ field: 'addFeaturedOpportunity', value: 'true' }} text="Add Featured Opportunity" style="primary" alignSelf="flex-start" />

                    <XModalForm
                        title="Add featured opportunity"
                        defaultData={{
                            featuredOpportunities: props.data.myOrganizationProfile!!.featuredOpportunities || [],
                        }}
                        defaultAction={async (data) => {
                            data.featuredOpportunities.push({
                                title: data.title,
                                location: data.location ? { lat: data.location.result.center[1], lon: data.location.result.center[0] } : null,
                                locationTitle: data.location ? data.location.result.place_name || data.location.result.text : null,
                                tags: data.tags,
                            });
                            await props.updateOrganizaton({
                                variables: {
                                    input: {
                                        alphaDummyFeaturedOpportunities: data.featuredOpportunities.map(cleanFeaturedOpp)
                                    }
                                }
                            });
                        }}
                        targetQuery="addFeaturedOpportunity"
                    >
                        <XFormLoadingContent>
                            <XVertical>
                                <XInput field="title" required={true} placeholder="Title" />
                                <XLocationPickerModal field="location" />
                                <XSelect
                                    field="tags"
                                    placeholder="Tags"
                                    options={GoodForMap.map(o => {
                                        return { ...o, title: o.label };
                                    })}
                                    multi={true}
                                />
                            </XVertical>
                        </XFormLoadingContent>
                    </XModalForm>

                    {props.data.myOrganizationProfile!!.featuredOpportunities!![props.router.query.deleteFeaturedOpportunity] && (
                        <XModalForm
                            title="Delete?"
                            submitProps={{ text: 'Delete' }}
                            defaultData={{
                                featuredOpportunities: props.data.myOrganizationProfile!!.featuredOpportunities || [],
                            }}
                            defaultAction={async (data) => {
                                data.featuredOpportunities.splice(Number(props.router.query.deleteFeaturedOpportunity), 1);
                                await props.updateOrganizaton({
                                    variables: {
                                        input: {
                                            alphaDummyFeaturedOpportunities: data.featuredOpportunities.map(cleanFeaturedOpp)
                                        }
                                    }
                                });
                            }}
                            targetQuery="deleteFeaturedOpportunity"
                        />
                    )}
                    {props.data.myOrganizationProfile!!.featuredOpportunities!![props.router.query.editFeaturedOpportunity] && (
                        <XModalForm
                            title="Edit contact"
                            defaultData={{
                                featuredOpportunities: props.data.myOrganizationProfile!!.featuredOpportunities || [],
                                title: props.data!!.myOrganizationProfile!!.featuredOpportunities!![props.router.query.editFeaturedOpportunity]!!.title,
                                location: {
                                    result: {
                                        text: props.data!!.myOrganizationProfile!!.featuredOpportunities!![props.router.query.editFeaturedOpportunity]!!.locationTitle,
                                        center: [props.data!!.myOrganizationProfile!!.featuredOpportunities!![props.router.query.editFeaturedOpportunity]!!.location.lon, props.data!!.myOrganizationProfile!!.featuredOpportunities!![props.router.query.editFeaturedOpportunity]!!.location.lat]
                                    }
                                },
                                tags: props.data!!.myOrganizationProfile!!.featuredOpportunities!![props.router.query.editFeaturedOpportunity]!!.tags,
                            }}
                            defaultAction={async (data) => {
                                console.warn(data);
                                data.featuredOpportunities[Number(props.router.query.editFeaturedOpportunity)] = {
                                    title: data.title,
                                    location: data.location ? { lat: data.location.result.center[1], lon: data.location.result.center[0] } : null,
                                    locationTitle: data.location ? data.location.result.place_name || data.location.result.text : null,
                                    tags: data.tags,
                                };
                                console.warn(data);

                                await props.updateOrganizaton({
                                    variables: {
                                        input: {
                                            alphaDummyFeaturedOpportunities: data.featuredOpportunities.map(cleanFeaturedOpp)
                                        }
                                    }
                                });

                            }}
                            targetQuery="editFeaturedOpportunity"
                        >
                            <XFormLoadingContent>
                                <XVertical>
                                    <XInput field="title" required={true} placeholder="Title" />
                                    <XLocationPickerModal field="location" />
                                    <XSelect
                                        field="tags"
                                        placeholder="Tags"
                                        options={GoodForMap.map(o => {
                                            return { ...o, title: o.label };
                                        })}
                                        multi={true}
                                    />
                                </XVertical>
                            </XFormLoadingContent>
                        </XModalForm>

                    )}
                </XVertical>
            </XContent>
        </Navigation >
    );
}));
