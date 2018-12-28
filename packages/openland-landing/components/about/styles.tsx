import { css } from 'linaria';

let aboutRootClass = css`
    padding: 42px 0 13px;

    @media (max-width: 767px) {
        padding: 14px 0 5px;
    }
`;

let aboutRowClass = css`
    margin: 0 0 47px;
    display: flex;

    @media (max-width: 767px) {
        margin: 0 0 40px;
    }
    @media (max-width: 999px) {
        display: block;
    }
`;

let aboutLabelClass = css`
    color: #536086;
    padding: 3px 20px 0 0;
    font-size: 18px;
    line-height: 20px;
    font-weight: 600;
    width: 253px;

    @media (max-width: 999px) {
        padding: 0 0 15px;
        width: auto;
    }
    @media (min-width: 1000px) and (max-width: 1179px) {
        width: 215px;
    }
`;

let aboutInfoClass = css`
    margin: 13px 0 0;
    font-size: 16px;
    line-height: 22px;
    font-weight: 400;
    width: 180px;

    a {
        color: #1790ff;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }

    @media (max-width: 999px) {
        width: auto;
    }
`;

let aboutBoxClass = css`
    width: calc(100% - 253px);

    @media (max-width: 999px) {
        width: auto;
    }
    @media (min-width: 1000px) and (max-width: 1179px) {
        width: calc(100% - 215px);
    }
`;

let aboutAdditionalClass = css`
    font-style: italic;
    color: #536086;
    margin: 3px 0 0;
    font-size: 15px;
    line-height: 24px;

    a {
        color: inherit;
        text-decoration: none;
        font-weight: 600;
        display: inline-block;
        vertical-align: top;
    }
    a:hover {
        text-decoration: underline;
    }

    @media (max-width: 767px) {
        br {
            display: none;
        }
    }
`;

export const AboutStyles = {
    root: aboutRootClass,
    row: aboutRowClass,
    label: aboutLabelClass,
    info: aboutInfoClass,
    box: aboutBoxClass,
    additional: aboutAdditionalClass,
};
