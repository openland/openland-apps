import * as React from 'react';
import { XView } from 'react-mental';

export type Tag = { id: string; title: string };
export type TagGroup = { id: string; title?: string | null; subtitle?: string | null; tags: Tag[] };

export const TagButton = (props: {
    tag: Tag;
    selected: boolean;
    onPress: (tag: Tag) => void;
    isMore?: boolean;
}) => {
    let callback = React.useCallback(
        () => {
            props.onPress(props.tag);
        },
        [props.tag],
    );

    return (
        <XView marginVertical={6} marginHorizontal={6}>
            <XView
                backgroundColor={props.isMore ? '#fff' : props.selected ? '#1790ff' : '#E6F3FF'}
                hoverBackgroundColor={
                    props.isMore ? '#fff' : props.selected ? '#1585ed' : '#E6F2FF'
                }
                color={props.selected ? '#fff' : '#0084fe'}
                transition="all .2s ease"
                onClick={callback}
                borderRadius={12}
                height={43}
                fontWeight="600"
                cursor="pointer"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                paddingHorizontal={18}
                borderWidth={props.isMore ? 2 : undefined}
                borderColor={props.isMore ? '#f1f3f5' : undefined}
            >
                <span>{props.tag.title}</span>
            </XView>
        </XView>
    );
};
