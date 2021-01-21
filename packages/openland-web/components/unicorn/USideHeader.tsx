import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import IcDropdown from 'openland-icons/s/ic-dropdown-16.svg';

const titleContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    user-select: none;
`;

const titleIcon = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-left: 8px;
`;

const titleActive = css`
    transform: rotate(180deg);
`;

interface USideHeaderProps {
    title:
        | string
        | {
              title: string;
              active: boolean;
              action: (element: HTMLElement | React.MouseEvent<unknown, MouseEvent>) => void;
          };
    children?: any;
}

export const USideHeader = React.memo((props: USideHeaderProps) => {
    const { title, children } = props;

    return (
        <XView
            height={56}
            paddingLeft={16}
            paddingRight={3}
            paddingVertical={12}
            flexDirection="row"
            backgroundColor="var(--backgroundPrimary)"
        >
            <XView
                {...TextStyles.Title1}
                flexGrow={1}
                minWidth={0}
                flexBasis={0}
                color="var(--foregroundPrimary)"
                flexDirection="row"
            >
                {typeof title === 'string' ? (
                    title
                ) : (
                    <div className={titleContainer} onClick={title.action}>
                        {title.title}{' '}
                        <div className={cx(titleIcon, title.active && titleActive)}>
                            <UIcon icon={<IcDropdown />} />
                        </div>
                    </div>
                )}
            </XView>
            <XView flexDirection="row" alignItems="center">
                {children}
            </XView>
        </XView>
    );
});
