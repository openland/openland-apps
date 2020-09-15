import * as React from 'react';
import { UListItem, UListItemProps } from 'openland-web/components/unicorn/UListItem';
import AddIcon from 'openland-icons/s/ic-plus-glyph-24.svg';

interface UAddItemProps {
    title: string;
    onClick: (event: React.MouseEvent) => void;
    active?: boolean;
    style?: 'primary' | 'secondary';
}

export const UAddItem = React.memo((props: UAddItemProps & UListItemProps) => {
    const { title, onClick, active, style = 'primary', ...other } = props;
    const iconColor = style === 'primary' ? 'var(--foregroundInverted)' : 'var(--foregroundSecondary)';
    const backgroundColor = style === 'primary' ? 'var(--accentPrimary)' : 'var(--backgroundTertiaryTrans)';

    return (
        <UListItem
            title={title}
            onClick={onClick}
            icon={<AddIcon />}
            iconColor={iconColor}
            label={true}
            iconBackground={backgroundColor}
            useRadius={true}
            hovered={active}
            {...other}
        />
    );
});