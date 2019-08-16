import * as React from 'react';
import { XView, XViewProps } from 'react-mental';
import { XModalBoxStyles } from 'openland-x/showModalBox';

export const XModalFooter = React.memo<{ children?: any } & XViewProps>(props => {
    return (
        <XView
            height={72}
            backgroundColor="var(--backgroundTertiary)"
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="center"
            paddingHorizontal={XModalBoxStyles.contentPadding}
            {...props}
        />
    );
});
