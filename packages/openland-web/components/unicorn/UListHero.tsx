import * as React from 'react';
import { XView } from 'react-mental';
import { UAvatar } from './UAvatar';

interface UListHeroProps {
    title: string;
    description?: string;
    avatar?: {
        photo: string | null;
        key: string;
        title: string;
    };
}

export const UListHero = (props: UListHeroProps) => {
    const { title, description, avatar } = props;

    return (
        <XView
            marginBottom={32}
            height={72}
            paddingHorizontal={16}
            flexDirection="row"
        >
            {!!avatar && (
                <XView marginRight={16}>
                    <UAvatar
                        photo={avatar.photo}
                        key={avatar.key}
                        title={avatar.title}
                        size="x-large"
                    />
                </XView>
            )}
            <XView flexGrow={1} flexDirection="column" justifyContent="center">
                <XView>{title}</XView>
                {!!description && (
                    <XView>{description}</XView>
                )}
            </XView>
            <XView>buttons</XView>
        </XView>
    );
};