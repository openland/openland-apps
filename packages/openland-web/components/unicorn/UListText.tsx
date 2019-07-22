import * as React from 'react';
import { XView, XViewProps } from 'react-mental';
import { TypeStyles } from 'openland-web/utils/TypeStyles';
import { ThemeDefault } from 'openland-y-utils/themes';

interface UListTextProps extends XViewProps {
    value?: string | JSX.Element;
}

export const UListText = (props: UListTextProps) => {
    const { value, ...other } = props;

    return (
        <XView
            marginBottom={16}
            {...other}
            {...TypeStyles.body}
            paddingHorizontal={16}
            color={ThemeDefault.foregroundPrimary}
            flexGrow={1}
            flexShrink={1}
        >
            {value}
        </XView>
    );
};