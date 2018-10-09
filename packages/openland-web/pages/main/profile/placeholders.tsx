import * as React from 'react';
import Glamorous from 'glamorous';
import { withMyOrganizationProfile } from '../../../api/withMyOrganizationProfile';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XCard } from 'openland-x/XCard';
import { XButton } from 'openland-x/XButton';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XSelect } from 'openland-x/XSelect';
import { XFormField } from 'openland-x-forms/XFormField';
import XStyles from 'openland-x/XStyles';
import { XIcon } from 'openland-x/XIcon';
import PlaceholderAbout from './icons/placeholder/placeholder_about.svg';
import PlaceholderSocial from './icons/placeholder/placeholder_social.svg';
import { XTextArea } from 'openland-x/XTextArea';
import { XInput } from 'openland-x/XInput';
import PlaceholderContact from './icons/placeholder/placeholder_contact.svg';
import PlaceholderInterests from './icons/placeholder/placeholder_interests.svg';
import PlaceholderLocations from './icons/placeholder/placeholder_locations.svg';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { sanitizeIamgeRef } from '../../../utils/sanitizer';
import { TextOrganizationProfile } from 'openland-text/TextOrganizationProfile';
import { OrgCategoties } from '../directory/categoryPicker';
import { Cities, MetropolitanAreas, States, MultiStateRegions, LocationControlledPicker } from '../directory/locationPicker';
import { TextDirectoryData } from 'openland-text/TextDirectory';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XSelectCustomInputRender } from 'openland-x/basics/XSelectCustom';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XMutation } from 'openland-x/XMutation';
import { withOrganizationFollow } from '../../../api/withOrganizationFollow';
import { SharedStorage } from 'openland-x-utils/SharedStorage';
import { XStorageContext } from 'openland-x-routing/XStorageContext';

const Placeholder = Glamorous(XCard)<{ accent?: boolean, minHeigth?: number }>(props => ({
    backgroundColor: props.accent ? '#654bfa' : '#fff',
    minHeight: props.minHeigth !== undefined ? props.minHeigth : 165,
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
    borderRadius: 5
}));

const XHorizontalMargins = Glamorous(XHorizontal)<{ marginLeft?: number, marginRight?: number, marginTop?: number, marginBottom?: number }>(props => ({
    marginLeft: props.marginLeft,
    marginRight: props.marginRight,
    marginTop: props.marginTop,
    marginBottom: props.marginBottom,
}));

const CenteredPlaceholder = Glamorous(XCard)<{ accent?: boolean }>(props => ({
    paddingTop: 48,
    paddingBottom: 60,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 5
}));

const SmallPlaceholder = Glamorous(XCard)<{ accent?: boolean, minHeigth?: number }>(props => ({
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
    borderRadius: 5
}));

const PlaceholderButton = Glamorous(XButton)({
    marginLeft: 16
});

const PlaceholderText = Glamorous.span<{ accent?: boolean, marginLeft?: number, marginTop?: number }>(props => ({
    marginLeft: props.marginLeft !== undefined ? props.marginLeft : 16,
    fontSize: 18,
    lineHeight: 1.44,
    letterSpacing: -0.2,
    marginTop: props.marginTop !== undefined ? props.marginTop : -20,
    color: props.accent ? '#ffffff' : '#334562'
}));

const PlaceholderSubText = Glamorous.span<{ accent?: boolean }>(props => ({
    fontSize: 15,
    letterSpacing: '-0.2px',
    color: props.accent ? '#ffffff' : '#334562',
    opacity: 0.5,
}));

const PlaceholderViewerText = Glamorous.span(props => ({
    fontSize: 18,
    lineHeight: 1.44,
    letterSpacing: -0.2,
    marginTop: 20,
    color: '#334562'
}));

const PlaceholderIcon = Glamorous.img<{ margin?: string }>((props) => ({
    marginTop: 6,
    width: 60,
    height: 60,
}));

const Close = Glamorous(XIcon)({
    width: 16,
    height: 16,
    fontSize: 16,
    top: 8,
    right: 8,
    color: '#cfcfcf',
    alignSelf: 'flex-end',
    marginBottom: 8,
    cursor: 'pointer',
    position: 'absolute',
});

const ModalFormContentWrapper = Glamorous.div({
    padding: 24,
});

export const OverviewPlaceholder = withMyOrganizationProfile((props) => {
    if (!(props.data && props.data.organizationProfile)) {
        return null;
    }
    return ((props.data.organizationProfile && !props.data.organizationProfile.organizationType && !props.data.organizationProfile.locations && !props.data.organizationProfile.interests) ? (
        <Placeholder accent={true}>
            <XHorizontal>
                <PlaceholderIcon src={'/static/img/icons/organization/profile/placeholder_overview.svg'} />
                <XVertical>
                    {/* <PlaceholderText accent={true}>Your account has been created - now it will be easier to connect with real estate companies. To make most of it we recommend to share more information about your company. </PlaceholderText> */}
                    <PlaceholderText accent={true}>{TextOrganizationProfile.placeholderOverviewGeneralMainText}</PlaceholderText>

                    <XModalForm
                        title={TextOrganizationProfile.placeholderOverviewGeneralModalTitle}
                        defaultData={{
                            input: {
                                organizationType: props.data.organizationProfile!!.organizationType,
                                locations: props.data.organizationProfile!!.locations,
                                interests: props.data.organizationProfile!!.interests,
                            }
                        }}
                        defaultAction={async (data) => {
                            await props.updateOrganizaton({
                                variables: {
                                    input: {
                                        alphaOrganizationType: data.input.organizationType,
                                        alphaLocations: data.input.locations,
                                        alphaInterests: data.input.interests,
                                    }
                                }
                            });
                        }}
                        target={<PlaceholderButton
                            onClick={() => {
                                //
                            }}
                            text={TextOrganizationProfile.placeholderOverviewGeneralButton}
                            alignSelf="flex-start"
                        />}
                    >
                        <XVertical>
                            <XFormLoadingContent>
                                <XVertical flexGrow={1}>
                                    <XFormField
                                        title={TextOrganizationProfile.placeholderOverviewGeneralModalOrganizationTypeTitle}
                                        description={TextOrganizationProfile.placeholderOverviewGeneralModalOrganizationTypeDescription}
                                        field="input.organizationType"
                                    >
                                        <XSelect
                                            creatable={true}
                                            multi={true}
                                            field="input.organizationType"
                                            options={OrgCategoties}
                                        />
                                    </XFormField>
                                    <XFormField
                                        title={TextOrganizationProfile.placeholderOverviewGeneralModalLocations}
                                        field="input.locations"
                                    >
                                        <XSelect
                                            creatable={true}
                                            multi={true}
                                            field="input.locations"
                                            options={[...Cities, ...MetropolitanAreas, ...States, ...MultiStateRegions].map(e => ({ label: e, value: e }))}
                                        />
                                    </XFormField>
                                    <XFormField
                                        title={TextOrganizationProfile.placeholderOverviewGeneralModalInterests}
                                        field="input.interests"
                                    >
                                        <XSelect creatable={true} multi={true} field="input.interests" options={TextDirectoryData.interestPicker} />
                                    </XFormField>
                                </XVertical>
                            </XFormLoadingContent>
                        </XVertical>
                    </XModalForm>

                </XVertical>

            </XHorizontal>
        </Placeholder>
    ) : null);

});

class Closable extends React.Component<{ ckey: string, content: (closeCallback: () => void) => any }> {

    onClose = (strorage: SharedStorage) => {
        strorage.writeValue('is_' + this.props.ckey + '_closed', 'yep');
        this.setState({ closed: true });
    }
    render() {
        return (
            <XStorageContext.Consumer>
                {(storage) => {
                    if (!storage) {
                        throw Error('Cookies not configured!');
                    }

                    return !storage.readValue('is_' + this.props.ckey + '_closed') ? this.props.content(() => this.onClose(storage)) : null;
                }}
            </XStorageContext.Consumer>
        );
    }
}

export const DOListingPlaceholder = withMyOrganizationProfile((props) => {
    if (!(props.data && props.data.organizationProfile)) {
        return null;
    }
    return (
        (
            !(props.data.organizationProfile.developmentOportunities || []).length
        ) ? (
                <Closable
                    ckey="DOListingPlaceholder"
                    content={close => (
                        <Placeholder>
                            <Close
                                icon="close"
                                onClick={() => {
                                    close();
                                    (props as any).closeCallback();
                                }}
                            />
                            <XVertical>
                                <XHorizontalMargins marginLeft={24} marginRight={32}>

                                    <PlaceholderIcon src={'/static/img/icons/organization/profile/placeholder_do.svg'} />
                                    <XVertical>
                                        <PlaceholderText>{TextOrganizationProfile.placeholderListongsDoMainText}</PlaceholderText>
                                        <PlaceholderButton query={{ field: 'addListing', value: 'DO' }} style="primary" text={TextOrganizationProfile.placeholderListingsDoButton} />
                                    </XVertical>

                                </XHorizontalMargins>
                            </XVertical>

                        </Placeholder>
                    )}
                />

            ) : null);
}) as React.ComponentClass<{ closeCallback: () => void }>;

export const ARListingPlaceholder = withMyOrganizationProfile((props) => {
    if (!(props.data && props.data.organizationProfile)) {
        return null;
    }
    return (
        props.data.organizationProfile && (
            !(props.data.organizationProfile.acquisitionRequests || []).length
        ) ? (
                <Closable
                    ckey="ArListingPlaceholder"
                    content={close => (
                        <Placeholder>
                            <Close
                                icon="close"
                                onClick={() => {
                                    close();
                                    (props as any).closeCallback();
                                }}
                            />
                            <XVertical>
                                <XHorizontalMargins marginLeft={24} marginRight={32}>

                                    <PlaceholderIcon src={'/static/img/icons/organization/profile/placeholder_ar.svg'} />
                                    <XVertical>
                                        <PlaceholderText>{TextOrganizationProfile.placeholderListongsArMainText}</PlaceholderText>
                                        <PlaceholderButton query={{ field: 'addListing', value: 'AR' }} style="primary" text={TextOrganizationProfile.placeholderListingsArButton} />
                                    </XVertical>

                                </XHorizontalMargins>
                            </XVertical>

                        </Placeholder>
                    )}
                />

            ) : null);
}) as React.ComponentClass<{ closeCallback: () => void }>;

class DOARListingPlaceholderInner extends React.Component<{ organizationProfile: any }> {

    doClosed = () => {
        this.setState({
            doClosed: true
        });
    }

    arClosed = () => {
        this.setState({
            arClosed: true
        });
    }
    render() {
        console.warn(this.state);
        return (
            <XStorageContext.Consumer>
                {(storage) => {
                    if (!storage) {
                        throw Error('Cookies not configured!');
                    }
                    let doClosed = storage.readValue('is_DOListingPlaceholder_closed');
                    let arClosed = storage.readValue('is_ArListingPlaceholder_closed');
                    return (this.props.organizationProfile && ((!(this.props.organizationProfile.developmentOportunities || []).length) ||
                        (!(this.props.organizationProfile.acquisitionRequests || []).length)) && !(doClosed && arClosed)) ? (<XHorizontal ><DOListingPlaceholder closeCallback={this.doClosed} /><ARListingPlaceholder closeCallback={this.arClosed} /></XHorizontal>) : null;
                }}
            </XStorageContext.Consumer>
        );
    }
}

export const DOARListingPlaceholder = withMyOrganizationProfile((props) => {
    if (!(props.data && props.data.organizationProfile)) {
        return null;
    }
    return (<DOARListingPlaceholderInner organizationProfile={props.data.organizationProfile} />);
});

export const NewsPlaceholder = withMyOrganizationProfile((props) => {
    if (!(props.data && props.data.organizationProfile)) {
        return null;
    }
    return (props.data.organizationProfile.developmentOportunities ? (
        <Closable
            ckey="NewsPlaceholder"
            content={close => (
                <Placeholder>
                    <Close
                        icon="close"
                        onClick={() => {
                            // Todo handle close
                        }}
                    />
                    <XVertical>
                        <XHorizontal>

                            <PlaceholderIcon src={'/static/img/icons/organization/profile/placeholder_do.svg'} />
                            <XVertical>
                                <PlaceholderText>Share your recent press coverage</PlaceholderText>
                                <PlaceholderButton
                                    style="primary"
                                    onClick={() => {
                                        //
                                    }}
                                    text="Add article"
                                    alignSelf="flex-start"
                                />
                            </XVertical>

                        </XHorizontal>
                    </XVertical>
                </Placeholder>
            )}
        />

    ) : null);
});

const XCardStyled = Glamorous(XCard)<{ padding?: number, paddingTop?: number, paddingBottom?: number }>((props) => ({
    borderRadius: 5,
    padding: props.padding !== undefined ? props.padding : 24,
    paddingTop: props.paddingTop,
    paddingBottom: props.paddingBottom
}));

const Text = Glamorous.div<{ opacity?: number }>((props) => ({
    opacity: props.opacity,
    display: 'flex',
    alignItems: 'center',
    fontSize: 15,
    lineHeight: 1.33,
    color: '#334562',
}));

export const AboutPlaceholder = withMyOrganizationProfile((props) => {
    if (!(props.data && props.data.organizationProfile)) {
        return null;
    }
    return (
        <XModalForm
            defaultData={{
                input: {
                    about: props.data.organizationProfile!!.about,
                }
            }}
            defaultAction={async (data) => {
                await props.updateOrganizaton({
                    variables: {
                        input: {
                            about: data.input.about,
                        }
                    }
                });
            }}
            target={(props as any).target || (
                <XButton text="About" iconRight="add" />
            )}
            title={TextOrganizationProfile.placeholderAboutModalAboutTitle}
            useTopCloser={true}
        >
            <XVertical>
                <XFormLoadingContent>
                    <XFormField field="fields.input.about">
                        <XTextArea valueStoreKey="fields.input.about" placeholder="Description" />
                    </XFormField>
                </XFormLoadingContent>
            </XVertical>
        </XModalForm>

    );
}) as React.ComponentType<{ target?: any }>;

export const SocialPlaceholder = withMyOrganizationProfile((props) => {
    if (!(props.data && props.data.organizationProfile)) {
        return null;
    }
    return (
        <XModalForm
            title={TextOrganizationProfile.placeholderSocialModalTitle}
            useTopCloser={true}
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
            target={(props as any).target || (
                <XButton text="Links" iconRight="add" />
            )}
        >
            <XFormLoadingContent>
                <XVertical flexGrow={1} separator={8}>
                    <XFormField field="input.website">
                        <XHorizontal separator={7}>
                            <XInput flexGrow={1} placeholder={TextOrganizationProfile.placeholderSocialModalWeb} field="input.website" size="r-default" />
                            <XInput flexGrow={1} placeholder={TextOrganizationProfile.placeholderSocialLinkTitlePlaceholder} field="input.websiteTitle" size="r-default" />
                        </XHorizontal>
                    </XFormField>
                    <XFormField field="input.twitter">
                        <XInput placeholder={TextOrganizationProfile.placeholderSocialModalTwitter} field="input.twitter" size="r-default" />
                    </XFormField>
                    <XFormField field="input.facebook">
                        <XInput placeholder={TextOrganizationProfile.placeholderSocialModalFacebook} field="input.facebook" size="r-default" />
                    </XFormField>
                    <XFormField field="input.linkedin">
                        <XInput placeholder={TextOrganizationProfile.placeholderSocialModalLinkedIn} field="input.linkedin" size="r-default" />
                    </XFormField>
                </XVertical>
            </XFormLoadingContent>
        </XModalForm>

    );
}) as React.ComponentType<{ target?: any }>;

export const ContactPlaceholder = withMyOrganizationProfile((props) => {
    if (!(props.data && props.data.organizationProfile)) {
        return null;
    }
    return (
        <XModalForm
            title={TextOrganizationProfile.placeholderContactsModalTitle}
            defaultData={{
                contacts: props.data.organizationProfile!!.contacts,
            }}
            defaultAction={async (data) => {
                data.contacts.push({
                    name: (data.firstName || '') + ' ' + (data.lastName || ''),
                    phone: data.phone,
                    photoRef: data.avatar,
                    email: data.email,
                    link: data.link,
                    role: data.role,
                });
                await props.updateOrganizaton({
                    variables: {
                        input: {
                            contacts: data.contacts
                        }
                    }
                });
            }}
            target={(
                <div style={{ cursor: 'pointer' }}>
                    <XHorizontal alignItems="center">
                        <PlaceholderContact />
                        <Text marginWidth={18}>{TextOrganizationProfile.placeholderContacts}</Text>
                    </XHorizontal>
                </div>
            )}
        >
            <ModalFormContentWrapper>
                <XFormLoadingContent>
                    <XHorizontal>
                        <XVertical flexGrow={1} separator={8}>
                            <XFormField field="firstName" title={TextOrganizationProfile.placeholderContactsModalFirstNameTitle}>
                                <XInput field="firstName" placeholder={TextOrganizationProfile.placeholderContactsModalFirstNamePlaceholder} size="medium" />
                            </XFormField>
                            <XFormField field="lastName" title={TextOrganizationProfile.placeholderContactsModalLastNameTitle}>
                                <XInput field="lastName" placeholder={TextOrganizationProfile.placeholderContactsModalLastNamePlaceholder} size="medium" />
                            </XFormField>
                            <XFormField field="position" title={TextOrganizationProfile.placeholderContactsModalPositionTitle}>
                                <XInput field="position" placeholder={TextOrganizationProfile.placeholderContactsModalPositionPlaceholder} size="medium" />
                            </XFormField>
                            <XFormField field="link" title={TextOrganizationProfile.placeholderContactsModalLinkedinTitle}>
                                <XInput field="link" placeholder={TextOrganizationProfile.placeholderContactsModalLinkedinPlaceholder} size="medium" />
                            </XFormField>
                            <XFormField field="twitter" title={TextOrganizationProfile.placeholderContactsModalTwitterTitle}>
                                <XInput field="twitter" placeholder={TextOrganizationProfile.placeholderContactsModalTwitterPlaceholder} size="medium" />
                            </XFormField>
                        </XVertical>
                        <XFormField field="photoRef" title={TextOrganizationProfile.placeholderContactsModalPhotoTitle}>
                            <XAvatarUpload field="photoRef" />
                        </XFormField>
                    </XHorizontal>
                </XFormLoadingContent>
            </ModalFormContentWrapper>
        </XModalForm>
    );
});

export const InterestsPlaceholder = withMyOrganizationProfile((props) => {
    if (!(props.data && props.data.organizationProfile)) {
        return null;
    }
    return (
        <XModalForm
            title="Add channel"
            defaultData={{
                input: {
                    interests: props.data.organizationProfile!!.interests,
                }
            }}
            defaultAction={async (data) => {
                await props.updateOrganizaton({
                    variables: {
                        input: {
                            alphaInterests: data.input.interests,
                        }
                    }
                });
            }}
            target={(
                <div style={{ cursor: 'pointer' }}>
                    <XCardStyled padding={18}>
                        <XHorizontal alignItems="center">
                            <PlaceholderInterests /><Text marginWidth={18}>Add channel</Text>
                        </XHorizontal>
                    </XCardStyled>
                </div>
            )}
        >
            <ModalFormContentWrapper>
                <XFormLoadingContent>
                    <XFormField field="input.interests" title="Channels">
                        <XSelect creatable={true} multi={true} field="input.interests" options={TextDirectoryData.interestPicker} />
                    </XFormField>
                </XFormLoadingContent>
            </ModalFormContentWrapper>
        </XModalForm>
    );
});

const LocationSelectContent = Glamorous(XVertical)({
    paddingTop: 24,
});

const LocationInputWrapper = Glamorous.div({
    paddingLeft: 24,
    paddingRight: 24
});

class LocationSelect extends React.Component<{}, { val?: string }> {
    constructor(props: {}) {
        super(props);
        this.state = { val: '' };
    }
    render() {
        return (
            <LocationSelectContent separator={12}>
                <LocationInputWrapper>
                    <XSelect
                        field="input.locations"
                        render={<XSelectCustomInputRender flexGrow={1} width="100%" flexShrink={0} placeholder="Just typing..." />}
                        onInputChange={v => { this.setState({ val: v }); return v; }}
                        creatable={true}
                    />
                </LocationInputWrapper>
                <XStoreContext.Consumer>
                    {(store) => {
                        let locations: string[] = store ? store.readValue('fields.input.locations') || [] : [];
                        return (
                            <LocationControlledPicker
                                query={this.state.val}
                                onPick={(l) => {
                                    // prevent duplicates
                                    if (locations.indexOf(l.value) === -1) {
                                        locations.push(l.value);
                                    }
                                    if (store) {
                                        store.writeValue('fields.input.locations', locations);
                                    }
                                }}
                            />

                        );
                    }}
                </XStoreContext.Consumer>
            </LocationSelectContent>
        );
    }
}

const HeaderPlaceholderWrap = Glamorous(XHorizontal)<{ marginTop: number }>(props => ({
    cursor: 'pointer',
    alignItems: 'center',
    marginTop: props.marginTop,
}));

export const LocationPlaceholder = withMyOrganizationProfile((props) => {
    if (!(props.data && props.data.organizationProfile)) {
        return null;
    }
    return (
        <XModalForm
            title="Edit locations"
            useTopCloser={true}
            defaultData={{
                input: {
                    locations: props.data.organizationProfile!!.locations,
                }
            }}
            defaultAction={async (data) => {
                await props.updateOrganizaton({
                    variables: {
                        input: {
                            alphaLocations: data.input.locations,
                        }
                    }
                });
            }}
            target={(props as any).target || (
                <XButton text="Locations" icon="add" />
            )}
        >
            <XFormLoadingContent>
                <XSelect
                    creatable={true}
                    multi={true}
                    render={<XSelectCustomInputRender rounded={true} popper={true} />}
                    field="input.locations"
                    options={[...Cities, ...MetropolitanAreas, ...States, ...MultiStateRegions].map(e => ({ label: e, value: e }))}
                />
            </XFormLoadingContent>
        </XModalForm>
    );
}) as React.ComponentType<{ target?: any }>;

export const CategoriesPlaceholder = withMyOrganizationProfile((props) => {
    if (!(props.data && props.data.organizationProfile)) {
        return null;
    }
    return (
        <XModalForm
            title="Edit categories"
            useTopCloser={true}
            defaultData={{
                input: {
                    organizationType: props.data.organizationProfile!!.organizationType,
                }
            }}
            defaultAction={async (data) => {
                await props.updateOrganizaton({
                    variables: {
                        input: {
                            alphaOrganizationType: data.input.organizationType,
                        }
                    }
                });
            }}
            target={(props as any).target || (
                <XButton text="Categories" icon="add" />
            )}
        >
            <XFormLoadingContent>
                <XSelect
                    creatable={true}
                    multi={true}
                    field="input.organizationType"
                    render={<XSelectCustomInputRender rounded={true} popper={true} />}
                    options={TextDirectoryData.categoryPicker.categories}
                />
            </XFormLoadingContent>
        </XModalForm>

    );
}) as React.ComponentType<{ target?: any }>;

export const EmptyPlaceholder = () => {
    return (
        <CenteredPlaceholder>
            <XVertical separator={4} alignItems="center">
                <PlaceholderIcon src={'/static/img/icons/organization/profile/placeholder_info.svg'} />
                <PlaceholderViewerText>There is no organisation overview yet</PlaceholderViewerText>
                <PlaceholderSubText>Follow to get notified about new updates</PlaceholderSubText>
            </XVertical>

        </CenteredPlaceholder>
    );
};

const OrganizationFollowBtn = withOrganizationFollow((props) => {
    return (
        <XMutation mutation={props.followOrganization} variables={{ organizationId: (props as any).organizationId, follow: !(props as any).followed }}>
            <XButton
                iconOpacity={0.4}
                style={(props as any).followed ? 'ghost' : 'primary'}
                text={(props as any).followed ? TextOrganizationProfile.placeholderSemiEmptyUnFolow : TextOrganizationProfile.placeholderSemiEmptyFollow}
                icon={(props as any).followed ? 'check' : undefined}
            />
        </XMutation>
    );
}) as React.ComponentType<{ organizationId: string, followed: boolean }>;

export const SemiEmptyPlaceholder = (props: { followed: boolean, orgId: string }) => {
    return (
        <SmallPlaceholder>
            <XHorizontalMargins marginLeft={32} marginTop={31} marginRight={27} marginBottom={25} alignItems="center">
                <PlaceholderIcon src={'/static/img/icons/organization/profile/placeholder_do.svg'} />
                <XVertical flexGrow={1} separator={1}>
                    <PlaceholderText marginLeft={0}>{TextOrganizationProfile.placeholderSemiEmptyTitle}</PlaceholderText>
                    <PlaceholderSubText >{TextOrganizationProfile.placeholderSemiEmptySubTitle}</PlaceholderSubText>
                </XVertical>

                <OrganizationFollowBtn followed={props.followed} organizationId={props.orgId} />

            </XHorizontalMargins>
        </SmallPlaceholder>
    );
};

const LogoPlaceholder = Glamorous(XVertical)({
    cursor: 'pointer',
    width: 110,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    border: 'solid 0.8px rgba(0, 0, 0, 0.07)',
    borderRadius: 8,
    marginTop: -20
});

const PlaceholderAvatarText = Glamorous.span({
    ...XStyles.text.h400,
    color: 'rgba(51, 69, 98, 0.5)',
    letterSpacing: '-0.5px'
});

const LogoPlaceholderIcon = Glamorous(XIcon)({
    color: '#654bfa',
    opacity: 0.6,
    fontSize: 30,
    width: 30,
    height: 30,

});

export const AvatartPlaceholder = withMyOrganizationProfile((props) => {
    if (!(props.data && props.data.organizationProfile)) {
        return null;
    }
    return (
        <XModalForm
            title="Organization logo"
            defaultData={{
                input: {
                    photoRef: sanitizeIamgeRef(props.data.organizationProfile!!.photoRef),
                }
            }}
            defaultAction={async (data) => {
                await props.updateOrganizaton({
                    variables: {
                        input: {
                            photoRef: data.input.photoRef,
                        }
                    }
                });
            }}
            target={(
                <LogoPlaceholder separator="none">
                    <LogoPlaceholderIcon icon="photo_camera" />
                    <PlaceholderAvatarText>{TextOrganizationProfile.placeholderLogo}</PlaceholderAvatarText>
                </LogoPlaceholder>
            )}
        >
            <ModalFormContentWrapper>
                <XFormLoadingContent>
                    <XAvatarUpload field="input.photoRef" cropParams="1:1, free" />
                </XFormLoadingContent>
            </ModalFormContentWrapper>
        </XModalForm>
    );
});
