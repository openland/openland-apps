import { css } from 'linaria';

let footerRootClass = css`
    background: #fafafa;

    @media (max-width: 767px) {
        padding: 25px 0 0;
    }
`;

let footerInfoClass = css`
    border-top: 1px solid rgba(237, 239, 243, 0.6);
    text-align: center;
    color: rgba(31, 52, 73, 0.5);
    padding: 17px 0 19px;
    font-size: 14px;
    line-height: 24px;

    @media (max-width: 767px) {
        padding: 14px 0 20px;
        border: none;
    }

    span {
        padding: 0 0 0 17px;
        display: inline-block;

        @media (max-width: 767px) {
            padding: 0;
            display: block;
        }
    }
`;

export const FooterStyles = {
    root: footerRootClass,
    info: footerInfoClass,
};
