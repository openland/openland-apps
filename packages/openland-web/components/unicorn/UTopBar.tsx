import * as React from 'react';
import { css, cx } from 'linaria';
import { TextBody, TextLabel1 } from 'openland-web/utils/TextStyles';
import { UIcon } from './UIcon';
import { defaultHover } from 'openland-web/utils/Styles';

const barContainer = css`
    height: 40px;
    display: flex;
    flex-shrink: 0;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const lightContainer = css`
    background-color: var(--backgroundTertiary);
`;

const positiveContainer = css`
    background-color: var(--accentPositive);
`;

const lightContainerHover = css`
    &:hover {
        background-color: var(--backgroundTertiaryHover);
    }
`;

const positiveContainerHover = css`
    &:hover {
        background-color: #52CC66;
    }
`;

const barContent = css`
    max-width: 824px;
    display: flex;
    flex-direction: row;
    padding: 0 16px;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
    flex-basis: 0;
`;

const barMainContent = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
`;

const iconContainer = css`
    width: 40px;
    height: 40px;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-right: 16px;

    & svg {
        width: 20px;
        height: 20px;
    }
`;

const barTitleSpacing = css`
    margin-right: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    flex-shrink: 0;
`;

const lightTitle = css`
    color: var(--foregroundPrimary);
`;

const positiveTitle = css`
    color: var(--foregroundContrast);
`;

const barTitle = cx(TextLabel1, barTitleSpacing);

const barSubtitleSpacing = css`
    white-space: pre-wrap;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 24px;
`;

const lightSubtitle = css`
    color: var(--foregroundPrimary);
`;

const positiveSubtitle = css`
    color: var(--foregroundContrast);
    opacity: 0.72;
`;

const rigthContainer = css`
    min-width: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 16px;
    height: 40px;
`;

const rightTextContainer = css`
    margin-right: 8px;
`;

const rightIconContainer = css`
    position: relative;
    top: 1px;
`;

const lightRightContainer = css`
    color: var(--foregroundSecondary);
`;

const positiveRightContainer = css`
    color: var(--foregroundContrast);
`;

const barSubtitle = cx(TextBody, barSubtitleSpacing);

interface UTopBarProps {
    type: 'light' | 'positive';
    leftIcon: JSX.Element;
    title: string | JSX.Element;
    subtitle: string | JSX.Element;
    onClick?: (e: React.MouseEvent) => void;
    rightIcon?: JSX.Element;
    rightText?: JSX.Element | string;
    onRightClick?: (e: React.MouseEvent) => void;
}

export const UTopBar = (props: UTopBarProps) => {
    return (
        <div 
            className={cx(
                barContainer,
                props.type === 'light' ? lightContainer : positiveContainer,
                props.type === 'light' ? lightContainerHover : positiveContainerHover
            )} 
            onClick={props.onClick}
        >
            <div className={barContent}>
                <div className={barMainContent}>
                    <div className={iconContainer}>
                        <UIcon 
                            icon={props.leftIcon} 
                            color={props.type === 'light' ? 'var(--foregroundSecondary)' : 'var(--foregroundContrast)'}
                        />
                    </div>
                    <div className={cx(barTitle, props.type === 'light' ? lightTitle : positiveTitle)}>{props.title}</div>
                    <div className={cx(barSubtitle, props.type === 'light' ? lightSubtitle : positiveSubtitle)}>{props.subtitle}</div>
                </div>
                {(props.rightText || props.rightIcon) && (
                    <div className={cx(rigthContainer, defaultHover, props.type === 'light' ? lightRightContainer : positiveRightContainer)} onClick={props.onRightClick}>
                        {props.rightText ? <div className={cx(TextLabel1, rightTextContainer)}>{props.rightText}</div> : null}
                        {props.rightIcon && (
                            <UIcon 
                                className={rightIconContainer} 
                                size={16} 
                                icon={props.rightIcon} 
                                color={props.type === 'light' ? 'var(--foregroundSecondary)' : 'var(--foregroundContrast)'}  
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
