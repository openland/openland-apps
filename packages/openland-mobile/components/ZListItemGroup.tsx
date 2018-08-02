import * as React from 'react';
import { View, Text } from 'react-native';
import { AppStyles } from '../styles/AppStyles';
import { isAndroid } from '../utils/isAndroid';

export class ZListItemGroup extends React.PureComponent<{ header?: string | null }> {
    render() {
        let components: any[] = [];
        React.Children.forEach(this.props.children, (c) => {
            if (c !== null && c !== undefined) {
                if (components.length > 0) {
                    components.push(<View key={'div-' + components.length} style={{ paddingLeft: 15 }} width="100%"><View backgroundColor={AppStyles.separatorColor} height={1} /></View>);
                }
                components.push(c);
            }
        });

        if (components.length === 0) {
            return null;
        }

        if (isAndroid) {
            return (
                <View backgroundColor={AppStyles.backyardColor}>
                    {this.props.header !== null && this.props.header !== undefined && <Text style={{ color: '#8e8e93', fontSize: 13, textTransform: 'uppercase', height: 45, lineHeight: 30, textAlignVertical: 'center', paddingLeft: 15, paddingRight: 15, paddingTop: 15 }} numberOfLines={1} ellipsizeMode="tail">{this.props.header}</Text>}
                    {this.props.header === null && <View height={30} />}
                    <View backgroundColor={AppStyles.separatorColor} height={1} width="100%" />
                    <View backgroundColor="#fff">
                        {components}
                    </View>
                    <View backgroundColor={AppStyles.separatorColor} height={1} width="100%" />
                </View>
            );
        }

        return (
            <View>
                {this.props.header !== null && this.props.header !== undefined &&
                    <View
                        style={{
                            paddingTop: 35,
                            paddingBottom: 10
                        }}
                    >
                        <Text
                            style={{
                                color: '#000',
                                fontSize: 21,
                                fontWeight: '600',
                                height: 20,
                                lineHeight: 20,
                                paddingLeft: 15,
                                paddingRight: 15,
                            }}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {this.props.header}
                        </Text>
                    </View>
                }
                {this.props.header === null && <View height={30} />}
                {/* <View backgroundColor={AppStyles.separatorColor} height={1} width="100%" /> */}
                <View backgroundColor="#fff">
                    {components}
                </View>
                <View backgroundColor={AppStyles.separatorColor} marginLeft={15} height={1} width="100%" />
            </View>
        );
    }
}