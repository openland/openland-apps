import '../../init';
import '../../../globals';
import * as React from 'react';
import { XVertical } from 'openland-x-layout/XVertical';
import { XTitle } from 'openland-x/XTitle';
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
import { XHeader } from 'openland-x/XHeader';
import { XButton } from 'openland-x/XButton';
import { XContent } from 'openland-x-layout/XContent';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import Glamorous from 'glamorous';
import { sanitizeIamgeRef } from '../../../utils/sanitizer';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { XStoreContext } from 'openland-x-store/XStoreContext';
import { TextOrganizationProfile } from 'openland-text/TextOrganizationProfile';
import { XPhotoRef } from 'openland-x/XCloudImage';
import { DateFormater } from 'openland-x-format/XDate';
import { XLink } from 'openland-x/XLink';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { OrgCategoties } from '../directory/categoryPicker';
import { Cities, MetropolitanAreas, States, MultiStateRegions } from '../directory/locationPicker';
import { TextDirectoryData } from 'openland-text/TextDirectory';
import { XCheckbox } from 'openland-x/XCheckbox';
import { withSuperAccountActions } from '../../../api/withSuperAccountActions';
import { XText } from 'openland-x/XText';

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
                <ContactField>{this.props.contact.position}</ContactField>
                <ContactField>{this.props.contact.phone}</ContactField>
                <ContactField>{this.props.contact.email}</ContactField>
                <ContactField>{this.props.contact.link}</ContactField>
                <CenteredButton text="delete" style="danger" query={{ field: 'deleteContact', value: String(this.props.index) }} />
            </XHorizontal>
        );
    }
}

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
        links: c.links ? c.links.map(l => ({ text: l.text, url: l.url })) : null,
    };
};

class PostItem extends React.Component<{ post: DummyPost, index: number }> {
    render() {
        return (
            <XHorizontal>
                <XAvatar size="x-large" style="organization" photoRef={this.props.post.image || undefined} />

                <XVertical>
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

const AdminTools = withSuperAccountActions(props => {
    return (
        <>
            <XText>{'Created ' + (props.data.superAccount.createdAt ? DateFormater(props.data.superAccount.createdAt) : 'once') + ' by ' + (props.data.superAccount.createdBy ? props.data.superAccount.createdBy.name : 'John Doe')}</XText>
            <XForm
                defaultData={{
                    input: {
                        activated: props.data && props.data.superAccount.state,
                        published: (props as any).published ? 'published' : 'unpublished',
                        editorial: (props as any).editorial ? 'editorial' : 'noneditorial',
                    }
                }}
                defaultAction={async (data) => {
                    await (props as any).updateOrganizatonMutations({
                        variables: {
                            input: {
                                alphaPublished: data.input.published === 'published',
                                alphaEditorial: data.input.editorial === 'editorial',
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

                <XVertical>
                    <XFormLoadingContent>
                        <XCheckbox label="Activated" trueValue="ACTIVATED" falseValue="PENDING" field="input.activated" />
                        <XCheckbox label="Published" trueValue="published" falseValue="unpublished" field="input.published" />
                        <XCheckbox label="Editorial" trueValue="editorial" falseValue="noneditorial" field="input.editorial" />
                    </XFormLoadingContent>
                    <XFormSubmit text="Save" alignSelf="flex-start" style="primary" />
                </XVertical>
            </XForm>
        </>
    );
}) as React.ComponentType<{ updateOrganizatonMutations: any, published: boolean, editorial: boolean, variables: { accountId: string, viaOrgId: true } }>;

export const OrganizationSettigs = ((props: any) => {
    return (
        <Navigation title="Organization profile">
            <XHeader text="Organization profile" />
            <XContent>
                <XVertical alignSelf="stretch">
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
                                        alphaLocations: [...([data.input.primaryLocation] || []), ...(data.input.locations || [])],
                                        alphaPublished: data.input.published === 'published',
                                        alphaEditorial: data.input.editorial === 'editorial',
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

                                        <XFormField title="Name" field="input.name">
                                            <XInput field="input.name" />
                                        </XFormField>

                                        <XFormField title="Primary Location" field="input.primaryLocation" optional={true}>
                                            <XSelect creatable={true} multi={true} field="input.primaryLocation" options={[...Cities, ...MetropolitanAreas, ...States, ...MultiStateRegions].map(e => ({ label: e, value: e }))} />
                                        </XFormField>
                                        <XFormField title="Locations" field="input.locations" optional={true}>
                                            <XSelect creatable={true} multi={true} field="input.locations" options={[...Cities, ...MetropolitanAreas, ...States, ...MultiStateRegions].map(e => ({ label: e, value: e }))} />
                                        </XFormField>

                                        <XFormField title="Categories" field="input.organizationType" optional={true}>
                                            <XSelect options={OrgCategoties} multi={true} field="input.organizationType" />
                                        </XFormField>
                                        <XFormField title="Interests" field="input.interests" optional={true}>
                                            <XSelect creatable={true} multi={true} field="input.interests" options={TextDirectoryData.interestPicker} />
                                        </XFormField>

                                    </XVertical>
                                    <XFormField title="Photo" field="input.photoRef" optional={true}>
                                        <XAvatarUpload cropParams="1:1, free" field="input.photoRef" />
                                    </XFormField>
                                </XHorizontal>
                            </XFormLoadingContent>
                            <XFormSubmit text="Save" alignSelf="flex-start" style="primary" />
                        </XVertical>
                    </XForm>

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
                        <XVertical>
                            <XFormLoadingContent>
                                <XVertical flexGrow={1} maxWidth={500}>
                                    <XFormField title="Website" field="input.website" optional={true}>
                                        <XHorizontal>
                                            <XInput flexGrow={1} placeholder={TextOrganizationProfile.placeholderSocialInputPlaceholder} field="input.website" />
                                            <XInput flexGrow={1} placeholder={TextOrganizationProfile.placeholderSocialLinkTitlePlaceholder} field="input.websiteTitle" />
                                        </XHorizontal>
                                    </XFormField>

                                    <XFormField title="Twitter" field="input.twitter" optional={true}>
                                        <XInput field="input.twitter" />
                                    </XFormField>
                                    <XFormField title="Facebook" field="input.facebook" optional={true}>
                                        <XInput field="input.facebook" />
                                    </XFormField>
                                    <XFormField title="LinkedIn" field="input.linkedin" optional={true}>
                                        <XInput field="input.linkedin" />
                                    </XFormField>
                                </XVertical>
                            </XFormLoadingContent>
                            <XFormSubmit text="Save" alignSelf="flex-start" style="primary" />
                        </XVertical>
                    </XForm>

                    <XTitle id="contacts">Contacts</XTitle>
                    {props.data.organizationProfile!!.contacts.filter((c: any) => c !== null).map((c: any, i: any) => <ContactPersonItem key={i} contact={c!!} index={i} />)}
                    <XButton query={{ field: 'addContact', value: 'true' }} text="Add Contact" style="primary" alignSelf="flex-start" />

                    {/* SUPER ADMIN */}
                    <XWithRole role={['super-admin', 'editor']}>
                        <XTitle id="super-admin">Super admin</XTitle>
                        <AdminTools variables={{ accountId: props.data.organizationProfile!!.id, viaOrgId: true }} updateOrganizatonMutations={props.updateOrganizaton} published={props.data.organizationProfile!!.published} editorial={props.data.organizationProfile!!.editorial} />

                        {/* Just for admins/editors - temp solution before full functional posts are made - give up design */}
                        <XTitle id="super-admin">Dummy posts</XTitle>

                        {(props.data.organizationProfile!!.posts || []).filter((c: any) => c !== null).map((c: any, i: any) => <PostItem key={i} post={c!!} index={i} />)}

                        <XButton query={{ field: 'addPost', value: 'true' }} text="Add Post" style="primary" alignSelf="flex-start" />

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
            </XContent>
        </Navigation >
    );
}) as React.ComponentType<XWithRouter & { updateOrganizaton: any, data: { organizationProfile: any }, orgId?: string }>;
