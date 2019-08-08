import * as React from 'react';
import { XView } from 'react-mental';
import { UAvatar } from './UAvatar';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { useCaptionPopper } from 'openland-web/components/CaptionPopper';
import { ThemeDefault } from 'openland-y-utils/themes';
import { showAvatarModal } from '../showAvatarModal';

const Score = (props: { value: number }) => {
    const richText = 'User\'s reach is the total number of people in community groups they are in';
    const [show] = useCaptionPopper(richText, 'bottom');
    return (
        <XView position="absolute" left={0} bottom={-6} right={0} alignItems="center" onMouseEnter={show}>
            <XView
                {...TextStyles.label2}
                borderWidth={2}
                borderRadius={12}
                borderColor={ThemeDefault.backgroundPrimary}
                paddingVertical={1}
                paddingHorizontal={8}
                color={ThemeDefault.contrastPrimary}
                backgroundImage="linear-gradient(138deg, #FEBD17, #FF9B04)"
            >
                {props.value}
            </XView>
        </XView>
    );
};

interface UListHeroProps {
    title: string;
    score?: number;
    description?: string | JSX.Element;
    descriptionColor?: string;
    avatar?: { photo: string | null; id: string; title: string; };
    children?: any;
}

export const UListHero = (props: UListHeroProps) => {
    const { title, score, description, descriptionColor, avatar, children } = props;

    return (
        <XView
            marginBottom={32}
            height={72}
            paddingHorizontal={16}
            flexDirection="row"
        >
            {!!avatar && (
                <XView marginRight={16} position="relative">
                    <UAvatar
                        {...avatar}
                        size="x-large"
                        onClick={
                            avatar.photo && !avatar.photo.startsWith('ph://')
                                ? () => showAvatarModal(avatar.photo!)
                                : undefined}
                    />
                    {!!score && <Score value={score} />}
                </XView>
            )}

            <XView flexGrow={1} flexDirection="column" justifyContent="center">
                <XView
                    {...TextStyles.title2}
                    color={ThemeDefault.foregroundPrimary}
                >
                    {title}
                </XView>

                {!!description && (
                    <XView
                        {...TextStyles.densed}
                        color={descriptionColor ? descriptionColor : ThemeDefault.foregroundSecondary}
                        marginTop={4}
                    >
                        {description}
                    </XView>
                )}
            </XView>
            <XView flexDirection="row" alignItems="center">
                {children}
            </XView>
        </XView>
    );
};