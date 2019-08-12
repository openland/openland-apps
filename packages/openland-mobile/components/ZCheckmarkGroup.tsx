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
}

export function ZCheckmarkGroup<T>(props: ZCheckmarkGroupProps<T>) {
    const handlePress = React.useCallback((item: Item<T>) => {
        if (props.onChange) {
            props.onChange(item);
        }
    }, []);

    return (
        <ZListGroup header={props.header} footer={props.footer}>
            {props.items.map((item, key) => (
                <ZListItem
                    key={`${key}-checkmark`}
                    text={item.label}
                    onPress={() => handlePress(item)}
                    checkmark={props.value === item.value}
                />
            ))}
        </ZListGroup>
    );
}