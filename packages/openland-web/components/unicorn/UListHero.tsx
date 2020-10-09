import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { UAvatar } from './UAvatar';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { showAvatarModal } from '../showAvatarModal';
import { emoji } from 'openland-y-utils/emoji';
import { ProfileLayoutContext } from 'openland-web/components/ProfileLayout';
import { useWithWidth } from 'openland-web/hooks/useWithWidth';

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
    titleRightIcon?: JSX.Element;
    score?: number;
    description?: string | JSX.Element;
    descriptionColor?: string;
    avatar?: { photo: string | null; id: string; title: string };
    children?: any;
}

export const UListHero = (props: UListHeroProps) => {
    const {
        title,
        titleIcon,
        titleRightIcon,
        description,
        descriptionColor,
        avatar,
        children,
    } = props;
    const titleEmojify = React.useMemo(() => emoji(title), [title]);
    const { compactView } = React.useContext(ProfileLayoutContext);
    const [width] = useWithWidth();

    const isSmallMobile = width! < 400;

    return (
        <XView paddingHorizontal={16} flexDirection={compactView ? 'row' : 'column'} flexShrink={1}>
            {!!avatar && (
                <UAvatar
                    {...avatar}
                    size={isSmallMobile ? 'large' : 'xx-large'}
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
                <XView
                    {...(compactView ? TextStyles.Title3 : TextStyles.Title2)}
                    color="var(--foregroundPrimary)"
                    flexDirection="row"
                    alignItems="center"
                >
                    {titleIcon}
                    <span className={titleStyle}>{titleEmojify}</span>
                    {titleRightIcon}
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
                <XView flexDirection={compactView ? 'row' : 'column'} marginTop={16}>
                    {children}
                </XView>
            </XView>
        </XView>
    );
};
