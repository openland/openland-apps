import * as React from 'react';
import { XView, XViewProps } from 'react-mental';
import { TextStyles, HoverAlpha } from 'openland-web/utils/TextStyles';

interface UListHeaderProps {
    text: string;
    counter?: string | number;
    padded?: boolean;
    action?: {
        title: string;
        path?: string;
        onClick?: (e: any) => void;
    };
    rightElement?: JSX.Element;
}

export const UListHeader = (props: UListHeaderProps & XViewProps) => {
    const { text, counter, action, padded, rightElement, ...styles } = props;

    return (
        <XView
            marginTop={16}
            height={40}
            paddingHorizontal={padded !== false ? 16 : undefined}
            flexDirection="row"
            alignItems="center"
            {...styles}
        >
            <XView flexDirection="row" flexGrow={1} flexShrink={1} justifyContent="flex-start">
                <XView {...TextStyles.Title3} color="var(--foregroundPrimary)" flexShrink={1}>
                    {text}
                </XView>

                {!!counter && (
                    <XView {...TextStyles.Title3} color="var(--foregroundTertiary)" marginLeft={8}>
                        {counter}
                    </XView>
                )}
            </XView>

            {!!action && (
                <XView
                    {...TextStyles.Label1}
                    cursor="pointer"
                    color="var(--accentPrimary)"
                    hoverOpacity={HoverAlpha}
                    path={action.path}
                    onClick={action.onClick}
                >
                    {action.title}
                </XView>
            )}

            {rightElement}
        </XView>
    );
};