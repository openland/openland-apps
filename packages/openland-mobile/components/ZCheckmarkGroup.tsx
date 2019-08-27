import * as React from 'react';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';

type Item<T> = {
    label: string;
    value: T;
};

interface ZCheckmarkGroupProps<T> {
    header?: string;
    footer?: string;
    onChange?: (item: Item<T>) => void;
    items: Item<T>[];
    value?: T;
    headerMarginTop?: number;
}

export function ZCheckmarkGroup<T>(props: ZCheckmarkGroupProps<T>) {
    const { header, footer, onChange, items, value, headerMarginTop } = props;
    const handlePress = React.useCallback((item: Item<T>) => {
        if (onChange) {
            onChange(item);
        }
    }, []);

    return (
        <ZListGroup header={header} footer={footer} headerMarginTop={headerMarginTop}>
            {items.map((item, key) => (
                <ZListItem
                    key={`${key}-checkmark`}
                    text={item.label}
                    onPress={() => handlePress(item)}
                    checkmark={value === item.value}
                />
            ))}
        </ZListGroup>
    );
}