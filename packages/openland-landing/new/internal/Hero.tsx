import * as React from 'react';
import { css } from 'linaria';
import { Heading } from '../internal/Heading';
import { Container } from '../components/Container';

const box = css`
    background-color: #f7fafc;
`;

const inner = css`
    text-align: center;
    padding-bottom: 50px;
    padding-top: 20px;
`;

const image = css`
    margin-bottom: 30px;
`;

const subtitle = css`
    font-size: 24px;
    line-height: 1.2;
    text-align: center;
    margin-top: 12px;
    color: #525273;

    @media (min-width: 768px) and (max-width: 1599px) {
        font-size: 20px;
    }

    @media (min-width: 400px) and (max-width: 767px) {
        font-size: 18px;
    }

    @media (max-width: 399px) {
        font-size: 16px;
    }
`;

interface HeroProps {
    title: string;
    image: {
        link: string;
        width: number;
        height: number;
    };
    subtitle?: string;
}

export const Hero = React.memo((props: HeroProps) => (
    <div className={box}>
        <Container>
            <div className={inner}>
                <img className={image} src={props.image.link} alt="" width={props.image.width} height={props.image.height} />
                <Heading title={props.title} />
                {!!props.subtitle && <div className={subtitle}>{props.subtitle}</div>}
            </div>
        </Container>
    </div>
));