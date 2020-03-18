import * as React from 'react';
import { css, cx } from 'linaria';
import { TextDetail } from 'openland-web/utils/TextStyles';

const badge = css`
    background-color: var(--accentPay);
    color: var(--foregroundContrast);
    text-transform: uppercase;
    padding: 1.5px 4px 2.5px;
    border-radius: 4px;
    margin: 1px 8px -1px 0;
    opacity: 0.84;
    flex-shrink: 0;
`;

const badgeActive = css`
    background-color: var(--foregroundContrast);
    color: var(--accentMuted);
    opacity: 1;
`;

export const PremiumBadge = React.memo((props: { active?: boolean }) => (
    <div className={cx(badge, props.active && badgeActive, TextDetail)}>
        Pro
    </div>
));
