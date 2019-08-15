import * as React from 'react';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import AddIcon from 'openland-icons/s/ic-add-24.svg';

interface UAddItemProps {
    title: string;
    onClick: (event: React.MouseEvent) => void;
    active?: boolean;
}

export const UAddItem = React.memo((props: UAddItemProps) => (
    <UListItem
        title={props.title}
        onClick={props.onClick}
        icon={<AddIcon />}
        iconBackground="var(--accentPrimary)"
        useRadius={true}
        hovered={props.active}
    />
));