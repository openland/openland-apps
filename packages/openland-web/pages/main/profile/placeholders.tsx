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
import { Cities, MetropolitanAreas, States, MultiStateRegions, LocationControlledPicker } from '../directory/locationPicker';
import { TextDirectoryData } from 'openland-text/TextDirectory';
import { XStoreContext } from 'openland-x-store/XStoreContext';
import { XSelectCustom } from 'openland-x/basics/XSelectCustom';
import { XWithRole } from 'openland-x-permissions/XWithRole';

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
    if (!(props.data && props.data.organizationProfile)) {
        return null;
    }
    return (
        props.data.organizationProfile && (
            !props.data.organizationProfile.doShapeAndForm &&
            !props.data.organizationProfile.doCurrentUse &&
            !props.data.organizationProfile.doGoodFitFor &&
            !props.data.organizationProfile.doSpecialAttributes &&
            !props.data.organizationProfile.doAvailability
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
                                                    doShapeAndForm: props.data.organizationProfile!!.doShapeAndForm,
                                                    doCurrentUse: props.data.organizationProfile!!.doCurrentUse,
                                                    doGoodFitFor: props.data.organizationProfile!!.doGoodFitFor,
                                                    doSpecialAttributes: props.data.organizationProfile!!.doSpecialAttributes,
                                                    doAvailability: props.data.organizationProfile!!.doAvailability,
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
    if (!(props.data && props.data.organizationProfile)) {
        return null;
    }
    return (
        props.data.organizationProfile && (
            !props.data.organizationProfile.arGeographies &&
            !props.data.organizationProfile.arAreaRange &&
            !props.data.organizationProfile.arHeightLimit &&
            !props.data.organizationProfile.arActivityStatus &&
            !props.data.organizationProfile.arAquisitionBudget &&
            !props.data.organizationProfile.arAquisitionRate &&
            !props.data.organizationProfile.arClosingTime &&
            !props.data.organizationProfile.arSpecialAttributes &&
            !props.data.organizationProfile.arLandUse
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
                                                    arGeographies: props.data.organizationProfile!!.arGeographies,
                                                    arAreaRange: props.data.organizationProfile!!.arAreaRange,
                                                    arHeightLimit: props.data.organizationProfile!!.arHeightLimit,
                                                    arActivityStatus: props.data.organizationProfile!!.arActivityStatus,
                                                    arAquisitionBudget: props.data.organizationProfile!!.arAquisitionBudget,
                                                    arAquisitionRate: props.data.organizationProfile!!.arAquisitionRate,
                                                    arClosingTime: props.data.organizationProfile!!.arClosingTime,
                                                    arSpecialAttributes: props.data.organizationProfile!!.arSpecialAttributes,
                                                    arLandUse: props.data.organizationProfile!!.arLandUse,
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
    if (!(props.data && props.data.organizationProfile)) {
        return null;
    }
    return (
        props.data.organizationProfile && ((!props.data.organizationProfile.doShapeAndForm &&
            !props.data.organizationProfile.doCurrentUse &&
            !props.data.organizationProfile.doGoodFitFor &&
            !props.data.organizationProfile.doSpecialAttributes &&
            !props.data.organizationProfile.doAvailability) ||
            (!props.data.organizationProfile.arGeographies &&
                !props.data.organizationProfile.arAreaRange &&
                !props.data.organizationProfile.arHeightLimit &&
                !props.data.organizationProfile.arActivityStatus &&
                !props.data.organizationProfile.arAquisitionBudget &&
                !props.data.organizationProfile.arAquisitionRate &&
                !props.data.organizationProfile.arClosingTime &&
                !props.data.organizationProfile.arSpecialAttributes &&
                !props.data.organizationProfile.arLandUse)) ? <XHorizontal><DOOverviewPlaceholder /><AROverviewPlaceholder /></XHorizontal> : null);
});

export const DOListingPlaceholder = withMyOrganizationProfile((props) => {
    if (!(props.data && props.data.organizationProfile)) {
        return null;
    }
    return (
        (
            !(props.data.organizationProfile.developmentOportunities || []).length
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
    if (!(props.data && props.data.organizationProfile)) {
        return null;
    }
    return (
        props.data.organizationProfile && (
            !(props.data.organizationProfile.acquisitionRequests || []).length
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
    if (!(props.data && props.data.organizationProfile)) {
        return null;
    }
    return (
        props.data.organizationProfile && ((!(props.data.organizationProfile.developmentOportunities || []).length) ||
            (!(props.data.organizationProfile.acquisitionRequests || []).length)) ? <XHorizontal><DOListingPlaceholder /><ARListingPlaceholder /></XHorizontal> : null);
});

export const NewsPlaceholder = withMyOrganizationProfile((props) => {
    if (!(props.data && props.data.organizationProfile)) {
        return null;
    }
    return (props.data.organizationProfile.developmentOportunities ? (
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
    if (!(props.data && props.data.organizationProfile)) {
        return null;
    }
    return (
        <XModalForm
            title={TextOrganizationProfile.placeholderSocialModalTitle}
            clearContentPadding={true}
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
            target={(
                <div style={{ cursor: 'pointer' }}>
                    <XHorizontal alignItems="center">
                        <PlaceholderSocial /> <Text marginWidth={18}>{TextOrganizationProfile.placeholderSocial}</Text>
                    </XHorizontal>
                </div>
            )}
        >
            <ModalFormContentWrapper>
                <XFormLoadingContent>
                    <XVertical flexGrow={1} separator={8}>
                        <XFormField field="input.website" title={TextOrganizationProfile.placeholderSocialModalWeb}>
                            <XHorizontal separator={7}>
                                <XInput flexGrow={1} placeholder={TextOrganizationProfile.placeholderSocialInputPlaceholder} field="input.website" size="medium" />
                                <XInput flexGrow={1} placeholder={TextOrganizationProfile.placeholderSocialLinkTitlePlaceholder} field="input.websiteTitle" size="medium" />
                            </XHorizontal>
                        </XFormField>
                        <XFormField field="input.twitter" title={TextOrganizationProfile.placeholderSocialModalTwitter}>
                            <XInput placeholder={TextOrganizationProfile.placeholderSocialInputPlaceholder} field="input.twitter" size="medium" />
                        </XFormField>
                        <XFormField field="input.facebook" title={TextOrganizationProfile.placeholderSocialModalFacebook}>
                            <XInput placeholder={TextOrganizationProfile.placeholderSocialInputPlaceholder} field="input.facebook" size="medium" />
                        </XFormField>
                        <XFormField field="input.linkedin" title={TextOrganizationProfile.placeholderSocialModalLinkedIn}>
                            <XInput placeholder={TextOrganizationProfile.placeholderSocialInputPlaceholder} field="input.linkedin" size="medium" />
                        </XFormField>
                    </XVertical>
                </XFormLoadingContent>
            </ModalFormContentWrapper>
        </XModalForm>

    );
});

export const ContactPlaceholder = withMyOrganizationProfile((props) => {
    if (!(props.data && props.data.organizationProfile)) {
        return null;
    }
    return (
        <XModalForm
            clearContentPadding={true}
            title={TextOrganizationProfile. placeholderContactsModalTitle}
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
                        <PlaceholderContact /> <Text marginWidth={18}>{TextOrganizationProfile. placeholderContacts}</Text>
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
                        render={<XSelectCustom flexGrow={1} width="100%" flexShrink={0} placeholder="Just typing..." />}
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
                                    if (locations.indexOf(l) === -1) {
                                        locations.push(l);
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

export const LocationPlaceholder = withMyOrganizationProfile((props) => {
    if (!(props.data && props.data.organizationProfile)) {
        return null;
    }
    return (
        <XModalForm
            title="Add locations"
            size="large"
            clearContentPadding={true}
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
            target={(
                <div style={{ cursor: 'pointer' }}>
                    <Text opacity={0.5}>{TextOrganizationProfile.placeholderLocation}</Text>
                </div>
            )}
        >
            <XFormLoadingContent>
                <XWithRole role="software-developer" negate={true}>
                    <XSelect
                        creatable={true}
                        multi={true}
                        field="input.locations"
                        options={[...Cities, ...MetropolitanAreas, ...States, ...MultiStateRegions].map(e => ({ label: e, value: e }))}
                    />
                </XWithRole>
                <XWithRole role="software-developer" >
                    <LocationSelect />
                </XWithRole>
            </XFormLoadingContent>
        </XModalForm>
    );
});

const ModalFormContentWrapper = Glamorous.div({
    padding: 24,
});

export const CategoriesPlaceholder = withMyOrganizationProfile((props) => {
    if (!(props.data && props.data.organizationProfile)) {
        return null;
    }
    return (
        <XModalForm
            title="Add categories"
            clearContentPadding={true}
            defaultData={{
                input: {
                    locations: props.data.organizationProfile!!.organizationType,
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
            target={(
                <div style={{ cursor: 'pointer' }}>
                    <Text opacity={0.5}>{TextOrganizationProfile.placeholderCategory}</Text>
                </div>
            )}
        >
            <ModalFormContentWrapper>
                <XFormLoadingContent>
                    <XSelect
                        creatable={true}
                        multi={true}
                        field="input.organizationType"
                        options={TextDirectoryData.categoryPicker.categories}
                    />
                </XFormLoadingContent>
            </ModalFormContentWrapper>
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
    if (!(props.data && props.data.organizationProfile)) {
        return null;
    }
    return (
        <XModalForm
            title="Organization logo"
            clearContentPadding={true}
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
