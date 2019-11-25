import * as React from 'react';
import { css } from 'linaria';
import { showShortcutsHelp } from 'openland-web/fragments/chat/showShortcutsHelp';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import IcKeyboard from 'openland-icons/s/ic-keyboard-24.svg';

const shortcutsIcon = css`
    position: absolute;
    right: 36px;
    top: 0px;
    padding: 8px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: opacity 150ms cubic-bezier(0.29, 0.09, 0.24, 0.99);
    background-color: var(--backgroundTertiary);
    &:hover {
        opacity: 0.5;
    }
`;

export const ShortcutButton = React.memo(() => (
    <div className={shortcutsIcon} onClick={showShortcutsHelp}>
        <UIcon icon={<IcKeyboard />} size={20} />
    </div>
));
