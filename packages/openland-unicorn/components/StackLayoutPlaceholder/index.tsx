import React from 'react';
import { XView } from 'react-mental';

export default React.memo(() => {
    return (
        <XView
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
            backgroundColor="var(--backgroundPrimary)"
        >
            Hello!
        </XView>
    );
});
