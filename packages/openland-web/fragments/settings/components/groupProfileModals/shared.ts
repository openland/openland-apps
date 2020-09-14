import { css } from 'linaria';

export const modalSubtitle = css`
    color: var(--foregroundPrimary);
    margin-bottom: 20px;
    white-space: pre-wrap;
    word-wrap: break-word;
    max-width: 320px;
`;

export interface GroupSettingsModalBodyProps<T> {
    roomId: string;
    hide: () => void;
    initialValue: T;
}
