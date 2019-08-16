import * as React from 'react';
import { XViewProps, XView } from 'react-mental';
import { TextStyles } from 'openland-web/utils/TextStyles';

export const XModalContent = React.memo<XViewProps>(props => {
    return (
        <XView
            flexDirection="column"
            paddingHorizontal={24}
            paddingBottom={24}
            {...props}
            {...TextStyles.Body}
        />
    );
});
