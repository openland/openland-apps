import * as React from 'react';
import { css, cx } from 'linaria';
import { TagGroup, TagButton, Tag } from './TagButton';

const wrapper = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 24px;
`;

export const TagsCloud = ({
    tagsGroup,
    selectedTags,
    onPress,
    className,
}: {
    tagsGroup: TagGroup;
    selectedTags: string[];
    className?: string;
    onPress: (pressedTag: Tag) => void;
}) => {
    return (
        <div className={cx(wrapper, className)}>
            {tagsGroup.tags
                .map(tag => (
                    <TagButton
                        key={tag.id}
                        tag={tag}
                        onPress={onPress}
                        selected={selectedTags.indexOf(tag.id) !== -1}
                    />
                ))}
        </div>
    );
};
