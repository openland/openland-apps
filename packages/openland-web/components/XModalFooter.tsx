import * as React from 'react';
import { XView, XViewProps } from 'react-mental';

export const XModalFooter = React.memo<{ children?: any } & XViewProps>(props => {
    return (
        <XView
            height={72}
            backgroundColor="var(--backgroundTertiary)"
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="center"
            paddingHorizontal={24}
            borderRadius="0 0 8px 8px"
            {...props}
        />
    );
});
