import { css } from 'linaria';

let footerRootClass = css`
    background: #fafafa;

    @media (max-width: 767px) {
        padding: 25px 0 0;
    }
`;

let footerForMobileClass = css`
    @media (min-width: 768px) {
        display: none;
    }
`;

let footerColumnsClass = css`
    padding: 54px 0 33px;
    display: flex;

    @media (max-width: 767px) {
        padding: 30px 0 26px;
        margin: 0 auto;
        flex-wrap: wrap;
        width: calc(100% + 5px);
        max-width: 350px;
    }

    @media (min-width: 768px) and (max-width: 999px) {
        padding: 54px 0 8px;
    }
`;

let footerColumnClass = css`
    &:nth-child(1) {
        width: 253px;
    }
    &:nth-child(2) {
        width: 202px;
    }
    &:nth-child(3) {
        width: 198px;
    }
    &:nth-child(4) {
        width: 236px;
    }
    &:nth-child(5) {
        flex-grow: 1;
    }
    @media (max-width: 767px) {
        &:nth-child(1) {
            display: none;
        }
        &:nth-child(2) {
            margin: 0 0 31px;
            width: 43%;
        }
        &:nth-child(3) {
            margin: 0 0 31px;
            width: 57%;
        }
        &:nth-child(4) {
            width: 43%;
        }
        &:nth-child(5) {
            width: 57%;
        }
    }
    @media (min-width: 768px) and (max-width: 999px) {
        &:nth-child(1) {
            width: 180px;
        }
        &:nth-child(2) {
            width: 100px;
        }
        &:nth-child(3) {
            width: 130px;
        }
        &:nth-child(4) {
            width: 190px;
        }
    }
    @media (min-width: 1000px) and (max-width: 1179px) {
        &:nth-child(1) {
            width: 215px;
        }
        &:nth-child(2) {
            width: 130px;
        }
        &:nth-child(3) {
            width: 160px;
        }
        &:nth-child(4) {
            width: 200px;
        }
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
    forMobile: footerForMobileClass,
    columns: footerColumnsClass,
    column: footerColumnClass,
    info: footerInfoClass,
};
