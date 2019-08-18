import * as React from 'react';
import { XView, XViewProps } from 'react-mental';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { UText } from './UText';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';

interface UListFieldProps extends XViewProps {
    label?: string;
    value?: string | JSX.Element;
}

export const UListField = (props: UListFieldProps) => {
    const { label, value, ...other } = props;
    const isMobile = useLayout() === 'mobile';
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
                    color="var(--foregroundSecondary)"
                    width={104}
                    marginRight={isMobile ? undefined : 56}
                >
                    {label}
                </XView>
            )}

            <XView
                {...TextStyles.Body}
                color="var(--foregroundPrimary)"
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