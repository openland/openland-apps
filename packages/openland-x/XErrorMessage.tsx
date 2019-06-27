import * as React from 'react';
import { XView } from 'react-mental';

export const XErrorMessage = React.memo<{ message: string }>((props) => {
    return (
        <XView
            backgroundColor="rgba(215, 84, 84,0.1)"
            color="rgb(215, 84, 84)"
            fontSize={16}
            lineHeight="24px"
            borderRadius={6}
            paddingHorizontal={16}
            paddingVertical={8}
            marginBottom={16}
            marginHorizontal={40}
        >
            {props.message}
        </XView>
    )
});