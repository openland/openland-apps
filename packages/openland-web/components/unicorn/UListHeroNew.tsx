import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { UAvatar } from './UAvatar';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { showAvatarModal } from '../showAvatarModal';
import { emoji } from 'openland-y-utils/emoji';
import { ProfileLayoutContext } from 'openland-web/components/ProfileLayout';

const titleStyle = css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const textStyle = css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 15px;
    line-height: 24px;
`;

interface UListHeroProps {
    title: string;
    titleIcon?: JSX.Element;
    score?: number;
    description?: string | JSX.Element;
    descriptionColor?: string;
    avatar?: { photo: string | null; id: string; title: string };
    children?: any;
}

// Temporarily, while groups, organizations and contacts are WIP
export const UListHeroNew = (props: UListHeroProps) => {
    const { title, titleIcon, description, descriptionColor, avatar, children } = props;
    const titleEmojify = React.useMemo(() => emoji(title), [title]);
    const { compactView } = React.useContext(ProfileLayoutContext);
    const isMobile = useLayout() === 'mobile';

    return (
        <XView paddingHorizontal={16} flexDirection={compactView ? "row" : "column"}>
            {!!avatar && (
                    <UAvatar
                        {...avatar}
                        size={isMobile ? 'large' : 'xx-large'}
                        marginTop={16}
                        marginRight={16}
                        onClick={
                            avatar.photo && !avatar.photo.startsWith('ph://')
                                ? () => showAvatarModal(avatar.photo!)
                                : undefined
                        }
                    />
            )}

            <XView
                marginTop={16}
                flexGrow={1}
                flexShrink={1}
                flexDirection="column"
                justifyContent="center"
            >
                <XView {...(compactView ? TextStyles.Title3 : TextStyles.Title2)} color="var(--foregroundPrimary)" flexDirection="row" alignItems="center">
                    {titleIcon}
                    <span className={titleStyle}>{titleEmojify}</span>
                </XView>

                {!!description && (
                    <XView
                        {...TextStyles.Densed}
                        color={descriptionColor ? descriptionColor : 'var(--foregroundSecondary)'}
                        marginTop={compactView ? 0 : 4}
                    >
                        <span className={textStyle}>{description}</span>
                    </XView>
                )}
                <XView flexDirection={compactView ? "row" : "column"} marginTop={16}>
                    {children}
                </XView>
            </XView>
        </XView>
    );
};
