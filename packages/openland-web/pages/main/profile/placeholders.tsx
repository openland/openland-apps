import * as React from 'react';
import { withMyOrganizationProfile } from '../../../api/withMyOrganizationProfile';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XFormField } from 'openland-x-forms/XFormField';
import { XTextArea } from 'openland-x/XTextArea';
import { XInput } from 'openland-x/XInput';
import { TextOrganizationProfile } from 'openland-text/TextOrganizationProfile';

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
                    linkedin: props.data.organizationProfile!!.linkedin,
                    twitter: props.data.organizationProfile!!.twitter,
                    facebook: props.data.organizationProfile!!.facebook,
                }
            }}
            defaultAction={async (data) => {
                await props.updateOrganizaton({
                    variables: {
                        input: {
                            linkedin: data.input.linkedin,
                            twitter: data.input.twitter,
                            facebook: data.input.facebook,
                        }
                    }
                });
            }}
            target={(props as any).target || (
                <XButton text="Add social links" iconRight="add" />
            )}
        >
            <XFormLoadingContent>
                <XVertical flexGrow={1} separator={8}>
                    <XFormField field="input.linkedin">
                        <XInput placeholder={TextOrganizationProfile.placeholderSocialModalLinkedIn} field="input.linkedin" size="large" />
                    </XFormField>
                    <XFormField field="input.twitter">
                        <XInput placeholder={TextOrganizationProfile.placeholderSocialModalTwitter} field="input.twitter" size="large" />
                    </XFormField>
                    <XFormField field="input.facebook">
                        <XInput placeholder={TextOrganizationProfile.placeholderSocialModalFacebook} field="input.facebook" size="large" />
                    </XFormField>
                </XVertical>
            </XFormLoadingContent>
        </XModalForm>
    );
}) as React.ComponentType<{ target?: any }>;

export const WebsitePlaceholder = withMyOrganizationProfile((props) => {
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
                }
            }}
            defaultAction={async (data) => {
                await props.updateOrganizaton({
                    variables: {
                        input: {
                            website: data.input.website,
                        }
                    }
                });
            }}
            target={(props as any).target || (
                <XButton text="Add website" iconRight="add" />
            )}
        >
            <XFormLoadingContent>
                <XVertical flexGrow={1} separator={8}>
                    <XFormField field="input.website">
                        <XInput placeholder={TextOrganizationProfile.placeholderSocialModalWeb} field="input.website" size="large" />
                    </XFormField>
                </XVertical>
            </XFormLoadingContent>
        </XModalForm>
    );
}) as React.ComponentType<{ target?: any }>;