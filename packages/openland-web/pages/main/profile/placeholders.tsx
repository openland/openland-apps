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
import PlaceholderAbout from './placeholder_about.svg';
import PlaceholderSocial from './placeholder_social.svg';
import { XTextArea } from 'openland-x/XTextArea';
import { XInput } from 'openland-x/XInput';
import PlaceholderContact from './placeholder_contact.svg';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { sanitizeIamgeRef } from '../../../utils/sanitizer';

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
    fontSize: '18px',
    lineHeight: 1.44,
    letterSpacing: '-0.1px',
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

    return ((!props.data.myOrganizationProfile.organizationType && !props.data.myOrganizationProfile.geographies && !props.data.myOrganizationProfile.lookingFor) ? (
        <Placeholder accent={true}>
            <XHorizontal>
                <PlaceholderIcon src={'/static/img/icons/organization/profile/placeholder_overview.svg'} />
                <XVertical>
                    {/* <PlaceholderText accent={true}>Your account has been created - now it will be easier to connect with real estate companies. To make most of it we recommend to share more information about your company. </PlaceholderText> */}
                    <PlaceholderText accent={true}><p>Share your organization type, geographies of operation,</p><p>and what are you looking for</p></PlaceholderText>

                    <XModalForm
                        title="Organization Profile"
                        defaultData={{
                            input: {
                                organizationType: props.data.myOrganizationProfile!!.organizationType,
                                lookingFor: props.data.myOrganizationProfile!!.lookingFor,
                                geographies: props.data.myOrganizationProfile!!.geographies,
                            }
                        }}
                        defaultAction={async (data) => {
                            await props.updateOrganizaton({
                                variables: {
                                    input: {
                                        alphaOrganizationType: data.input.organizationType,
                                        alphaLookingFor: data.input.lookingFor,
                                        alphaGeographies: data.input.geographies,
                                    }
                                }
                            });
                        }}
                        target={<PlaceholderButton
                            onClick={() => {
                                //
                            }}
                            text="Improve Profile"
                            alignSelf="flex-start"
                        />}
                    >
                        <XVertical>
                            <XFormLoadingContent>
                                <XVertical flexGrow={1} maxWidth={500}>
                                    <XFormField
                                        title="What's type of your entity?"
                                        description="Are you corporation, non profit or public entity?"
                                        field="input.organizationType"
                                    >
                                        <XSelect
                                            creatable={true}
                                            multi={false}
                                            field="input.organizationType"
                                            options={[
                                                { value: 'Public', label: 'Public', },
                                                { value: 'Corporation', label: 'Corporation' },
                                                { value: 'Nonprofit Corporation', label: 'Nonprofit Corporation' }
                                            ]}
                                        />
                                    </XFormField>
                                    <XFormField
                                        title="What are you looking for?"
                                        description="Tell us more about your goals. What you are struggling to find?"
                                        field="input.lookingFor"
                                    >
                                        <XSelect creatable={true} multi={true} field="input.lookingFor" />
                                    </XFormField>
                                    <XFormField
                                        title="Where are you looking for deals?"
                                        description="Whole US? Specific state or city?"
                                        field="input.geographies"
                                    >
                                        <XSelect creatable={true} multi={true} field="input.geographies" />
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
        (
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
                                        <PlaceholderText>Do you own development sites?</PlaceholderText>
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
                                                text="Describe your portfolio"
                                                alignSelf="flex-start"
                                            />}
                                        >
                                            <XVertical maxWidth={500}>
                                                <XFormLoadingContent>
                                                    <XVertical>
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
        (
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
                                        <PlaceholderText>Are you intrested in land aquisition?</PlaceholderText>
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
                                                text="Share your criteria"
                                                alignSelf="flex-start"
                                            />}
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
        (!props.data.myOrganizationProfile.doShapeAndForm &&
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
                !props.data.myOrganizationProfile.arLandUse) ? <XHorizontal><DOOverviewPlaceholder /><AROverviewPlaceholder /></XHorizontal> : null);
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
                                        <PlaceholderText>Do you own development sites?</PlaceholderText>
                                        <PlaceholderButton query={{ field: 'addListing', value: 'DO' }} style="primary" text="Add an development opportunity" />
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
        (
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
                                        <PlaceholderText>Do you own development sites?</PlaceholderText>
                                        <PlaceholderButton query={{ field: 'addListing', value: 'AR' }} style="primary" text="Add an acquisition request" />
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
        (!(props.data.myOrganizationProfile.developmentOportunities || []).length) ||
            (!(props.data.myOrganizationProfile.acquisitionRequests || []).length) ? <XHorizontal><DOListingPlaceholder /><ARListingPlaceholder /></XHorizontal> : null);
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
                            <PlaceholderAbout /> <Text marginWidth={18}>Add an intro paragraph</Text>
                        </XHorizontal>
                    </XCardStyled>
                </div>
            )}
        >
            <XVertical>
                <XFormLoadingContent>
                    <XFormField title="About">
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
            defaultData={{
                input: {
                    website: props.data.myOrganizationProfile!!.website,
                    twitter: props.data.myOrganizationProfile!!.twitter,
                    facebook: props.data.myOrganizationProfile!!.facebook,
                }
            }}
            defaultAction={async (data) => {
                await props.updateOrganizaton({
                    variables: {
                        input: {
                            website: data.input.website,
                            twitter: data.input.twitter,
                            facebook: data.input.facebook,
                        }
                    }
                });
            }}
            target={(
                <div style={{ cursor: 'pointer' }}>
                    <XHorizontal alignItems="center">
                        <PlaceholderSocial /> <Text marginWidth={18}>Add social links</Text>
                    </XHorizontal>
                </div>
            )}
        >
            <XVertical>
                <XFormLoadingContent>
                    <XFormField title="Website">
                        <XInput field="input.website" />
                    </XFormField>
                    <XFormField title="Twitter">
                        <XInput field="input.twitter" />
                    </XFormField>
                    <XFormField title="Facebook">
                        <XInput field="input.facebook" />
                    </XFormField>
                </XFormLoadingContent>
            </XVertical>
        </XModalForm>

    );
});

export const ContactPlaceholder = withMyOrganizationProfile((props) => {
    return (
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
                            contacts: data.contacts
                        }
                    }
                });
            }}
            target={(
                <div style={{ cursor: 'pointer' }}>
                    <XHorizontal alignItems="center">
                        <PlaceholderContact /> <Text marginWidth={18}>Add contacts</Text>
                    </XHorizontal>
                </div>
            )}
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

    );
});

export const LocationPlaceholder = withMyOrganizationProfile((props) => {
    return (
        <XModalForm
            defaultData={{
                input: {
                    location: props.data.myOrganizationProfile!!.location,
                }
            }}
            defaultAction={async (data) => {
                await props.updateOrganizaton({
                    variables: {
                        input: {
                            location: data.input.location,
                        }
                    }
                });
            }}
            target={(
                <div style={{ cursor: 'pointer' }}>
                    <Text opacity={0.5}>+ Add location</Text>
                </div>
            )}
        >
            <XVertical>
                <XFormLoadingContent>
                    <XFormField title="Location">
                        <XInput field="input.location" />
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
                    <PlaceholderAvatarText><p>Add your</p><p>profile logo</p></PlaceholderAvatarText>
                </LogoPlaceholder>
            )}
        >
            <XVertical>
                <XFormLoadingContent>
                    <XFormField title="Logo">
                        <XAvatarUpload field="input.photoRef" />
                    </XFormField>
                </XFormLoadingContent>
            </XVertical>
        </XModalForm>
    );
});
