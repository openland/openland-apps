import * as React from 'react';
import { MyCards_myCards } from 'openland-api/Types';
import { css, cx } from 'linaria';
import { TextTitle2, TextBody } from 'openland-web/utils/TextStyles';

const box = css`
    background: var(--backgroundSecondary);
    box-shadow: 0px 0px 48px rgba(0, 0, 0, 0.04), 0px 8px 24px rgba(0, 0, 0, 0.08);
    border-radius: 12px;
    padding: 20px 24px 24px;
    position: relative;
`;

const titleBox = css`
    margin-bottom: 26px;
`;

const title = css``;
const buttons = css``;

const cardDate = css`
    color: var(--foregroundSecondary);
`;

const cardNumber = css`
    margin-top: 4px;
    color: var(--foregroundSecondary);
`;

const brandLogo = css`
    position: absolute;
    bottom: 24px; right: 20px;
    border: 1px solid var(--border);
    width: 44px; height: 28px;
    border-radius: 3px;
`;

interface CardViewProps {
    card: MyCards_myCards;
}

export const CardView = React.memo((props: CardViewProps) => {
    const { card } = props;
    const { brand, last4, expMonth, expYear } = card;

    return (
        <div className={box}>
            <div className={titleBox}>
                <div className={cx(title, TextTitle2)}>
                    {brand}
                </div>
                <div className={buttons}>
                    {/* <UMoreButton /> */}
                </div>
            </div>
            <div className={cx(cardDate, TextBody)}>
                {expMonth}/{expYear}
            </div>
            <div className={cx(cardNumber, TextBody)}>
                •••• {last4}
            </div>
            <div className={brandLogo} />
        </div>
    );
});