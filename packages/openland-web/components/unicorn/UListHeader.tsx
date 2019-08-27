import * as React from 'react';
import { XView } from 'react-mental';
import { TextStyles, HoverAlpha } from 'openland-web/utils/TextStyles';

interface UListHeaderProps {
    text: string;
    counter?: string | number;
    padded?: boolean;
    action?: {
        title: string;
        path?: string;
        onClick?: () => void;
    };
}

export const UListHeader = (props: UListHeaderProps) => {
    const { text, counter, action, padded } = props;

    return (
        <XView
            marginTop={16}
            height={48}
            paddingHorizontal={padded !== false ? 16 : undefined}
            flexDirection="row"
            alignItems="center"
        >
            <XView flexDirection="row" flexGrow={1} justifyContent="flex-start">
                <XView {...TextStyles.Title2} color="var(--foregroundPrimary)">
                    {text}
                </XView>

                {!!counter && (
                    <XView {...TextStyles.Label1} color="var(--foregroundTertiary)" marginLeft={8}>
                        {counter}
                    </XView>
                )}
            </XView>

            {!!action && (
                <XView
                    {...TextStyles.Label1}
                    cursor="pointer"
                    color="var(--accentPrimary)"
                    hoverOpacity={HoverAlpha}
                    path={action.path}
                    onClick={action.onClick}
                >
                    {action.title}
                </XView>
            )}
        </XView>
    );
};