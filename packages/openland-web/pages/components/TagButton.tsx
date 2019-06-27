import * as React from 'react';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';

export type Tag = { id: string; title: string };
export type TagGroup = { id: string; title?: string | null; subtitle?: string | null; tags: Tag[] };

export const TagButton = (props: { tag: Tag; selected: boolean; onPress: (tag: Tag) => void }) => {
    let callback = React.useCallback(
        () => {
            props.onPress(props.tag);
        },
        [props.tag],
    );

    return (
        <XView marginRight={12} marginBottom={12}>
            <XButton
                onClick={callback}
                text={props.tag.title}
                style={props.selected ? 'primary' : 'light'}
            />
        </XView>
    );
};
