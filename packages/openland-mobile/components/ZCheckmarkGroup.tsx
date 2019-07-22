import * as React from 'react';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';

type Value = boolean | string | number;

type Item = {
    label: string;
    value: Value;
};

interface ZCheckmarkGroupProps {
    header?: string;
    footer?: string;
    onChange?: (item: Item) => void;
    items: Item[];
    value?: Value;
}

export const ZCheckmarkGroup = (props: ZCheckmarkGroupProps) => {
    const handlePress = React.useCallback((item: Item) => {
        if (props.onChange) {
            props.onChange(item);
        }
    }, []);

    return (
        <ZListItemGroup header={props.header} footer={props.footer}>
            {props.items.map((item, key) => (
                <ZListItem
                    key={`${key}-checkmark`}
                    text={item.label}
                    onPress={() => handlePress(item)}
                    checkmark={props.value === item.value}
                />
            ))}
        </ZListItemGroup>
    );
};