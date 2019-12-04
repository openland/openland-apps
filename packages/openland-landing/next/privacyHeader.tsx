import * as React from 'react';
import { css } from 'linaria';

let contentRootClass = css`
    padding: 46px 0 26px;

    @media (max-width: 767px) {
        padding: 0 0 26px;
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
        background-color: #f7fafc;
        border-radius: 6px;
        display: block;
    }
    li {
        margin: 0 0 11px;
        font-size: 14px;
        line-height: 20px;
        &:last-child {
            margin: 0;
        }
        &.is-active {
            cursor: default;
        }

        color: #626283;
        will-change: color;
        transition: color 0.2s;

        &:hover,
        &:focus {
            color: #050530;
            transition: color 0.01s;
            text-decoration: none;
            opacity: 1;
        }

        &:active {
            color: #248bf2;
            transition: color 0.01s;
            text-decoration: none;
            opacity: 1;
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
    font-size: 17px;
    line-height: 1.5;
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

const link = css`
    &,
    &:hover,
    &:focus {
        text-decoration: none;
    }
`;

interface ContentProps {
    contents: string[];
    children: any;
}

export const Content = (props: ContentProps) => (
    <div className={contentRootClass}>
        <div className={contentWrapClass}>
            <div className={contentSideClass}>
                <div className={contentMenuClass}>
                    <ul>
                        {props.contents.map((item, index) => (
                            <li key={item}>
                                <a
                                    href={'#section' + (index + 1)}
                                    dangerouslySetInnerHTML={{ __html: item }}
                                    className={link}
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
