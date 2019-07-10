import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { counterBorderHoverClassname } from 'openland-x/XCounter';

interface NavigatorItemProps {
    path?: string;
    onClick?: React.MouseEventHandler<any>;
    children?: any;
    isActive: boolean;
}

const desktopNavigatorItemClassname = css`
    display: flex;
    flex-direction: column;
    align-self: stretch;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    flex-grow: 1;
`;

const leftBarClassname = css`
    position: absolute;
    width: 2px;
    height: 48px;
    left: 0px;
    top: 0px;
    background: #0c7ff2;
    border-radius: 0px 100px 100px 0px;
`;

export class DesktopNavigatorItem extends React.Component<NavigatorItemProps> {
    render() {
        const { path, onClick, children, isActive } = this.props;
        return (
            <XView
                as="a"
                position="relative"
                height={48}
                flexShrink={0}
                cursor="pointer"
                color="#b4b8bd"
                linkSelectable={path ? true : undefined}
                linkStrict={path ? true : undefined}
                path={path}
                onClick={onClick}
                hoverTextDecoration="none"
            >
                <div className={cx(desktopNavigatorItemClassname, counterBorderHoverClassname)}>
                    {isActive && <div className={leftBarClassname} />}
                    {children}
                </div>
            </XView>
        );
    }
}
