import * as React from 'react';
import { XView } from 'react-mental';
import { UChip } from 'openland-web/components/unicorn/UChip';

export type Tag = { id: string; title: string };
export type TagGroup = { id: string; title?: string | null; subtitle?: string | null; tags: Tag[] };

export const TagButton = (props: {
    tag: Tag;
    selected: boolean;
    onPress: (tag: Tag) => void;
    isMore?: boolean;
}) => {
    let onClick = () => {
        props.onPress(props.tag);
    };

    return (
        <XView marginVertical={8} marginHorizontal={8}>
            <UChip text={props.tag.title} selected={props.selected} onClick={onClick} />
        </XView>
    );
};
