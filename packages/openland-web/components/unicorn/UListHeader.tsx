import * as React from 'react';
import { XView } from 'react-mental';
import { TypeStyles } from 'openland-web/utils/TypeStyles';
import { ThemeDefault } from 'openland-y-utils/themes';

interface UListHeaderProps {
    text: string;
    counter?: string | number;
    action?: {
        title: string;
        path?: string;
        onClick?: () => void;
    };
}

export const UListHeader = (props: UListHeaderProps) => {
    const { text, counter, action } = props;

    return (
        <XView
            marginTop={16}
            height={48}
            paddingHorizontal={16}
            flexDirection="row"
            alignItems="center"
        >
            <XView flexDirection="row" flexGrow={1} justifyContent="flex-start">
                <XView {...TypeStyles.title2} color={ThemeDefault.foregroundPrimary}>
                    {text}
                </XView>

                {!!counter && (
                    <XView {...TypeStyles.label1} color={ThemeDefault.foregroundTertiary} marginLeft={8}>
                        {counter}
                    </XView>
                )}
            </XView>

            {!!action && (
                <XView
                    {...TypeStyles.label1}
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