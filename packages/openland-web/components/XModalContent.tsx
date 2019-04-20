import * as React from 'react';
import { XViewProps, XView } from 'react-mental';
import { XModalBoxStyles } from 'openland-x/showModalBox';

export const XModalContent = React.memo<XViewProps>((props) => {
    return (
        <XView flexDirection="column" paddingHorizontal={XModalBoxStyles.contentPadding} paddingBottom={30} {...props} />
    )
});