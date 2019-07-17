import * as React from 'react';
import { XView, XViewProps } from 'react-mental';
import { TypeStyles } from 'openland-web/utils/TypeStyles';
import { ThemeDefault } from 'openland-y-utils/themes';

interface UListFieldProps extends XViewProps {
    label?: string;
    value?: string;
}

export const UListField = (props: UListFieldProps) => {
    const { label, value, ...other } = props;

    return (
        <XView
            {...other}
            paddingHorizontal={16}
            paddingVertical={8}
            flexDirection="row"
        >
            {!!label && (
                <XView
                    {...TypeStyles.body}
                    color={ThemeDefault.foregroundSecondary}
                    width={104}
                    marginRight={56}
                >
                    {label}
                </XView>
            )}

            <XView
                {...TypeStyles.body}
                color={ThemeDefault.foregroundPrimary}
                flexGrow={1}
                flexShrink={1}
            >
                {value}
            </XView>
        </XView>
    );
};