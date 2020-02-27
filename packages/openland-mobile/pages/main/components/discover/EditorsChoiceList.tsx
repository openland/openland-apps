import * as React from 'react';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { View, ScrollView, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { TextStyles, RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { plural } from 'openland-y-utils/plural';
import { SRouterContext } from 'react-native-s/SRouterContext';

const items = [
    {   
        id: 'vmZR69a4k0FoqJEJDykRIyeZ3q',
        photo: '', 
        title: 'The State of socialThe State of socialThe State of socialThe State of socialThe State of socialThe State of socialThe State of social', 
        members: 128,
        cover: '',
    },
    {
        id: 'vmZR69a4k0FoqJEJDykRIyeZ3q',
        photo: '', 
        title: 'The State of social', 
        members: 1,
        cover: '',
    },
    {
        id: 'vmZR69a4k0FoqJEJDykRIyeZ3q',
        photo: '', 
        title: 'The State of social', 
        members: 128,
        cover: '',
    },
    {
        id: 'vmZR69a4k0FoqJEJDykRIyeZ3q',
        photo: '', 
        title: 'The State of social', 
        members: 128,
        cover: '',
    },
];

interface EditorsChoiceItemProps {
    id: string;
    cover: string;
    photo: string;
    title: string;
    members: number;
}

const EditorsChoiceItem = (props: EditorsChoiceItemProps) => {
    const theme = useTheme();
    const router = React.useContext(SRouterContext)!;
    const onPress = React.useCallback(() => {
        router.push('Conversation', {id: props.id});
    }, [router, props.id]);
    return (
        <View style={{width: 343, height: 264, marginRight: 8}}>
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
                        marginBottom: 14,
                    }}
                />
                <View flexDirection="row">
                    <ZAvatar size="medium" photo={props.photo} id={props.title} title={props.title} />
                    <View marginLeft={16} flexGrow={1} flexShrink={1} flexDirection="column">
                        <Text style={{...TextStyles.Label1, color: theme.foregroundPrimary}} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>{props.title}</Text>
                        <Text style={{...TextStyles.Subhead, color: theme.foregroundTertiary}} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>
                            {plural(props.members, ['member', 'members'])}
                        </Text>
                    </View>
                </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export const EditorsChoiceList = () => {

    return (
        <ZListGroup header="Editors' choice" >
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} paddingLeft={16}>
                {items.map((item, i) => <EditorsChoiceItem key={i} {...item} />)}
                <View width={24} />
            </ScrollView>
        </ZListGroup>
    );
};