import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';

const textAlignClassName = css`
    text-align: center;
`;

export const Title = (props: { text: string }) => (
    <XView fontSize={24} color="#000" fontWeight="600" marginBottom={12}>
        <span className={textAlignClassName}>{props.text}</span>
    </XView>
);

export const Subtitle = (props: { text: string; maxWidth?: number | string }) => (
    <XView fontSize={16} color="#000" marginBottom={36} maxWidth={props.maxWidth}>
        <span className={textAlignClassName}>{props.text}</span>
    </XView>
);

export const ContinueButtonContainer = ({
    marginTop,
    isMobile,
    button,
}: {
    marginTop: number;
    isMobile: boolean;
    button: any;
}) => (
    <>
        {!isMobile && (
            <XView alignItems="center" marginTop={marginTop}>
                {button}
            </XView>
        )}
        {isMobile && (
            <XView alignItems="center" position="absolute" bottom={30}>
                {button}
            </XView>
        )}
    </>
);
