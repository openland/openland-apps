import * as React from 'react';
import { css } from 'linaria';
import { Organization_organization } from 'openland-api/spacex.types';
import { XView } from 'react-mental';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { useStackRouter } from 'openland-unicorn/components/StackRouter';
import { UButton } from 'openland-web/components/unicorn/UButton';

const imageWrapperStyle = css`
    height: 367px;
    position: absolute;
    right: 0;
    left: 0;
    bottom: 60px;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;

    @media (max-height: 800px) {
        height: 250px;
    }
`;

const imageStyle = css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 1242px;
    margin-left: -688px;
    background: url(/static/X/signup/invite-illustration.png) no-repeat;
    background-image: -webkit-image-set(
        url(/static/X/signup/invite-illustration.png) 1x,
        url(/static/X/signup/invite-illustration@2x.png) 2x
    );
    background-size: auto 100%;

    @media (max-height: 800px) {
        width: 846px;
        margin-left: -500px;
    }

    @media (max-height: 600px) {
        background: none;
        background-image: none;
    }
`;

export const InviteImage = () => {
    return (
        <div className={imageWrapperStyle}>
            <div className={imageStyle} />
        </div>
    );
};

interface PrivateCommunityViewProps {
    organization: Organization_organization;
}

export const PrivateCommunityView = (props: PrivateCommunityViewProps) => {
    const { id, photo, name, about } = props.organization;
    const layout = useLayout();
    const router = useStackRouter();

    return (
        <>
            <XView
                flexDirection="column"
                justifyContent={layout === 'mobile' ? 'space-between' : 'flex-end'}
                alignItems="center"
                paddingTop={61}
                position="relative"
            >
                <XView
                    backgroundColor={'rgba(244, 244, 244, 0.7)'}
                    borderRadius={10}
                    paddingLeft={24}
                    paddingRight={24}
                    paddingTop={20}
                    paddingBottom={20}
                    alignItems="center"
                >
                    <XView fontSize={20} fontWeight={'600'}>
                        You must be invited to view this community
                    </XView>
                    <XView opacity={0.8} fontSize={14} lineHeight={1.57} marginTop={8}>
                        Creator of this community has made it private
                    </XView>
                </XView>

                <XView marginTop={40}>
                    <UAvatar photo={photo || undefined} title={name} id={id} size="x-large" />
                </XView>

                <XView lineHeight={1.2} fontSize={20} fontWeight={'600'} marginTop={20}>
                    {name}
                </XView>

                {about && (
                    <XView
                        marginTop={12}
                        maxWidth={400}
                        fontSize={16}
                        lineHeight={1.5}
                        paddingLeft={10}
                        paddingRight={10}
                    >
                        <div style={{ textAlign: 'center' }}>{about}</div>
                    </XView>
                )}

                <XView marginTop={40}>
                    <UButton
                        text="Go back"
                        size="large"
                        style="secondary"
                        onClick={() => router.pop()}
                    />
                </XView>
            </XView>
            {layout === 'desktop' && <InviteImage />}
        </>
    );
};
