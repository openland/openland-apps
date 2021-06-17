import * as React from 'react';
import { css, cx } from 'linaria';
import { normalizeUrl } from 'openland-x-utils/normalizeUrl';
import { TextTitle1, TextLabel1, TextBody } from 'openland-web/utils/TextStyles';
import { Page } from 'openland-unicorn/Page';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { Organization_organization } from 'openland-api/spacex.types';
import IcLock from 'openland-icons/s/ic-lock-16.svg';
import IcFeatured from 'openland-icons/s/ic-verified-3-16.svg';

const container = css`
    padding-bottom: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
`;

const titleWrapperStyle = css`
    max-width: 320px;
    align-self: center;
    flex-shrink: 0;
    display: flex;
`;

const titleStyle = css`
    text-align: center;
    color: var(--foregroundPrimary);
    margin-bottom: 8px;
    white-space: pre-wrap;
    word-wrap: break-word;
`;

const featuredIconWrapperStyle = css`
    margin-left: 4px;
    align-self: center;
    display: inline-flex;
    vertical-align: middle;
`;

const featuredIconStyle = css`
    display: var(--featured-icon-display);
`;

const aboutStyle = css`
    max-width: 320px;
    text-align: center;
    color: var(--foregroundSecondary);
    margin-bottom: 8px;
`;

const lockContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 16px;
`;

const lockTitle = css`
    color: var(--foregroundTertiary);
    margin-left: 8px;
`;

interface PrivateCommunityViewProps {
    organization: Organization_organization;
}

export const PrivateCommunityView = React.memo((props: PrivateCommunityViewProps) => {
    const { id, photo, name, about, applyLinkEnabled, applyLink, owner, featured } = props.organization;
    return (
        <Page flexGrow={1}>
            <div className={container}>
                <UAvatar
                    photo={photo}
                    id={id}
                    size="xx-large"
                    marginBottom={32}
                />
                <div className={titleWrapperStyle}>
                    <div className={cx(TextTitle1, titleStyle)}>
                        {name}
                        {featured && (
                            <div className={featuredIconWrapperStyle}>
                                <UIcon
                                    className={featuredIconStyle}
                                    size={18}
                                    icon={<IcFeatured />}
                                    color="#3DA7F2"
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className={cx(aboutStyle, TextBody)}>{about}</div>
                {applyLinkEnabled && applyLink && (
                    <UButton
                        width={240}
                        marginTop={24}
                        text="Apply to join"
                        size="large"
                        as="a"
                        target="_blank"
                        href={normalizeUrl(applyLink)}
                    />
                )}
                {!applyLinkEnabled && (
                    <>
                        <UButton
                            width={240}
                            marginTop={24}
                            text="Message admin"
                            size="large"
                            path={`/mail/${owner.id}`}
                        />
                        <div className={lockContainer}>
                            <UIcon icon={<IcLock />} color="var(--foregroundTertiary)" />
                            <div className={cx(lockTitle, TextLabel1)}>
                                This community is invite-only
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Page>
    );
});
