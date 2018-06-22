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

const Placeholder = Glamorous(XCard)({
    padding: 34,
    flex: 1,
});

const PlaceholderButton = Glamorous(XButton)({
    marginLeft: 16
});

const PlaceholderText = Glamorous.label({
    marginLeft: 16,
    ...XStyles.text.h500
});

const PlaceholderIcon = Glamorous.img((props) => ({
    width: 60,
    height: 60,
}));

const Close = Glamorous(XIcon)({
    width: 16,
    height: 16,
    fontSize: 16,
    color: '#cfcfcf',
    alignSelf: 'flex-end',
    marginTop: -24,
    marginRight: -24,
    marginBottom: 8,
    cursor: 'pointer'
});

export const OverviewPlaceholder = withMyOrganizationProfile((props) => {

    return ((!props.data.myOrganizationProfile.organizationType && !props.data.myOrganizationProfile.geographies && !props.data.myOrganizationProfile.lookingFor) ? (
        <Placeholder>
            <XHorizontal>

                <PlaceholderIcon src={'/static/img/icons/organization/profile/placeholder_overview.svg'} />
                <XVertical maxWidth={452}>
                    <PlaceholderText>Share your organization type, geographies of operation, and what are you looking for</PlaceholderText>

                    <XModalForm
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
                            text="Add organization overview"
                            alignSelf="flex-start"
                        />}
                    >
                        <XVertical>
                            <XFormLoadingContent>
                                <XVertical flexGrow={1} maxWidth={500}>
                                    <XFormField title="OrganizationType">
                                        <XSelect creatable={true} multi={true} field="input.organizationType" />
                                    </XFormField>
                                    <XFormField title="LookingFor">
                                        <XSelect creatable={true} multi={true} field="input.lookingFor" />
                                    </XFormField>
                                    <XFormField title="Geographies">
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
                                        <XButton query={{ field: 'addListing', value: 'DO' }} text="Add an development opportunity" />
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
                                        <XButton query={{ field: 'addListing', value: 'AR' }} text="Add an acquisition request" />
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
