import * as React from 'react';
import { XView } from 'react-mental';
import { MenuPropsT, Title } from './';

export const DesktopMenu = ({ title, rightContent, children }: MenuPropsT) => {
    return (
        <XView width="100%">
            <XView
                flexDirection="row"
                width="100%"
                height={48}
                paddingLeft={16}
                paddingRight={16}
                marginTop={4}
                marginBottom={3}
                flexShrink={0}
                alignItems="center"
            >
                <XView flexDirection="row" width="100%" justifyContent="space-between">
                    <Title>{title}</Title>
                    <XView marginLeft={5} flexDirection="row">
                        {rightContent}
                    </XView>
                </XView>
            </XView>

            <XView flexDirection="column" alignItems="stretch" backgroundColor="#fff">
                {children}
            </XView>
        </XView>
    );
};
