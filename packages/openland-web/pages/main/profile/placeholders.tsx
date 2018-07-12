import '../../init';
import '../../../globals';
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
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import PlaceholderAbout from './icons/placeholder/placeholder_about.svg';
import PlaceholderSocial from './icons/placeholder/placeholder_social.svg';
import { XTextArea } from 'openland-x/XTextArea';
import { XInput } from 'openland-x/XInput';
import PlaceholderContact from './icons/placeholder/placeholder_contact.svg';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { sanitizeIamgeRef } from '../../../utils/sanitizer';
import { TextOrganizationProfile } from 'openland-text/TextOrganizationProfile';
import { OrgCategoties } from '../directory/categoryPicker';
import { Cities, MetropolitanAreas, States, MultiStateRegions } from '../directory/locationPicker';
import { TextDirectoryData } from 'openland-text/TextDirectory';

const Placeholder = Glamorous(XCard)<{ accent?: boolean }>(props => ({
    backgroundColor: props.accent ? '#654bfa' : '#fff',
    padding: 32,
    paddingLeft: 42,
    minHeight: 165,
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
    borderRadius: 5
}));

const PlaceholderButton = Glamorous(XButton)({
    marginLeft: 16
});

const PlaceholderText = Glamorous.span<{ accent?: boolean }>(props => ({
    marginLeft: 16,
    fontSize: '16px',
    lineHeight: 1.44,
    letterSpacing: '-0.2px',
    marginTop: -20,
    color: props.accent ? '#ffffff' : '#334562'
}));

const PlaceholderIcon = Glamorous.img((props) => ({
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

export const OverviewPlaceholder = withMyOrganizationProfile((props) => {

    return ((props.data.myOrganizationProfile && !props.data.myOrganizationProfile.organizationType && !props.data.myOrganizationProfile.locations && !props.data.myOrganizationProfile.interests) ? (
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
                                organizationType: props.data.myOrganizationProfile!!.organizationType,
                                locations: props.data.myOrganizationProfile!!.locations,
                                interests: props.data.myOrganizationProfile!!.interests,
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
                                <XVertical flexGrow={1} maxWidth={500}>
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
                                        <XSelect creatable={true} multi={true} field="input.interests" options={TextDirectoryData.interestPicker}/>
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

class Closable extends React.Component<{ key: string, content: (closeCallback: () => void) => any }, { closed: boolean }> {

    constructor(props: any) {
        super(props);
        // closed by default to prevent accedently show closed component (SSR dont know about localStorage)
        let closed = true;
        if (canUseDOM) {
            closed = !!(localStorage.getItem('__is' + this.props.key + '_closed'));
        }
        this.state = {
            closed: closed,
        };
    }

    onClose = () => {
        if (canUseDOM) {
            localStorage.setItem('__is' + this.props.key + '_closed', 'yep');
        }
        this.setState({ closed: true });
    }
    render() {
        return (!this.state.closed ? this.props.content(this.onClose) : null);
    }
}

export const DOOverviewPlaceholder = withMyOrganizationProfile((props) => {
    return (
        props.data.myOrganizationProfile && (
            !props.data.myOrganizationProfile.doShapeAndForm &&
            !props.data.myOrganizationProfile.doCurrentUse &&
            !props.data.myOrganizationProfile.doGoodFitFor &&
            !props.data.myOrganizationProfile.doSpecialAttributes &&
            !props.data.myOrganizationProfile.doAvailability
        ) ? (
                <Closable
                    key="DOPlaceholder"
                    content={close => (
                        <Placeholder>
                            <Close
                                icon="close"
                                onClick={close}
                            />
                            <XVertical>
                                <XHorizontal>
                                    <PlaceholderIcon src={'/static/img/icons/organization/profile/placeholder_do.svg'} />
                                    <XVertical maxWidth={452}>
                                        <PlaceholderText>{TextOrganizationProfile.placeholderOverviewDoMainText}</PlaceholderText>
                                        <XModalForm
                                            defaultData={{
                                                input: {
                                                    doShapeAndForm: props.data.myOrganizationProfile!!.doShapeAndForm,
                                                    doCurrentUse: props.data.myOrganizationProfile!!.doCurrentUse,
                                                    doGoodFitFor: props.data.myOrganizationProfile!!.doGoodFitFor,
                                                    doSpecialAttributes: props.data.myOrganizationProfile!!.doSpecialAttributes,
                                                    doAvailability: props.data.myOrganizationProfile!!.doAvailability,
                                                }
                                            }}
                                            defaultAction={async (data) => {
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
                                            target={<PlaceholderButton
                                                style="primary"
                                                text={TextOrganizationProfile.placeholderOverviewDOButton}
                                                alignSelf="flex-start"
                                            />}
                                        >
                                            <XVertical maxWidth={500}>
                                                <XFormLoadingContent>
                                                    <XVertical>
                                                        <XFormField field="input.doShapeAndForm" optional={true} title={TextOrganizationProfile.placeholderOverviewDOModalShapeAndFormTitle}>
                                                            <XSelect
                                                                field="input.doShapeAndForm"
                                                                creatable={true}
                                                                multi={true}
                                                            />
                                                        </XFormField>

                                                        <XFormField field="input.doCurrentUse" optional={true} title={TextOrganizationProfile.placeholderOverviewDOModalCurrentUseTitle}>
                                                            <XSelect
                                                                field="input.doCurrentUse"
                                                                creatable={true}
                                                                multi={true}
                                                            />
                                                        </XFormField>

                                                        <XFormField field="input.doGoodFitFor" optional={true} title={TextOrganizationProfile.placeholderOverviewDOModalGoodFitForTitle}>
                                                            <XSelect
                                                                field="input.doGoodFitFor"
                                                                creatable={true}
                                                                multi={true}
                                                            />
                                                        </XFormField>

                                                        <XFormField field="input.doSpecialAttributes" optional={true} title={TextOrganizationProfile.placeholderOverviewDOModalSpecialAttributesTitle}>
                                                            <XSelect
                                                                field="input.doSpecialAttributes"
                                                                creatable={true}
                                                                multi={true}
                                                            />
                                                        </XFormField>

                                                        <XFormField field="input.doAvailability" optional={true} title={TextOrganizationProfile.placeholderOverviewDOModalAvailabilityTitle}>
                                                            <XSelect
                                                                field="input.doAvailability"
                                                                creatable={true}
                                                                multi={true}
                                                            />
                                                        </XFormField>

                                                    </XVertical>
                                                </XFormLoadingContent>
                                            </XVertical>
                                        </XModalForm>

                                    </XVertical>

                                </XHorizontal>
                            </XVertical>

                        </Placeholder>
                    )}
                />

            ) : null);
});

export const AROverviewPlaceholder = withMyOrganizationProfile((props) => {
    return (
        props.data.myOrganizationProfile && (
            !props.data.myOrganizationProfile.arGeographies &&
            !props.data.myOrganizationProfile.arAreaRange &&
            !props.data.myOrganizationProfile.arHeightLimit &&
            !props.data.myOrganizationProfile.arActivityStatus &&
            !props.data.myOrganizationProfile.arAquisitionBudget &&
            !props.data.myOrganizationProfile.arAquisitionRate &&
            !props.data.myOrganizationProfile.arClosingTime &&
            !props.data.myOrganizationProfile.arSpecialAttributes &&
            !props.data.myOrganizationProfile.arLandUse
        ) ? (
                <Closable
                    key="ARPlaceholder"
                    content={close => (
                        <Placeholder>
                            <Close
                                icon="close"

                                onClick={close}
                            />
                            <XVertical>
                                <XHorizontal>

                                    <PlaceholderIcon src={'/static/img/icons/organization/profile/placeholder_ar.svg'} />
                                    <XVertical maxWidth={452}>
                                        <PlaceholderText>{TextOrganizationProfile.placeholderOverviewArMainText}</PlaceholderText>
                                        <XModalForm
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
                                            target={<PlaceholderButton
                                                style="primary"
                                                text={TextOrganizationProfile.placeholderOverviewArButton}
                                                alignSelf="flex-start"
                                            />}
                                        >
                                            <XVertical maxWidth={500}>
                                                <XFormLoadingContent>
                                                    <XVertical>

                                                        <XFormField field="input.arGeographies" title={TextOrganizationProfile.placegolderOverviewArModalTagRowGeographiesTitle}>
                                                            <XSelect
                                                                field="input.arGeographies"
                                                                creatable={true}
                                                                multi={true}
                                                            />
                                                        </XFormField>

                                                        <XFormField field="input.arAreaRange" optional={true} title={TextOrganizationProfile.placegolderOverviewArModalTagRowAreaRangeTitle}>
                                                            <XSelect
                                                                field="input.arAreaRange"
                                                                creatable={true}
                                                                multi={true}
                                                                options={[{ label: 'up to 10,000 ft²', value: 'up to 10,000 ft²' }, { label: '10,000 ft² - 100,000 ft²', value: '10,000 ft² - 100,000 ft²' }, { label: '100,000+ ft²', value: '100,000+ ft²' }]}
                                                            />
                                                        </XFormField>

                                                        <XFormField field="input.arHeightLimit" optional={true} title={TextOrganizationProfile.placegolderOverviewArModalTagRowHeightLimitTitle}>
                                                            <XSelect
                                                                field="input.arHeightLimit"
                                                                creatable={true}
                                                                multi={true}
                                                            />
                                                        </XFormField>

                                                        <XFormField field="input.arActivityStatus" optional={true} title={TextOrganizationProfile.placegolderOverviewArModalTagRowActivityStatusTitle}>
                                                            <XSelect
                                                                field="input.arActivityStatus"
                                                                creatable={true}
                                                                multi={true}
                                                            />
                                                        </XFormField>

                                                        <XFormField field="input.arAquisitionBudget" optional={true} title={TextOrganizationProfile.placegolderOverviewArModalTagRowAquisitionBudgetTitle}>
                                                            <XSelect
                                                                field="input.arAquisitionBudget"
                                                                creatable={true}
                                                                multi={true}
                                                            />
                                                        </XFormField>

                                                        <XFormField field="input.arAquisitionRate" optional={true} title={TextOrganizationProfile.placegolderOverviewArModalTagRowAquisitionRateTitle}>
                                                            <XSelect
                                                                field="input.arAquisitionRate"
                                                                creatable={true}
                                                                multi={true}
                                                            />
                                                        </XFormField>

                                                        <XFormField field="input.arClosingTime" optional={true} title={TextOrganizationProfile.placegolderOverviewArModalTagRowClosingTimeTitle}>
                                                            <XSelect
                                                                field="input.arClosingTime"
                                                                creatable={true}
                                                                multi={true}
                                                            />
                                                        </XFormField>

                                                        <XFormField field="input.arSpecialAttributes" optional={true} title={TextOrganizationProfile.placegolderOverviewArModalTagRowSpecialAttributesTitle}>
                                                            <XSelect
                                                                field="input.arSpecialAttributes"
                                                                creatable={true}
                                                                multi={true}
                                                            />
                                                        </XFormField>

                                                        <XFormField field="input.arLandUse" optional={true} title={TextOrganizationProfile.placegolderOverviewArModalTagRowLandUseTitle}>
                                                            <XSelect
                                                                field="input.arLandUse"
                                                                creatable={true}
                                                                multi={true}
                                                            />
                                                        </XFormField>

                                                    </XVertical>
                                                </XFormLoadingContent>
                                            </XVertical>
                                        </XModalForm>

                                    </XVertical>

                                </XHorizontal>
                            </XVertical>

                        </Placeholder>
                    )}
                />

            ) : null);
});

export const DOAROverviewPlaceholder = withMyOrganizationProfile((props) => {
    return (
        props.data.myOrganizationProfile && ((!props.data.myOrganizationProfile.doShapeAndForm &&
            !props.data.myOrganizationProfile.doCurrentUse &&
            !props.data.myOrganizationProfile.doGoodFitFor &&
            !props.data.myOrganizationProfile.doSpecialAttributes &&
            !props.data.myOrganizationProfile.doAvailability) ||
            (!props.data.myOrganizationProfile.arGeographies &&
                !props.data.myOrganizationProfile.arAreaRange &&
                !props.data.myOrganizationProfile.arHeightLimit &&
                !props.data.myOrganizationProfile.arActivityStatus &&
                !props.data.myOrganizationProfile.arAquisitionBudget &&
                !props.data.myOrganizationProfile.arAquisitionRate &&
                !props.data.myOrganizationProfile.arClosingTime &&
                !props.data.myOrganizationProfile.arSpecialAttributes &&
                !props.data.myOrganizationProfile.arLandUse)) ? <XHorizontal><DOOverviewPlaceholder /><AROverviewPlaceholder /></XHorizontal> : null);
});

export const DOListingPlaceholder = withMyOrganizationProfile((props) => {
    return (
        (
            !(props.data.myOrganizationProfile.developmentOportunities || []).length
        ) ? (
                <Closable
                    key="DOListingPlaceholder"
                    content={close => (
                        <Placeholder>
                            <Close
                                icon="close"
                                onClick={close}
                            />
                            <XVertical>
                                <XHorizontal>

                                    <PlaceholderIcon src={'/static/img/icons/organization/profile/placeholder_do.svg'} />
                                    <XVertical maxWidth={452}>
                                        <PlaceholderText>{TextOrganizationProfile.placeholderListongsDoMainText}</PlaceholderText>
                                        <PlaceholderButton query={{ field: 'addListing', value: 'DO' }} style="primary" text={TextOrganizationProfile.placeholderListingsDoButton} />
                                    </XVertical>

                                </XHorizontal>
                            </XVertical>

                        </Placeholder>
                    )}
                />

            ) : null);
});

export const ARListingPlaceholder = withMyOrganizationProfile((props) => {
    return (
        props.data.myOrganizationProfile && (
            !(props.data.myOrganizationProfile.acquisitionRequests || []).length
        ) ? (
                <Closable
                    key="ArListingPlaceholder"
                    content={close => (
                        <Placeholder>
                            <Close
                                icon="close"
                                onClick={close}
                            />
                            <XVertical>
                                <XHorizontal>

                                    <PlaceholderIcon src={'/static/img/icons/organization/profile/placeholder_ar.svg'} />
                                    <XVertical maxWidth={452}>
                                        <PlaceholderText>{TextOrganizationProfile.placeholderListongsArMainText}</PlaceholderText>
                                        <PlaceholderButton query={{ field: 'addListing', value: 'AR' }} style="primary" text={TextOrganizationProfile.placeholderListingsArButton} />
                                    </XVertical>

                                </XHorizontal>
                            </XVertical>

                        </Placeholder>
                    )}
                />

            ) : null);
});

export const DOARListingPlaceholder = withMyOrganizationProfile((props) => {
    return (
        props.data.myOrganizationProfile && ((!(props.data.myOrganizationProfile.developmentOportunities || []).length) ||
            (!(props.data.myOrganizationProfile.acquisitionRequests || []).length)) ? <XHorizontal><DOListingPlaceholder /><ARListingPlaceholder /></XHorizontal> : null);
});

export const NewsPlaceholder = withMyOrganizationProfile((props) => {
    return (props.data.myOrganizationProfile.developmentOportunities ? (
        <Closable
            key="NewsPlaceholder"
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
                            <XVertical maxWidth={452}>
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
    return (
        <XModalForm
            defaultData={{
                input: {
                    about: props.data.myOrganizationProfile!!.about,
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
            target={(
                <div style={{ cursor: 'pointer' }}>
                    <XCardStyled padding={18}>
                        <XHorizontal alignItems="center">
                            <PlaceholderAbout /> <Text marginWidth={18}>{TextOrganizationProfile.placeholderAbout}</Text>
                        </XHorizontal>
                    </XCardStyled>
                </div>
            )}
        >
            <XVertical>
                <XFormLoadingContent>
                    <XFormField title={TextOrganizationProfile.placeholderAboutModalAboutTitle} field="fields.input.about">
                        <XTextArea valueStoreKey="fields.input.about" />
                    </XFormField>
                </XFormLoadingContent>
            </XVertical>
        </XModalForm>

    );
});

export const SocialPlaceholder = withMyOrganizationProfile((props) => {
    return (
        <XModalForm
            title={TextOrganizationProfile.placeholderSocialModalTitle}
            defaultData={{
                input: {
                    website: props.data.myOrganizationProfile!!.website,
                    twitter: props.data.myOrganizationProfile!!.twitter,
                    facebook: props.data.myOrganizationProfile!!.facebook,
                    linkedin: props.data.myOrganizationProfile!!.linkedin,
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
            target={(
                <div style={{ cursor: 'pointer' }}>
                    <XHorizontal alignItems="center">
                        <PlaceholderSocial /> <Text marginWidth={18}>{TextOrganizationProfile.placeholderSocial}</Text>
                    </XHorizontal>
                </div>
            )}
        >
            <XVertical>
                <XFormLoadingContent>
                    <XFormField field="input.website" optional={true} title={TextOrganizationProfile.placeholderSocialModalWeb}>
                        <XInput field="input.website" />
                    </XFormField>
                    <XFormField field="input.twitter" optional={true} title={TextOrganizationProfile.placeholderSocialModalTwitter}>
                        <XInput field="input.twitter" />
                    </XFormField>
                    <XFormField field="input.facebook" optional={true} title={TextOrganizationProfile.placeholderSocialModalFacebook}>
                        <XInput field="input.facebook" />
                    </XFormField>
                    <XFormField field="input.linkedin" optional={true} title={TextOrganizationProfile.placeholderSocialModalLinkedIn}>
                        <XInput field="input.linkedin" />
                    </XFormField>
                </XFormLoadingContent>
            </XVertical>
        </XModalForm>

    );
});

export const ContactPlaceholder = withMyOrganizationProfile((props) => {
    return (
        <XModalForm
            title={TextOrganizationProfile. placeholderContactsModalTitle}
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
                            contacts: data.contacts
                        }
                    }
                });
            }}
            target={(
                <div style={{ cursor: 'pointer' }}>
                    <XHorizontal alignItems="center">
                        <PlaceholderContact /> <Text marginWidth={18}>{TextOrganizationProfile. placeholderContacts}</Text>
                    </XHorizontal>
                </div>
            )}
        >
            <XFormLoadingContent>
                <XVertical>
                    <XFormField field="name" optional={true} title={TextOrganizationProfile.placeholderContactsModalNameTitle}>
                        <XInput field="name" required={true} />
                    </XFormField>
                    <XFormField field="phone" optional={true} title={TextOrganizationProfile.placeholderContactsModalPhonelTitle}>
                        <XInput field="phone" />
                    </XFormField>
                    <XFormField field="email" optional={true} title={TextOrganizationProfile.placeholderContactsModalEmailTitle}>
                        <XInput field="email" />
                    </XFormField>
                    <XFormField field="link" optional={true} title={TextOrganizationProfile.placeholderContactsModalLinkedinTitle}>
                        <XInput field="link" />
                    </XFormField>
                    <XFormField field="position" optional={true} title={TextOrganizationProfile.placeholderContactsModalPositionTitle}>
                        <XInput field="position" />
                    </XFormField>
                    <XFormField field="photoRef" optional={true} title={TextOrganizationProfile.placeholderContactsModalPhotoTitle}>
                        <XAvatarUpload field="photoRef" />
                    </XFormField>
                </XVertical>
            </XFormLoadingContent>
        </XModalForm>

    );
});

export const LocationPlaceholder = withMyOrganizationProfile((props) => {
    return (
        <XModalForm
            defaultData={{
                input: {
                    locations: props.data.myOrganizationProfile!!.locations,
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
            target={(
                <div style={{ cursor: 'pointer' }}>
                    <Text opacity={0.5}>{TextOrganizationProfile.placeholderLocation}</Text>
                </div>
            )}
        >
            <XVertical>
                <XFormLoadingContent>
                    <XFormField
                        title={TextOrganizationProfile.placeholderLocationModalLocationTitle}
                        field="input.locations"
                    >
                        <XSelect
                            creatable={true}
                            multi={true}
                            field="input.locations"
                            options={[...Cities, ...MetropolitanAreas, ...States, ...MultiStateRegions].map(e => ({ label: e, value: e }))}

                        />
                    </XFormField>
                </XFormLoadingContent>
            </XVertical>
        </XModalForm>

    );
});

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
    return (
        <XModalForm
            defaultData={{
                input: {
                    photoRef: sanitizeIamgeRef(props.data.myOrganizationProfile!!.photoRef),
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
            <XVertical>
                <XFormLoadingContent>
                    <XFormField title={TextOrganizationProfile.placeholderLogoModalLocationTitle}>
                        <XAvatarUpload field="input.photoRef" />
                    </XFormField>
                </XFormLoadingContent>
            </XVertical>
        </XModalForm>
    );
});
