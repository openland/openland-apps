import * as React from 'react';
import { XView } from 'react-mental';

export const EmptySearchBlock = (props: { text: string }) => (
    <XView height="calc(100vh - 118px)" alignItems="center" justifyContent="center">
        <XView
            width="100%"
            height={600}
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
        >
            <img
                src="/static/X/discover/empty-state.pngs"
                srcSet="/static/X/discover/empty-state.png, /static/X/discover/empty-state@2x.png 2x, /static/X/discover/empty-state@3x.png 3x"
            />
            <XView fontSize={24} fontWeight="600" marginBottom={8} marginTop={32}>
                No results
            </XView>
            <XView fontSize={14} fontWeight="600" lineHeight="24px" color="rgba(0, 0, 0, 0.8)">
                {props.text}
            </XView>
        </XView>
    </XView>
);
