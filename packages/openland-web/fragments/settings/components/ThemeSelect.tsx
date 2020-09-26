import * as React from 'react';
import { css, cx } from 'linaria';
import { ThemeOptions } from '../SettingsAppearanceFragment';
import { URadioDot } from 'openland-web/components/unicorn/URadioItem';
import { TextBody } from 'openland-web/utils/TextStyles';
import ThemeUi from 'openland-icons/theme-view.svg';

const themeContainer = css`
    display: flex;
    padding: 0 8px;
    cursor: pointer;
    flex-wrap: wrap;
`;

const themeItem = css`
    width: calc(100% / 3);
    padding: 8px;

    @media (max-width: 767px) {
        width: 50%;
    }
`;

const themePreview = css`
    padding: calc(100 / 176 * 100%) 0 0;
    background: url(/static/img/theme-bg.png) no-repeat;
    background-size: 100% 100%;
    margin: 0 0 16px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;

    svg {
        position: absolute;
        bottom: 0; right: 0;
        box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.24);
        border-radius: 4px 0 0 0;
        width: 68%; height: 84%;
    }

    &.is-auto {
        --foregroundQuaternary: #C8C9CC;
        --backgroundPrimary: #FFFFFF;
        --backgroundTertiary: #F2F3F5;

        @media (prefers-color-scheme: dark) {
            --foregroundQuaternary: #484B52;
            --backgroundPrimary: #111214;
            --backgroundTertiary: #242629;
        }
    }

    &.is-light {
        --foregroundQuaternary: #C8C9CC;
        --backgroundPrimary: #FFFFFF;
        --backgroundTertiary: #F2F3F5;
    }

    &.is-dark {
        --foregroundQuaternary: #484B52;
        --backgroundPrimary: #111214;
        --backgroundTertiary: #242629;
    }
`;

const themeRadio = css`
    display: flex;
    align-items: center;
`;

const themeTitle = css`
    flex-grow: 1;
    padding: 0 0 0 9px;
`;

interface ThemeSelectProps {
    value: ThemeOptions;
    onChange: (data: ThemeOptions) => void;
    selectOptions: ({
        value: ThemeOptions;
        label: string;
    })[];
}

export const ThemeSelect = React.memo((props: ThemeSelectProps) => {
    return (
        <div className={themeContainer}>
            {props.selectOptions.map((i) => {
                const selected = i.value === props.value;
                return (
                    <div
                        className={themeItem}
                        key={i.value}
                        onClick={() => props.onChange(i.value)}
                    >
                        <div className={cx(themePreview, `is-${i.value.toLowerCase()}`)}>
                            <ThemeUi />
                        </div>
                        <div className={themeRadio}>
                            <URadioDot checked={selected} />

                            <div className={cx(themeTitle, TextBody)}>
                                {i.label}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
});