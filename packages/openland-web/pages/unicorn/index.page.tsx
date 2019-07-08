import * as React from 'react';
import { Container } from './components/Container';
import { css } from 'linaria';

const containerClass = css`
    width: 100px;
    height: 100px;
    margin: 100px;
    background: url(https://ucarecdn.com/7a9a4342-9a3f-454e-aebd-24edd3a336df/-/scale_crop/334x188/center/-/quality/lighter/-/format/jpeg/-/progressive/yes/);
`;

const blurClass = css`
    position: absolute;
    width: 100px;
    height: 100px;
    top: 90px;
    left: 90px;
    background-color: rgba(255, 255, 255, .9);
    @supports ((-webkit-backdrop-filter: blur(10px)) or (backdrop-filter: blur(10px))) {
        background-color: rgba(255, 255, 255, .5);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);   
    }
`;

export default () => {
    return (
        <Container>
            <div className={containerClass} />
            <div className={blurClass}/>
        </Container>
    );
};