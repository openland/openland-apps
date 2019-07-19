import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import LogoWithName from 'openland-icons/logo.svg';

const FooterClassName = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 100%;
    margin-top: auto;
    height: 60px;
    background-color: #f9f9f9;
    flex-shrink: 0;
`;

export const Footer = () => {
    return (
        <div className={FooterClassName}>
            <XView marginTop={-10}>
                <LogoWithName />
            </XView>
            <XView
                marginLeft={8}
                borderRadius={2}
                width={4}
                height={4}
                backgroundColor={'#d8d8d8'}
            />
            <XView marginLeft={8} fontSize={13} color={'rgba(0, 0, 0, 0.5)'} fontWeight="600">
                Professional messenger of the future
            </XView>
        </div>
    );
};
