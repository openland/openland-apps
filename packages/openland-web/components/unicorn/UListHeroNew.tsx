import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { UAvatar } from './UAvatar';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { showAvatarModal } from '../showAvatarModal';
import { emoji } from 'openland-y-utils/emoji';

const titleStyle = css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 20px;
    line-height: 28px;
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
    const isMobile = useLayout() === 'mobile';

    return (
        <XView marginBottom={32} paddingHorizontal={16}>
            {!!avatar && (
                    <UAvatar
                        {...avatar}
                        size={isMobile ? 'large' : 'xx-large'}
                        onClick={
                            avatar.photo && !avatar.photo.startsWith('ph://')
                                ? () => showAvatarModal(avatar.photo!)
                                : undefined
                        }
                    />
            )}

            <XView
                marginTop={16}
                marginBottom={16}
                flexGrow={1}
                flexShrink={1}
                overflow="hidden"
                flexDirection="column"
                justifyContent="center"
            >
                <XView {...TextStyles.Title3} color="var(--foregroundPrimary)" flexDirection="row" alignItems="center">
                    {titleIcon}
                    <span className={titleStyle}>{titleEmojify}</span>
                </XView>

                {!!description && (
                    <XView
                        {...TextStyles.Densed}
                        color={descriptionColor ? descriptionColor : 'var(--foregroundSecondary)'}
                        marginTop={4}
                    >
                        <span className={textStyle}>{description}</span>
                    </XView>
                )}
            </XView>
            <XView>
                {children}
            </XView>
        </XView>
    );
};
