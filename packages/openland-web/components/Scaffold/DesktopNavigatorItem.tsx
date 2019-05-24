import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { counterBorderHoverClassname } from 'openland-x/XCounter';

interface NavigatorItemProps {
    path?: string;
    onClick?: React.MouseEventHandler<any>;
    children?: any;
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

export class DesktopNavigatorItem extends React.Component<NavigatorItemProps> {
    render() {
        const { path, onClick, children } = this.props;
        return (
            <XView
                as="a"
                position="relative"
                height={55}
                flexShrink={0}
                cursor="pointer"
                color="#b4b8bd"
                selectedBackgroundColor="rgba(0, 0, 0, 0.04)"
                hoverBackgroundColor="rgba(0, 0, 0, 0.04)"
                linkSelectable={path ? true : undefined}
                linkStrict={path ? true : undefined}
                path={path}
                onClick={onClick}
                hoverTextDecoration="none"
            >
                <div className={cx(desktopNavigatorItemClassname, counterBorderHoverClassname)}>
                    {children}
                </div>
            </XView>
        );
    }
}
