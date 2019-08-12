import * as React from 'react';
import { XView, XViewProps } from 'react-mental';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { ThemeDefault } from 'openland-y-utils/themes';
import { UText } from './UText';

interface UListFieldProps extends XViewProps {
    label?: string;
    value?: string | JSX.Element;
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
                    {...TextStyles.Body}
                    color={ThemeDefault.foregroundSecondary}
                    width={104}
                    marginRight={56}
                >
                    {label}
                </XView>
            )}

            <XView
                {...TextStyles.Body}
                color={ThemeDefault.foregroundPrimary}
                flexGrow={1}
                flexShrink={1}
            >
                {typeof value === 'string' && <UText text={value} />}
                {typeof value !== 'string' && (
                    <>
                        {value}
                    </>
                )}
            </XView>
        </XView>
    );
};