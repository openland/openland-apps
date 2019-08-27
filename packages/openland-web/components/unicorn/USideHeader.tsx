import * as React from 'react';
import { XView } from 'react-mental';
import { TextStyles } from 'openland-web/utils/TextStyles';

interface USideHeaderProps {
    title: string;
    children?: any;
}

export const USideHeader = React.memo((props: USideHeaderProps) => {
    const { title, children } = props;

    return (
        <XView
            height={56}
            paddingLeft={16}
            paddingRight={3}
            paddingVertical={12}
            flexDirection="row"
        >
            <XView {...TextStyles.Title1} flexGrow={1} minWidth={0} flexBasis={0} color="var(--foregroundPrimary)">
                {title}
            </XView>
            <XView flexDirection="row" alignItems="center">
                {children}
            </XView>
        </XView>
    );
});