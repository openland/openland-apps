import * as React from 'react';
import { css } from 'linaria';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import IcDone from 'openland-icons/s/ic-done-24.svg';
import { AccentOptions } from '../SettingsAppearanceFragment';

const appearanceContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 8px -8px;

    @media (max-width: 767px) {
        flex-wrap: wrap;
        justify-content: initial;
    }
`;

const accentColorItem = css`
    flex: 1;
    margin: 8px;
    border-radius: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: var(--bgItem);
    &::before {
        content: '';
        display: inline-block;
        padding-top: 100%;
    }

    @media (max-width: 767px) {
        flex: initial;
        width: 56px; height: 56px;

        &::before {
            display: none;
        }
    }
`;

interface AccentSelectProps {
    value: AccentOptions;
    onChange: (data: AccentOptions) => void;
    selectOptions: ({
        value: AccentOptions;
        label: string;
        color: string;
    })[];
}

export const AccentSelect = React.memo((props: AccentSelectProps) => {
    return (
        <div className={appearanceContainer}>
            {props.selectOptions.map((i) => {
                const selected = i.value === props.value;
                return (
                    <div
                        className={accentColorItem}
                        key={i.value}
                        onClick={() => props.onChange(i.value)}
                        style={
                            {
                                '--bgItem': i.color,
                            } as React.CSSProperties
                        }
                    >
                        {selected && <UIcon icon={<IcDone />} color="#fff" />}
                    </div>
                );
            })}
        </div>
    );
});