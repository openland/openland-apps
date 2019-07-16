import * as React from 'react';
import { XView } from 'react-mental';
import { ThemeDefault } from 'openland-y-utils/themes';

type UButtonStyle = 'primary' | 'secondary' | 'secondary-inverted' | 'danger';
type UButtonSize = 'small' | 'medium' | 'large';

interface UButtonProps {
    title: string;
    onClick?: () => void;
    path?: string;
    size?: UButtonSize;
    style?: UButtonStyle;
    loading?: boolean;
}

export const UButton = React.memo((props: UButtonProps) => {
    const { title, onClick, path, size = 'medium', style = 'primary', loading } = props;

    return (
        <XView
            alignItems="center"
            cursor="pointer"
            onClick={onClick}
            path={path}
            linkSelectable={true}
        >
            {title}
        </XView>
    );
});