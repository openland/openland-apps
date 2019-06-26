import * as React from 'react';
import { XView } from 'react-mental';
import { TagGroup, TagButton, Tag } from './TagButton';

export const TagsCloud = (props: {
    tagsGroup: TagGroup;
    selected: Set<string>;
    onSelectedChange: (selected: Set<string>) => void;
}) => {
    let [showAll, setShowAll] = React.useState(false);

    let onShowAll = React.useCallback(() => {
        setShowAll(!showAll);
    }, [showAll]);

    let onTagPress = (tag: Tag) => {
        let selected = props.selected.has(tag.id);

        if (selected) {
            props.selected.delete(tag.id);
        } else {
            props.selected.add(tag.id);
        }

        props.onSelectedChange(props.selected);
    };

    // console.log(selected);

    return (
        <XView flexDirection="column">
            <XView marginBottom={18} flexDirection="row" flexWrap="wrap" width={350}>
                {props.tagsGroup.tags
                    .filter((t, i) => showAll || i < 17)
                    .map(tag => (
                        <TagButton
                            tag={tag}
                            onPress={onTagPress}
                            selected={props.selected.has(tag.id)}
                        />
                    ))}
                {props.tagsGroup.tags.length > 17 && !showAll && (
                    <TagButton
                        tag={{ title: showAll ? 'Less' : 'More', id: 'button_more' }}
                        onPress={onShowAll}
                        selected={false}
                    />
                )}
            </XView>
        </XView>
    );
};
