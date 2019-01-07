import * as React from 'react';
import { XView, XImage } from 'react-mental';
import { css } from 'linaria';
import MailIcon from 'openland-icons/landing/mail.svg';
import LinkedinIcon from 'openland-icons/landing/linkedin.svg';

let founderRootClass = css`
    padding: 7px 0 0 132px;
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
    @media (max-width: 767px) and (min-width: 550px) {
        margin: 0;
        width: 50%;
    }
`;

let founderPhotoClass = css`
    width: 110px;
    position: absolute;
    top: 3px;
    left: 0;

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
    font-size: 22px;
    line-height: 30px;
    font-weight: 600;

    @media (max-width: 767px) {
        font-size: 20px;
        line-height: 26px;
    }
`;

let founderPositionClass = css`
    color: rgba(31, 52, 73, 0.5);
    font-size: 16px;
    line-height: 22px;
    font-weight: 600;

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
    color: rgba(31, 52, 73, 0.5);
    text-decoration: none;
    font-size: 15px;
    line-height: 20px;
    font-weight: 600;
    display: flex;

    svg * {
        fill: rgba(31, 52, 73, 0.5);
    }
    &:last-child {
        margin: 0;
    }
    &:hover {
        color: #1790ff;
        text-decoration: none;

        svg * {
            fill: #1790ff;
        }
    }
    .linkedin-icon {
        width: 20px;
        height: 20px;
    }
    .mail-icon {
        margin: 2px 8px -2px 0;
        width: 18px;
        height: 18px;
    }

    @media (max-width: 767px) {
        font-size: 0;
        line-height: 0;
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
                    <LinkedinIcon className="linkedin-icon" />
                </a>
                <a href={'mailto:' + props.mail} className={founderLinkClass}>
                    <MailIcon className="mail-icon" />
                    {props.mail}
                </a>
            </div>
        </div>
    </div>
);

export const Founders = () => (
    <XView flexDirection="row" flexWrap="wrap">
        <FoundersItem
            photo="/static/landing/yury.png"
            name="Yury Lifshits"
            position="CEO"
            linkedin="https://www.linkedin.com/in/lifshits/"
            mail="yury@openland.com"
        />
        <FoundersItem
            photo="/static/landing/steve.png"
            name="Steve Korshakov"
            position="CTO"
            linkedin="https://www.linkedin.com/in/ex3ndr/"
            mail="steve@openland.com"
        />
    </XView>
);
