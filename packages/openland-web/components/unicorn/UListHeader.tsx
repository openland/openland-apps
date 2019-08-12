import * as React from 'react';
import { XView } from 'react-mental';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { ThemeDefault } from 'openland-y-utils/themes';

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
                <XView {...TextStyles.Title2} color={ThemeDefault.foregroundPrimary}>
                    {text}
                </XView>

                {!!counter && (
                    <XView {...TextStyles.Label1} color={ThemeDefault.foregroundTertiary} marginLeft={8}>
                        {counter}
                    </XView>
                )}
            </XView>

            {!!action && (
                <XView
                    {...TextStyles.Label1}
                    cursor="pointer"
                    color={ThemeDefault.foregroundTertiary}
                    hoverColor={ThemeDefault.foregroundSecondary}
                    path={action.path}
                    onClick={action.onClick}
                >
                    {action.title}
                </XView>
            )}
        </XView>
    );
};