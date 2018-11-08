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
                            <XInput flexGrow={1} placeholder={TextOrganizationProfile.placeholderSocialModalWeb} field="input.website" size="large" />
                            <XInput flexGrow={1} placeholder={TextOrganizationProfile.placeholderSocialLinkTitlePlaceholder} field="input.websiteTitle" size="large" />
                        </XHorizontal>
                    </XFormField>
                    <XFormField field="input.twitter">
                        <XInput placeholder={TextOrganizationProfile.placeholderSocialModalTwitter} field="input.twitter" size="large" />
                    </XFormField>
                    <XFormField field="input.facebook">
                        <XInput placeholder={TextOrganizationProfile.placeholderSocialModalFacebook} field="input.facebook" size="large" />
                    </XFormField>
                    <XFormField field="input.linkedin">
                        <XInput placeholder={TextOrganizationProfile.placeholderSocialModalLinkedIn} field="input.linkedin" size="large" />
                    </XFormField>
                </XVertical>
            </XFormLoadingContent>
        </XModalForm>

    );
}) as React.ComponentType<{ target?: any }>;