import * as React from 'react';
import { XView, XImage } from 'react-mental';
import { css, cx } from 'linaria';
import { Heading } from './Heading';

const box = css`
    margin-top: 4em;

    & > * + * {
        margin-top: 2em;
    }
`;

let founderRootClass = css`
    padding: 13px 0 0 150px;
    position: relative;
    width: 50%;
    min-height: 116px;

    @media (max-width: 767px) {
        padding: 0 0 0 100px;
        margin: 0 0 20px;
        width: 100%;
        min-height: 85px;

        &:last-child {
            margin: 0;
        }
    }
    @media (min-width: 550px) and (max-width: 767px) {
        margin: 0;
        width: 50%;
    }
`;

let founderPhotoClass = css`
    width: 127px;
    position: absolute;
    top: 3px;
    left: 0;

    margin-right: 10px;

    img {
        display: block;
        width: 100%;
    }

    @media (max-width: 767px) {
        position: absolute;
        top: 0;
        left: 0;
        width: 85px;
    }
`;

let founderNameClass = css`
    color: #1f3449;
    margin: 0 0 5px;
    font-size: 26px;
    line-height: 30px;
    font-weight: 600;

    @media (max-width: 767px) {
        font-size: 20px;
        line-height: 26px;
    }
`;

let founderPositionClass = css`
    font-size: 21px;
    line-height: 1.5;
    color: #525273;

    @media (max-width: 767px) {
        font-size: 14px;
        line-height: 20px;
    }
`;

let founderLinksClass = css`
    display: flex;
    padding: 18px 0 0;

    @media (max-width: 767px) {
        padding: 10px 0 0;
        transform-origin: left top;
        transform: scale(0.9, 0.9);
    }
`;

let founderLinkClass = css`
    margin: 0 20px 0 0;
    color: #525273;
    text-decoration: none;
    font-size: 18px;
    line-height: 20px;
    display: flex;

    svg * {
        fill: rgba(31, 52, 73, 0.5);
    }
    &:last-child {
        margin: 0;
    }
    &:hover {
        opacity: 0.7;
        color: #525273;
        text-decoration: none;

        svg * {
            fill: #1790ff;
        }
    }
    .mail-icon {
        margin: 0 8px 0 0;
        width: 22px;
        height: 22px;
    }

    @media (max-width: 767px) {
        font-size: 0;
        line-height: 0;
    }
`;

const linkedinIcon = css`
    width: 22px;
    height: 22px;
`;

const link = css`
    @media (max-width: 959px) {
        font-size: 0;
    }
`;

interface FoundersItemProps {
    photo: string;
    name: string;
    position: string;
    linkedin: string;
    mail: string;
}

const FoundersItem = (props: FoundersItemProps) => (
    <div className={founderRootClass}>
        <div className={founderPhotoClass}>
            <XImage src={props.photo} width="100%" />
        </div>
        <div>
            <div className={founderNameClass}>{props.name}</div>
            <div className={founderPositionClass}>{props.position}</div>
            <div className={founderLinksClass}>
                <a href={props.linkedin} className={founderLinkClass}>
                    <img className={linkedinIcon} src="/static/landing/icons/in.svg" />
                </a>
                <a href={'mailto:' + props.mail} className={cx(founderLinkClass, link)}>
                    <img className="mail-icon" src="/static/landing/icons/email.svg" />
                    {props.mail}
                </a>
            </div>
        </div>
    </div>
);

export const Founders = React.memo(() => (
    <div className={box}>
        <Heading title="Founders" />
        <XView flexDirection="row" flexWrap="wrap">
            <FoundersItem
                photo="/static/landing/yury-new.png"
                name="Yury Lifshits"
                position="CEO"
                linkedin="https://www.linkedin.com/in/lifshits/"
                mail="yury@openland.com"
            />
            <FoundersItem
                photo="/static/landing/steve-new.png"
                name="Steve Korshakov"
                position="CTO"
                linkedin="https://www.linkedin.com/in/ex3ndr/"
                mail="steve@openland.com"
            />
        </XView>
    </div>
));