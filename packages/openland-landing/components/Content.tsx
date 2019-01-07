import * as React from 'react';
import { css } from 'linaria';

let contentRootClass = css`
    padding: 22px 0 26px;

    @media (max-width: 767px) {
        padding: 0 0 26px;
    }
`;

let contentHeadRootClass = css`
    padding: 39px 0 20px 283px;
    margin: 0 0 19px;
    position: relative;
    min-height: 169px;

    @media (max-width: 767px) {
        padding: 0 0 20px;
    }
    @media (min-width: 768px) and (max-width: 999px) {
        padding: 44px 0 20px 240px;
    }
`;

let contentHeadIconClass = css`
    position: absolute;
    top: 0;
    left: 18px;

    @media (max-width: 767px) {
        position: relative;
    }
    @media (min-width: 768px) and (max-width: 999px) {
        left: 2px;
    }

    svg {
        width: 210px;
        height: 169px;
        display: block;

        @media (max-width: 767px) {
            margin: 0 auto 15px;
        }
    }
`;

let contentHeadTitleClass = css`
    color: #000000;
    margin: 0 0 10px;
    font-size: 36px;
    line-height: 44px;
    font-weight: 700;

    @media (max-width: 767px) {
        text-align: center;
        margin: 0 0 13px;
        font-size: 30px;
        line-height: 38px;
    }
    @media (min-width: 768px) and (max-width: 999px) {
        margin: 0 0 6px;
        font-size: 30px;
        line-height: 40px;
    }
`;

let contentHeadTextClass = css`
    font-style: italic;
    color: rgba(83, 96, 134, 0.8);
    margin: 0;
    font-size: 18px;
    line-height: 26px;

    @media (max-width: 767px) {
        text-align: center;
        font-size: 16px;
        line-height: 24px;
    }
    @media (min-width: 768px) and (max-width: 999px) {
        font-size: 16px;
        line-height: 24px;
    }
`;

let contentWrapClass = css`
    display: flex;
`;

let contentSideClass = css`
    width: 248px;

    @media (max-width: 767px) {
        display: none;
    }
    @media (min-width: 768px) and (max-width: 999px) {
        width: 215px;
    }
`;

let contentMenuClass = css`
    padding: 0 0 24px;

    ul {
        list-style: none;
        margin: 0;
        padding: 16px 16px 17px;
        border: 1px solid rgba(237, 239, 243, 0.6);
        border-radius: 6px;
        display: block;
    }
    li {
        color: rgba(31, 52, 73, 0.8);
        margin: 0 0 11px;
        font-size: 14px;
        line-height: 20px;
        font-weight: 600;

        &:last-child {
            margin: 0;
        }
        &.is-active {
            cursor: default;
        }
        &:hover {
            color: #1790ff;
        }
    }
    a {
        text-decoration: none;
        color: inherit;
        display: block;
    }
`;

let contentBoxClass = css`
    flex-grow: 1;
    padding-left: 35px;
    padding-bottom: 24px;
    font-size: 15px;
    line-height: 22px;
    color: #1f3449;
    width: calc(100% - 248px);

    @media (max-width: 767px) {
        width: auto;
        padding-left: 0;
    }
    @media (min-width: 768px) and (max-width: 999px) {
        width: calc(100% - 215px);
        padding-left: 25px;
    }

    h1 {
        margin: 0 0 15px;
        font-size: 32px;
        line-height: 42px;
        font-weight: 700;
    }
    h2 {
        margin: 32px 0 12px;
        font-size: 18px;
        line-height: 22px;
        font-weight: 700;
    }
    p {
        margin: 0 0 12px;
    }
    ul {
        list-style: none;
        margin: 0 0 24px;
        padding: 0;
    }
    ul li {
        padding: 0 0 6px 33px;
        position: relative;

        &:last-child {
            padding-bottom: 0;
        }
        &:before {
            content: '';
            background: #1f3449;
            border-radius: 4px;
            display: block;
            width: 4px;
            height: 4px;
            position: absolute;
            top: 11px;
            left: 24px;
        }
    }

    > *:first-child {
        margin-top: 0 !important;
    }
    > *:last-child {
        margin-bottom: 0 !important;
    }
`;

interface ContentProps {
    title: string;
    date: string;
    icon: any;
    contents: string[];
    children: any;
}

export const Content = (props: ContentProps) => (
    <div className={contentRootClass}>
        <div className={contentHeadRootClass}>
            <div className={contentHeadIconClass}>{props.icon}</div>
            <h1 className={contentHeadTitleClass}>{props.title} @&nbsp;Openland</h1>
            <p className={contentHeadTextClass}>Effective Date — {props.date}</p>
        </div>
        <div className={contentWrapClass}>
            <div className={contentSideClass}>
                <div className={contentMenuClass}>
                    <ul>
                        {props.contents.map((item, index) => (
                            <li>
                                <a
                                    href={'#section' + (index + 1)}
                                    dangerouslySetInnerHTML={{ __html: item }}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={contentBoxClass}>{props.children}</div>
        </div>
    </div>
);
