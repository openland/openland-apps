import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { TopBar } from './components/TopBar';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { css } from 'linaria';
import { BackSkipLogo } from './components/BackSkipLogo';
import { getPercentageOfOnboarding } from './utils';

const backgroundClassName = css`
    background: white;
    width: 100%;
`;

export type Tag = { id: string; title: string };
export type TagGroup = { id: string; title?: string | null; subtitle?: string | null; tags: Tag[] };

const TagButton = (props: { tag: Tag; selected: boolean; onPress: (tag: Tag) => void }) => {
    let style: 'fill' | 'border' = 'fill' as any;

    let callback = React.useCallback(() => {
        props.onPress(props.tag);
    }, [props.tag]);
    return (
        <XView
            onClick={callback}
            marginRight={10}
            marginBottom={12}
            paddingHorizontal={16}
            paddingVertical={10}
            borderRadius={12}
            borderWidth={2}
            // style={
            //     {
            //         // backgroundColor:
            //         //     props.tag.id === 'button_more'
            //         //         ? undefined
            //         //         : props.selected
            //         //         ? style === 'fill'
            //         //             ? theme.accentColor
            //         //             : theme.accentBackgroundColor
            //         //         : theme.accentBackgroundColor,
            //         // borderColor: props.selected ? theme.accentColor : theme.accentBackgroundColor,
            //     }
            // }
        >
            <span
                style={{
                    fontSize: 16,
                    // fontWeight: TextStyles.weight.medium,
                    // color: props.selected
                    //     ? style === 'fill'
                    //         ? theme.textInverseColor
                    //         : theme.accentColor
                    //     : theme.accentColor,
                }}
            >
                {props.tag.title}
            </span>
        </XView>
    );
};

const TagsCloud = (props: {
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

    return (
        <XView flexDirection="column">
            <XView height={15} />
            {/* {props.tagsGroup.title && <Text style={{ fontSize: 16, marginBottom: 20, fontWeight: TextStyles.weight.medium, color: theme.textColor }}>{props.tagsGroup.title}</Text>} */}
            <XView marginBottom={18} flexDirection="row" flexWrap="wrap">
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
            {/* {sub} */}
        </XView>
    );
};

export default withApp('Home', 'viewer', () => {
    return (
        <div className={backgroundClassName}>
            <XDocumentHead title="Choose role" />
            <TopBar progressInPercents={getPercentageOfOnboarding(7)} />
            <XView marginBottom={150} marginTop={34}>
                <BackSkipLogo />
            </XView>

            <XView flexDirection="row" justifyContent="center">
                <XView flexDirection="column" alignSelf="center" alignItems="center">
                    <XView fontSize={24} marginBottom={12}>
                        Your role
                    </XView>
                    <XView fontSize={16} marginBottom={40}>
                        What roles have you played?
                    </XView>

                    <XButton text="Continue" style="primary" size="default" />
                </XView>
            </XView>
        </div>
    );
});
