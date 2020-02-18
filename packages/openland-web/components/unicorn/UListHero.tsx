import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { UAvatar } from './UAvatar';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { useCaptionPopper } from 'openland-web/components/CaptionPopper';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { showAvatarModal } from '../showAvatarModal';
import { emoji } from 'openland-y-utils/emoji';

const textStyle = css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Score = (props: { value: number }) => {
    const richText = "User's reach is the total number of people in community groups they are in";
    const [show] = useCaptionPopper({ text: richText, placement: 'bottom' });
    return (
        <XView
            position="absolute"
            left={0}
            bottom={-6}
            right={0}
            alignItems="center"
            onMouseEnter={show}
            zIndex={3}
        >
            <XView
                {...TextStyles.Label2}
                borderWidth={2}
                borderRadius={12}
                borderColor="var(--backgroundPrimary)"
                paddingVertical={1}
                paddingHorizontal={8}
                color="var(--foregroundContrast)"
                backgroundImage="linear-gradient(138deg, #FEBD17, #FF9B04)"
            >
                {props.value}
            </XView>
        </XView>
    );
};

interface UListHeroProps {
    title: string;
    titleIcon?: JSX.Element;
    score?: number;
    description?: string | JSX.Element;
    descriptionColor?: string;
    avatar?: { photo: string | null; id: string; title: string };
    children?: any;
}

export const UListHero = (props: UListHeroProps) => {
    const { title, titleIcon, score, description, descriptionColor, avatar, children } = props;
    const titleEmojify = React.useMemo(() => emoji(title), [title]);
    const isMobile = useLayout() === 'mobile';

    return (
        <XView marginBottom={32} height={72} paddingHorizontal={16} flexDirection="row">
            {!!avatar && (
                <XView marginRight={16} position="relative" justifyContent="center">
                    <UAvatar
                        {...avatar}
                        size={isMobile ? 'large' : 'x-large'}
                        onClick={
                            avatar.photo && !avatar.photo.startsWith('ph://')
                                ? () => showAvatarModal(avatar.photo!)
                                : undefined
                        }
                    />
                    {!!score && <Score value={score} />}
                </XView>
            )}

            <XView
                flexGrow={1}
                flexShrink={1}
                overflow="hidden"
                flexDirection="column"
                justifyContent="center"
            >
                <XView {...TextStyles.Title3} color="var(--foregroundPrimary)" flexDirection="row" alignItems="center">
                    {titleIcon}
                    <span className={textStyle}>{titleEmojify}</span>
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
            <XView flexDirection="row" alignItems="center">
                {children}
            </XView>
        </XView>
    );
};
