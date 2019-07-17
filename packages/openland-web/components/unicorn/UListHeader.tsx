import * as React from 'react';
import { XView } from 'react-mental';
import { TypeStyles } from 'openland-web/utils/TypeStyles';
import { ThemeDefault } from 'openland-y-utils/themes';

interface UListHeaderProps {
    text: string;
    counter?: string | number;
}

export const UListHeader = (props: UListHeaderProps) => {
    const { text, counter } = props;

    return (
        <XView
            marginTop={16}
            height={48}
            paddingHorizontal={16}
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
        >
            <XView {...TypeStyles.title2} color={ThemeDefault.foregroundPrimary}>
                {text}
            </XView>

            {!!counter && (
                <XView {...TypeStyles.label1} color={ThemeDefault.foregroundTertiary} marginLeft={8}>
                    {counter}
                </XView>
            )}
        </XView>
    );
};