import * as React from 'react';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { View, ScrollView, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { TextStyles, RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { plural } from 'openland-y-utils/plural';
import { SRouterContext } from 'react-native-s/SRouterContext';

const items = [
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

interface DiscoverCollectionsItemProps {
    id: string;
    cover: string;
    title: string;
    groups: number;
}

const DiscoverCollectionsItem = (props: DiscoverCollectionsItemProps) => {
    const theme = useTheme();
    const router = React.useContext(SRouterContext)!;
    const onPress = React.useCallback(() => {
        router.push('Conversation', {id: props.id});
    }, [props.id]);
    return (
        <View style={{width: 167, height: 162, marginRight: 8}}>
            <TouchableWithoutFeedback onPress={onPress}>
                <View flexDirection="column" borderRadius={RadiusStyles.Large} paddingVertical={8}>
                    <Image 
                        source={{uri: props.cover}}
                        style={{
                            width: 167, 
                            height: 94, 
                            borderRadius: RadiusStyles.Large, 
                            borderWidth: 0.5,
                            borderColor: theme.border, 
                            marginBottom: 8,
                        }}
                    />
                    <View flexGrow={1} flexShrink={1} flexDirection="column">
                        <Text style={{...TextStyles.Label1, color: theme.foregroundPrimary}} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>{props.title}</Text>
                        <Text style={{...TextStyles.Subhead, color: theme.foregroundTertiary}} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>
                            {plural(props.groups, ['group', 'groups'])}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export const DiscoverCollectionsList = () => {

    return (
        <ZListGroup header="Collections" >
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} paddingLeft={16}>
                {items.map((item, i) => <DiscoverCollectionsItem key={i} {...item} />)}
                <View width={24} />
            </ScrollView>
        </ZListGroup>
    );
};