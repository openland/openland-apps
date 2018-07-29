import '../../init';
import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XAvatar } from 'openland-x/XAvatar';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { ContactPerson } from '../../../utils/OrganizationProfileFields';
import { XSelect } from 'openland-x/XSelect';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XFormField, XFormFieldTitle } from 'openland-x-forms/XFormField';
import { Navigation } from './_navigation';
import { XForm } from 'openland-x-forms/XForm2';
import { XInput } from 'openland-x/XInput';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XButton } from 'openland-x/XButton';
import { XContent } from 'openland-x-layout/XContent';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { sanitizeIamgeRef } from '../../../utils/sanitizer';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { TextOrganizationProfile } from 'openland-text/TextOrganizationProfile';
import { XPhotoRef } from 'openland-x/XCloudImage';
import { DateFormater } from 'openland-x-format/XDate';
import { XLink } from 'openland-x/XLink';
import { XIcon } from 'openland-x/XIcon';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { OrgCategoties } from '../directory/categoryPicker';
import { Cities, MetropolitanAreas, States, MultiStateRegions } from '../directory/locationPicker';
import { TextDirectoryData } from 'openland-text/TextDirectory';
import { XCheckbox } from 'openland-x/XCheckbox';
import { withSuperAccountActions } from '../../../api/withSuperAccountActions';

import ContactEmailIc from '../profile/icons/contacts/ic-email.svg';
import ContactLinkedInIc from '../profile/icons/contacts/ic-linkedin.svg';
import ContactPhoneIc from '../profile/icons/contacts/ic-phone.svg';

const Content = Glamorous(XContent)({
    paddingTop: 30
});

const CategoryTitle = Glamorous.div({
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    color: '#1f3449'
});

const AddContactButton = Glamorous(XLink)({
    alignSelf: 'flex-start',
    fontSize: 15,
    letterSpacing: -0.2,
    paddingLeft: 17,
    color: 'rgba(51, 69, 98, 0.4)',
    backgroundImage: 'url(\'/static/X/ic-add-small.svg\')',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left center',
});

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

const ContactWrapper = Glamorous.div({
    borderRadius: 5,
    border: 'solid 1px rgba(220, 222, 228, 0.45)',
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 20,
    maxWidth: 480
});

const ContactTitle = Glamorous.div<{ opacity?: number }>((props) => ({
    opacity: props.opacity,
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.33,
    color: '#334562',
    letterSpacing: -0.2
}));

const ContactLink = Glamorous.a({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover > svg > g > path:last-child': {
        fill: '#5640d6'
    }
});

const ContactButton = Glamorous(XLink)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: 32,
    height: 32,
    borderRadius: 4,
    backgroundColor: 'rgba(243, 243, 245, 0.7)',
    '&:hover': {
        backgroundColor: 'rgba(243, 243, 245)',
        '& > i': {
            color: '#6B50FF'
        }
    },
    '& > i': {
        fontSize: 13,
        color: '#bcc3cc'
    }
});

const ContactPersonItem = (props: { contact: ContactPerson, index: number }) => (
    <ContactWrapper>
        <XHorizontal alignItems="center" justifyContent="space-between">
            <XHorizontal separator={10} alignItems="center">
                <XAvatar photoRef={props.contact.photoRef || undefined} size="medium" />
                <XVertical separator={1}>
                    <XHorizontal separator={5} alignItems="center">
                        <ContactTitle>{props.contact.name}</ContactTitle>
                        {props.contact.phone && <ContactLink href={'tel:' + props.contact.phone} target="_blank"><ContactPhoneIc width={15} height={15} /></ContactLink>}
                        {props.contact.email && <ContactLink href={'mailto:' + props.contact.email} target="_blank"><ContactEmailIc width={15} height={15} /></ContactLink>}
                        {props.contact.link && <ContactLink href={props.contact.link.startsWith('http') ? props.contact.link : 'https://' + props.contact.link} target="_blank"><ContactLinkedInIc width={15} height={15} /></ContactLink>}
                    </XHorizontal>
                    <ContactTitle opacity={0.8}>{props.contact.position}</ContactTitle>
                </XVertical>
            </XHorizontal>
            <XHorizontal separator={4} alignItems="center">
                <ContactButton query={{ field: 'deleteContact', value: String(props.index) }}><XIcon icon="clear" /></ContactButton>
                <ContactButton query={{ field: 'editContact', value: String(props.index) }}><XIcon icon="edit" /></ContactButton>
            </XHorizontal>
        </XHorizontal>
    </ContactWrapper>
);

const clearContact = (c: ContactPerson): ContactPerson => {

    return {
        name: c.name,
        email: c.email,
        link: c.link,
        phone: c.phone,
        position: c.position,
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

interface DummyPost {
    text: string;
    type: string;
    description?: string | null;
    date: string;
    image?: XPhotoRef | null;
    activity?: string[] | null;
    links?: { text: string, url: string }[] | null;
    pinned?: boolean | null;
}

const clearPost = (c: DummyPost): DummyPost => {
    return {
        text: c.text,
        type: c.type,
        description: c.description,
        date: c.date,
        activity: c.activity,
        image: c.image ? {
            uuid: c.image.uuid,
            crop: c.image.crop ? {
                x: c.image.crop.x,
                y: c.image.crop.y,
                w: c.image.crop.w,
                h: c.image.crop.h
            } : null
        } : null,
        pinned: c.pinned,
        links: c.links ? c.links.map(l => ({ text: l.text, url: l.url })) : null,
    };
};

class PostItem extends React.Component<{ post: DummyPost, index: number }> {
    render() {
        return (
            <XHorizontal>
                <XAvatar size="x-large" style="organization" photoRef={this.props.post.image || undefined} />

                <XVertical>
                    {this.props.post.pinned && <ContactField>pinned</ContactField>}
                    <ContactField>{this.props.post.text}</ContactField>
                    <ContactField>{this.props.post.description}</ContactField>
                    <ContactField>{this.props.post.date}</ContactField>
                    <ContactField>{(this.props.post.activity || []).join(' ')}</ContactField>
                    <ContactField>{(this.props.post.links || []).map((l, i) => <XLink key={i} href={l.url}>{l.text}</XLink>)}</ContactField>
                    <CenteredButton text="delete" style="danger" query={{ field: 'deletePost', value: String(this.props.index) }} />
                </XVertical>
            </XHorizontal>
        );
    }
}

const Field = Glamorous(XFormField)({
    flex: 1
});

const FormFieldTitle = Glamorous(XFormFieldTitle)({
    flexGrow: 1
});

const DelLinkBtn = Glamorous(XButton)({
    marginRight: -24,
});

const AddLinkBtn = Glamorous(XButton)({
    marginLeft: -14,
    marginTop: -8,
});

let shiftArray = (array: any[]) => {
    let res = [...array];
    res.shift();
    return res;
};

const activities = [
    { label: 'Bankruptcy', value: 'Bankruptcy' },
    { label: 'Financial distress', value: 'Financial distress' },
    { label: 'Budget cut', value: 'Budget cut' },
    { label: 'Layoffs', value: 'Layoffs' },
    { label: 'Dispositions', value: 'Dispositions' },
    { label: 'Closures', value: 'Closures' },
    { label: 'Store closures', value: 'Store closures' },
    { label: 'Hospital closures', value: 'Hospital closures' },
    { label: 'Demolition', value: 'Demolition' },
    { label: 'Redevelopment', value: 'Redevelopment' },
    { label: 'Renovation', value: 'Renovation' },
    { label: 'Expired permit', value: 'Expired permit' },
    { label: 'Upzoning / Rezoning', value: 'Upzoning / Rezoning' },
    { label: 'Expansion', value: 'Expansion' },
    { label: 'Mergers and acquisitions', value: 'Mergers and acquisitions' },
    { label: 'Acquisition criteria', value: 'Acquisition criteria' },
    { label: 'RFP', value: 'RFP' },
    { label: 'RFQ', value: 'RFQ' },
    { label: 'Development opportunity', value: 'Development opportunity' },
    { label: 'Strategic assessment', value: 'Strategic assessment' },
];

const SACreatedBlock = Glamorous.div({
    padding: 18,
    borderRadius: 5,
    border: 'solid 1px rgba(220, 222, 228, 0.45)',
    alignSelf: 'flex-start'
});

const SACreatedText = Glamorous.div({
    fontSize: 15,
    lineHeight: 1.27,
    letterSpacing: -0.2,
    color: '#334562',
    '& .bold': {
        fontWeight: 600
    },
    '& .author': {
        color: '#654bfa'
    }
});

const AdminTools = withSuperAccountActions(props => {
    return (
        <XVertical separator={12}>
            <SACreatedBlock>
                <SACreatedText>
                    <span>Created </span>
                    <span className="bold">{props.data.superAccount.createdAt ? DateFormater(props.data.superAccount.createdAt) : 'once'} </span>
                    <span>by </span>
                    <span className="bold author">{props.data.superAccount.createdBy ? props.data.superAccount.createdBy.name : 'John Doe'}</span>
                </SACreatedText>
            </SACreatedBlock>
            <XForm
                defaultData={{
                    input: {
                        activated: props.data && props.data.superAccount.state,
                        published: (props as any).published ? 'published' : 'unpublished',
                        editorial: (props as any).editorial ? 'editorial' : 'noneditorial',
                        featured: (props as any).featured ? 'featured' : 'nonfeatured',
                    }
                }}
                defaultAction={async (data) => {
                    await (props as any).updateOrganizatonMutations({
                        variables: {
                            input: {
                                alphaPublished: data.input.published === 'published',
                                alphaEditorial: data.input.editorial === 'editorial',
                                alphaFeatured: data.input.featured === 'featured',
                            }
                        }
                    });

                    if (data.input.activated === 'ACTIVATED') {
                        props.activate({ variables: { accountId: props.data.superAccount.id } });
                    } else {
                        props.pend({ variables: { accountId: props.data.superAccount.id } });
                    }
                }}
                defaultLayout={false}
            >

                <XVertical separator={24}>
                    <XFormLoadingContent>
                        <XCheckbox label="Activated" trueValue="ACTIVATED" falseValue="PENDING" field="input.activated" />
                        <XCheckbox label="Published" trueValue="published" falseValue="unpublished" field="input.published" />
                        <XCheckbox label="Editorial" trueValue="editorial" falseValue="noneditorial" field="input.editorial" />
                        <XCheckbox label="Featured" trueValue="featured" falseValue="nonfeatured" field="input.featured" />
                    </XFormLoadingContent>
                    <XFormSubmit text="Save changes" alignSelf="flex-start" style="primary" size="medium" />
                </XVertical>
            </XForm>
        </XVertical>
    );
}) as React.ComponentType<{ updateOrganizatonMutations: any, published: boolean, editorial: boolean, featured: boolean, variables: { accountId: string, viaOrgId: true } }>;

const Separator = Glamorous.div({
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(220, 222, 228, 0.45)',
    marginTop: '30px !important',
    marginBottom: '30px !important',
});

export const OrganizationSettigs = ((props: any) => {
    return (
        <Navigation title="Organization profile">
            <Content>
                <XVertical alignSelf="stretch" separator={36}>
                    <XVertical separator={15}>
                        <CategoryTitle id="general">General</CategoryTitle>
                        <XForm
                            defaultData={{

                                input: {
                                    name: props.data.organizationProfile!!.name,
                                    photo: props.data.organizationProfile!!.photoRef,
                                    primaryLocation: [(props.data.organizationProfile!!.locations || [])[0]].filter(l => !!(l)),
                                    locations: shiftArray(props.data.organizationProfile!!.locations || []),
                                    photoRef: sanitizeIamgeRef(props.data.organizationProfile!!.photoRef),
                                    organizationType: props.data.organizationProfile!!.organizationType,
                                    interests: props.data.organizationProfile!!.interests,
                                    published: props.data.organizationProfile!!.published ? 'published' : 'unpublished',
                                    editorial: props.data.organizationProfile!!.editorial ? 'editorial' : 'noneditorial',
                                }
                            }}
                            defaultAction={async (data) => {
                                // console.warn(data);
                                await props.updateOrganizaton({
                                    variables: {
                                        input: {
                                            name: data.input.name,
                                            photoRef: data.input.photoRef,
                                            alphaOrganizationType: data.input.organizationType,
                                            alphaInterests: data.input.interests,
                                            alphaLocations: [...(data.input.primaryLocation || []), ...(data.input.locations || [])],
                                            alphaPublished: data.input.published === 'published',
                                            alphaEditorial: data.input.editorial === 'editorial',
                                        }
                                    }
                                });
                            }}
                            defaultLayout={false}
                        >
                            <XVertical separator={24}>
                                <XFormLoadingContent>
                                    <XHorizontal separator={12}>
                                        <XVertical flexGrow={1} maxWidth={480}>

                                            <XFormField title="Organization name" field="input.name">
                                                <XInput field="input.name" size="medium" />
                                            </XFormField>

                                            <Separator />

                                            <XFormField title="Primary location" field="input.primaryLocation" optional={true}>
                                                <XSelect large={true} creatable={true} multi={true} field="input.primaryLocation" options={[...Cities, ...MetropolitanAreas, ...States, ...MultiStateRegions].map(e => ({ label: e, value: e }))} />
                                            </XFormField>
                                            <XFormField title="More locations" field="input.locations" optional={true}>
                                                <XSelect large={true} creatable={true} multi={true} field="input.locations" options={[...Cities, ...MetropolitanAreas, ...States, ...MultiStateRegions].map(e => ({ label: e, value: e }))} />
                                            </XFormField>

                                            <XFormField title="Categories" field="input.organizationType" optional={true}>
                                                <XSelect large={true} options={OrgCategoties} multi={true} field="input.organizationType" />
                                            </XFormField>
                                            <XFormField title="Interests" field="input.interests" optional={true}>
                                                <XSelect large={true} creatable={true} multi={true} field="input.interests" options={TextDirectoryData.interestPicker} />
                                            </XFormField>

                                        </XVertical>
                                        <XFormField title="Logo" field="input.photoRef" optional={true}>
                                            <XAvatarUpload cropParams="1:1, free" field="input.photoRef" />
                                        </XFormField>
                                    </XHorizontal>
                                </XFormLoadingContent>
                                <XFormSubmit text="Save changes" alignSelf="flex-start" style="primary" size="medium" />
                            </XVertical>
                        </XForm>
                    </XVertical>

                    <XVertical separator={15}>
                        <CategoryTitle id="contacts">Contacts</CategoryTitle>
                        <XVertical separator={9}>
                            {props.data.organizationProfile!!.contacts.filter((c: any) => c !== null).map((c: any, i: any) => (
                                <ContactPersonItem key={i} contact={c!!} index={i} />
                            ))}
                            <AddContactButton query={{ field: 'addContact', value: 'true' }}>Add another</AddContactButton>
                        </XVertical>
                    </XVertical>

                    <XVertical separator={15}>
                        <CategoryTitle id="links">Links</CategoryTitle>
                        <XForm
                            defaultData={{
                                input: {
                                    website: props.data.organizationProfile!!.website,
                                    twitter: props.data.organizationProfile!!.twitter,
                                    facebook: props.data.organizationProfile!!.facebook,
                                    linkedin: props.data.organizationProfile!!.linkedin,
                                }
                            }}
                            defaultAction={async (data) => {
                                await props.updateOrganizaton({
                                    variables: {
                                        input: {
                                            website: data.input.website,
                                            twitter: data.input.twitter,
                                            facebook: data.input.facebook,
                                            linkedin: data.input.linkedin,
                                        }
                                    }
                                });
                            }}
                            defaultLayout={false}
                        >
                            <XVertical separator={24}>
                                <XFormLoadingContent>
                                    <XVertical flexGrow={1} maxWidth={480}>
                                        <XFormField title="Website" field="input.website" optional={true}>
                                            <XHorizontal separator={7}>
                                                <XInput size="medium" flexGrow={1} placeholder={TextOrganizationProfile.placeholderSocialInputPlaceholder} field="input.website" />
                                                <XInput size="medium" flexGrow={1} placeholder={TextOrganizationProfile.placeholderSocialLinkTitlePlaceholder} field="input.websiteTitle" />
                                            </XHorizontal>
                                        </XFormField>

                                        <XFormField title="Twitter" field="input.twitter" optional={true}>
                                            <XInput size="medium" field="input.twitter" />
                                        </XFormField>
                                        <XFormField title="Facebook" field="input.facebook" optional={true}>
                                            <XInput size="medium" field="input.facebook" />
                                        </XFormField>
                                        <XFormField title="LinkedIn" field="input.linkedin" optional={true}>
                                            <XInput size="medium" field="input.linkedin" />
                                        </XFormField>
                                    </XVertical>
                                </XFormLoadingContent>
                                <XFormSubmit text="Save changes" alignSelf="flex-start" style="primary" size="medium" />
                            </XVertical>
                        </XForm>
                    </XVertical>

                    {/* SUPER ADMIN */}
                    <XWithRole role={['super-admin', 'editor']}>
                        <XVertical separator={36}>
                            <XVertical separator={15}>
                                <CategoryTitle id="super-admin">Super admin</CategoryTitle>
                                <AdminTools
                                    variables={{ accountId: props.data.organizationProfile!!.id, viaOrgId: true }}
                                    updateOrganizatonMutations={props.updateOrganizaton}
                                    published={props.data.organizationProfile!!.published}
                                    editorial={props.data.organizationProfile!!.editorial}
                                    featured={props.data.organizationProfile!!.featured}
                                />
                            </XVertical>

                            <XVertical separator={15}>
                                {/* Just for admins/editors - temp solution before full functional posts are made - give up design */}
                                <CategoryTitle id="dummi-posts">Dummy posts</CategoryTitle>

                                <XVertical>
                                    {(props.data.organizationProfile!!.posts || []).filter((c: any) => c !== null).map((c: any, i: any) => <PostItem key={i} post={c!!} index={i} />)}

                                    <XButton query={{ field: 'addPost', value: 'true' }} text="Add Post" style="primary" alignSelf="flex-start" />
                                </XVertical>
                            </XVertical>
                        </XVertical>
                    </XWithRole>

                    {/* MODALS */}
                    {props.data.organizationProfile!!.contacts[props.router.query.deleteContact] && (
                        <XModalForm
                            title="Delete?"
                            submitProps={{ text: 'Delete' }}
                            defaultData={{
                                contacts: props.data.organizationProfile!!.contacts,
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
                    {props.data.organizationProfile!!.contacts[props.router.query.editContact] && (
                        <XModalForm
                            title="Edit contact"
                            defaultData={{
                                contacts: props.data.organizationProfile!!.contacts,
                                name: props.data!!.organizationProfile!!.contacts!![props.router.query.editContact]!!.name,
                                phone: props.data.organizationProfile!!.contacts!![props.router.query.editContact]!!.phone,
                                email: props.data.organizationProfile!!.contacts!![props.router.query.editContact]!!.email,
                                link: props.data.organizationProfile!!.contacts!![props.router.query.editContact]!!.link,
                                position: props.data.organizationProfile!!.contacts!![props.router.query.editContact]!!.position,
                                photoRef: sanitizeIamgeRef(props.data.organizationProfile!!.contacts!![props.router.query.editContact]!!.photoRef),
                            }}
                            defaultAction={async (data) => {
                                data.contacts[Number(props.router.query.editContact)] = {
                                    name: data.name,
                                    phone: data.phone,
                                    photoRef: data.photoRef,
                                    email: data.email || null,
                                    position: data.position,
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
                                    <XInput field="name" placeholder="Name" />
                                    <XInput field="phone" placeholder="Phone" />
                                    <XInput field="email" placeholder="Email" />
                                    <XInput field="link" placeholder="LinkedIn" />
                                    <XInput field="position" placeholder="Position" />
                                    <XAvatarUpload field="photoRef" />
                                </XVertical>
                            </XFormLoadingContent>
                        </XModalForm>

                    )}

                    <XModalForm
                        title="Add contact"
                        defaultData={{
                            contacts: props.data.organizationProfile!!.contacts,
                        }}
                        defaultAction={async (data) => {
                            data.contacts.push({
                                name: data.name,
                                phone: data.phone,
                                photoRef: data.avatar,
                                email: data.email || null,
                                link: data.link,
                                position: data.position,
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
                                {/* <XInput field="phone" placeholder="Phone" />
                                <XInput field="email" placeholder="Email" /> */}
                                <XInput field="position" placeholder="Position" />
                                <XInput field="link" placeholder="LinkedIn" />
                                <XInput field="twitter" placeholder="Twitter" />
                                <XAvatarUpload field="photoRef" placeholder={{ add: 'Add photo', change: 'Change photo' }} />
                            </XVertical>
                        </XFormLoadingContent>
                    </XModalForm>

                    <XWithRole role={['super-admin', 'editor']}>

                        <XModalForm
                            title="Add post"
                            defaultData={{
                                posts: props.data.organizationProfile!!.posts || [],
                                text: '',
                                type: 'update',
                                date: DateFormater(new Date().getTime()),
                                links: [],
                                activity: [],
                                pinned: 'not pinned'
                            }}
                            defaultAction={async (data) => {
                                data.posts.push({
                                    text: data.text,
                                    type: data.type,
                                    description: data.description,
                                    image: data.image,
                                    date: data.date,
                                    activity: data.activity,
                                    pinned: data.pinned === 'pinned',
                                    links: (data.links || []).filter((l: any) => l.text || l.url).map((l: any) => ({ text: l.text, url: l.url }))
                                });
                                await props.updateOrganizaton({
                                    variables: {
                                        input: {
                                            alphaDummyPosts: data.posts.map(clearPost)
                                        }
                                    }
                                });
                            }}
                            targetQuery="addPost"
                        >
                            <XFormLoadingContent>
                                <XVertical>
                                    <XAvatarUpload field="image" placeholder={{ add: 'Add photo', change: 'Change photo' }} />
                                    <XInput field="text" placeholder="Text" />
                                    <XInput field="description" placeholder="Description" />
                                    <XInput field="date" placeholder="Date" />
                                    <XSelect field="activity" multi={true} creatable={false} placeholder="Activity" options={activities} />
                                    <XSelect field="pinned" searchable={false} clearable={false} options={[{ value: 'pinned', label: 'pinned' }, { value: 'not pinned', label: 'not pinned' }]} />
                                    <XSelect field="type" searchable={false} clearable={false} options={[{ value: 'update', label: 'update' }, { value: 'news', label: 'news' }]} />
                                    <XStoreContext.Consumer>
                                        {(store) => {
                                            return (((store && store.readValue('fields.links')) || []).map((link: any, i: number) => {
                                                return (
                                                    <XHorizontal key={'link_' + i} >
                                                        <Field title={TextOrganizationProfile.listingEditDoLinkTextTitle}>
                                                            <XInput field={`links.${i}.text`} placeholder={TextOrganizationProfile.listingEditDoLinkTextPlaceholder} />
                                                        </Field>
                                                        <XVertical separator="none" flexGrow={1}>
                                                            <XHorizontal >
                                                                <FormFieldTitle>{TextOrganizationProfile.listingEditDoLinkUrlTitle}</FormFieldTitle>
                                                                <DelLinkBtn
                                                                    style="link_danger"
                                                                    text={TextOrganizationProfile.listingEditDoLinkDelete}
                                                                    onClick={() => {
                                                                        if (store) {
                                                                            let links: any[] = store.readValue('fields.links') || [];
                                                                            links.splice(i, 1);
                                                                            store.writeValue('fields.links', links);
                                                                        }
                                                                    }}
                                                                />
                                                                <div />
                                                            </XHorizontal>
                                                            <XInput field={`links.${i}.url`} placeholder={TextOrganizationProfile.listingEditDoLinkUrlPlaceholder} />
                                                        </XVertical>
                                                    </XHorizontal>
                                                );
                                            }));
                                        }}
                                    </XStoreContext.Consumer>
                                    <XStoreContext.Consumer>
                                        {(store) => {
                                            let links = store ? store.readValue('fields.links') || [] : [];
                                            return (
                                                <AddLinkBtn
                                                    onClick={() => {
                                                        if (store) {
                                                            links.push({ text: '', url: '' });
                                                            store.writeValue('fields.links', links);
                                                        }
                                                    }}
                                                    text={links.length === 0 ? TextOrganizationProfile.listingEditDoLinkAddFirst : TextOrganizationProfile.listingEditDoLinkAdd}
                                                    style="link"
                                                    alignSelf="flex-start"
                                                />
                                            );
                                        }}
                                    </XStoreContext.Consumer>
                                </XVertical>
                            </XFormLoadingContent>
                        </XModalForm>

                        {(props.data.organizationProfile!!.posts || [])[props.router.query.deletePost] && (
                            <XModalForm
                                title="Delete?"
                                submitProps={{ text: 'Delete' }}
                                defaultData={{
                                    posts: props.data.organizationProfile!!.posts,
                                }}
                                defaultAction={async (data) => {
                                    data.posts.splice(Number(props.router.query.deletePost), 1);
                                    await props.updateOrganizaton({
                                        variables: {
                                            input: {
                                                alphaDummyPosts: data.posts.map(clearPost)
                                            }
                                        }
                                    });
                                }}
                                targetQuery="deletePost"
                            />
                        )}
                    </XWithRole>

                </XVertical>
            </Content>
        </Navigation >
    );
}) as React.ComponentType<XWithRouter & { updateOrganizaton: any, data: { organizationProfile: any }, orgId?: string }>;
