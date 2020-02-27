import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SFlatList } from 'react-native-s/SFlatList';
import { View, TouchableWithoutFeedback, Image, Text } from 'react-native';
import { RadiusStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { plural } from 'openland-y-utils/plural';

const collections = [
    {   
        id: 'vmZR69a4k0FoqJEJDykRIyeZ3q',
        title: 'The State of socialThe State of socialThe State of socialThe State of socialThe State of socialThe State of socialThe State of social', 
        groups: 128,
        cover: '',
    },
    {
        id: 'vmZR69a4k0FoqJEJDykRIyeZ3q',
        title: 'The State of social', 
        groups: 1,
        cover: '',
    },
    {
        id: 'vmZR69a4k0FoqJEJDykRIyeZ3q',
        title: 'The State of social', 
        groups: 128,
        cover: '',
    },
    {
        id: 'vmZR69a4k0FoqJEJDykRIyeZ3q',
        title: 'The State of social', 
        groups: 128,
        cover: '',
    },
];

interface CollectionProps {
    id: string;
    title: string;
    cover: string;
    groups: number;
}

const Collection = (props: CollectionProps) => {
    let theme = useTheme();
    let onPress = () => {/** noop */};
    return (
        <View style={{width: 375, height: 264, padding: 16}}>
            <TouchableWithoutFeedback onPress={onPress}>
                <View flexDirection="column" borderRadius={RadiusStyles.Large} paddingTop={8} paddingBottom={6}>
                    <Image 
                        source={{uri: props.cover}}
                        style={{
                            width: 343, 
                            height: 192, 
                            borderRadius: RadiusStyles.Large, 
                            borderWidth: 0.5,
                            borderColor: theme.border, 
                            marginBottom: 16,
                        }}
                    />
                    <View flexGrow={1} flexShrink={1} flexDirection="row" alignItems="center">
                        <Text style={{...TextStyles.Label1, color: theme.foregroundPrimary, flexGrow: 1, flexShrink: 1}} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>{props.title}</Text>
                        <Text style={{...TextStyles.Subhead, color: theme.foregroundTertiary}} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>
                            {plural(props.groups, ['group', 'groups'])}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const CollectionsComponent = () => {
    let [loading] = React.useState(false);
    let handleLoadMore = () => {/** noop */};

    return (
        <>
            <SHeader title="Collections" />
            <SFlatList
                data={collections}
                renderItem={({ item }) => (
                    <Collection key={item.id} {...item} />
                )}
                keyExtractor={(item, index) => index + '-' + item.id}
                onEndReached={handleLoadMore}
                refreshing={loading}
            />
        </>
    );
};

export const Collections = withApp(CollectionsComponent);
