import * as React from 'react';
import { XView, XViewProps } from 'react-mental';
import { TagGroup, TagButton, Tag } from './TagButton';

export const TagsCloud = ({
    tagsGroup,
    selectedTags,
    onPress,
    ...other
}: {
    tagsGroup: TagGroup;
    selectedTags: string[];
    onPress: (pressedTag: Tag) => void;
} & XViewProps) => {
    return (
        <XView
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
            {...other}
        >
            {tagsGroup.tags
                .map(tag => (
                    <TagButton
                        key={tag.id}
                        tag={tag}
                        onPress={onPress}
                        selected={selectedTags.indexOf(tag.id) !== -1}
                    />
                ))}
        </XView>
    );
};
