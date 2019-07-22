import * as React from 'react';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { ThemeDefault } from 'openland-y-utils/themes';
import AddIcon from 'openland-icons/s/ic-add-24.svg';

interface UAddItemProps {
    title: string;
    onClick: () => void;
}

export const UAddItem = React.memo((props: UAddItemProps) => (
    <UListItem
        title={props.title}
        onClick={props.onClick}
        icon={<AddIcon />}
        iconBackground={ThemeDefault.accentPrimary}
        useRadius={true}
    />
));