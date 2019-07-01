import * as React from 'react';
import { XView } from 'react-mental';
import { TagGroup, TagButton, Tag } from './TagButton';

export const TagsCloud = ({
    tagsGroup,
    selected,
    onPress,
}: {
    tagsGroup: TagGroup;
    selected: string[];
    onPress: (pressedTag: Tag) => void;
}) => {
    let [showAll, setShowAll] = React.useState(false);

    let onShowAll = React.useCallback(() => {
        setShowAll(!showAll);
    }, [showAll]);

    return (
        <XView flexDirection="column">
            <XView
                marginBottom={36}
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="center"
                width={350}
            >
                {tagsGroup.tags
                    .filter((t, i) => showAll || i < 17)
                    .map(tag => (
                        <TagButton
                            key={tag.id}
                            tag={tag}
                            onPress={onPress}
                            selected={selected.indexOf(tag.id) !== -1}
                        />
                    ))}
                {tagsGroup.tags.length > 17 && !showAll && (
                    <TagButton
                        tag={{ title: showAll ? 'Less' : 'More', id: 'button_more' }}
                        onPress={onShowAll}
                        selected={false}
                        isMore
                    />
                )}
            </XView>
        </XView>
    );
};
