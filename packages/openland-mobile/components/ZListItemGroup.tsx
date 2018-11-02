import * as React from 'react';
import { View, Text } from 'react-native';
import { AppStyles } from '../styles/AppStyles';

export class ZListItemGroup extends React.PureComponent<{ header?: string | null, footer?: string | null, divider?: boolean, actionRight?: { title: string, onPress: () => void } }> {
    render() {
        let components: any[] = [];
        React.Children.forEach(this.props.children, (c) => {
            if (c !== null && c !== undefined) {
                components.push(c);
                if (components.length > 0 && this.props.divider !== false && !(c as any).props.divider) {
                    components.push(<View key={'div-' + components.length} style={{ paddingLeft: (c as any).props.leftIcon ? 64 : (c as any).props.leftAvatar ? 69 : 15 }} width="100%"><View backgroundColor={AppStyles.separatorColor} height={1} /></View>);
                }
            }
        });

        if (components.length === 0) {
            return null;
        }

        // if (isAndroid) {
        //     return (
        //         <View backgroundColor={AppStyles.backyardColor}>
        //             {this.props.header !== null && this.props.header !== undefined && <Text style={{ color: '#8e8e93', fontSize: 13, textTransform: 'uppercase', height: 45, lineHeight: 30, textAlignVertical: 'center', paddingLeft: 15, paddingRight: 15, paddingTop: 15 }} numberOfLines={1} ellipsizeMode="tail">{this.props.header}</Text>}
        //             {this.props.header === null && <View height={30} />}
        //             <View backgroundColor={AppStyles.separatorColor} height={1} width="100%" />
        //             <View backgroundColor="#fff">
        //                 {components}
        //             </View>
        //             {this.props.footer !== null && this.props.footer !== undefined && <Text style={{ color: '#8e8e93', fontSize: 13, textTransform: 'uppercase', height: 45, lineHeight: 30, textAlignVertical: 'center', paddingLeft: 15, paddingRight: 15, paddingTop: 15 }} numberOfLines={1} ellipsizeMode="tail">{this.props.footer}</Text>}
        //             <View backgroundColor={AppStyles.separatorColor} height={1} width="100%" />
        //         </View>
        //     );
        // }

        return (
            <View>
                {this.props.header !== null && this.props.header !== undefined &&
                    <View
                        style={{
                            paddingTop: 35,
                            paddingBottom: 10,
                            flexDirection: 'row'
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
                                flexGrow: 1
                            }}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {this.props.header}
                        </Text>

                        {this.props.actionRight && (
                            <Text
                                onPress={this.props.actionRight.onPress}
                                style={{
                                    color: '#4747ec',
                                    fontSize: 15,
                                    fontWeight: '500',
                                    height: 18,
                                    lineHeight: 18,
                                    paddingLeft: 16,
                                    paddingRight: 16,
                                }}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {this.props.actionRight.title}
                            </Text>
                        )}
                    </View>
                }
                {this.props.header === null && <View height={30} />}
                {/* <View backgroundColor={AppStyles.separatorColor} height={1} width="100%" /> */}
                <View>
                    {components}
                </View>
                {/* {this.props.divider !== false && <View backgroundColor={AppStyles.separatorColor} marginLeft={15} height={1} width="100%" />} */}
                {this.props.footer !== null && this.props.footer !== undefined && (
                    <Text style={{ color: '#8e8e93', fontSize: 13, lineHeight: 17, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, paddingTop: 6 }} >{this.props.footer}</Text>
                )}
            </View>
        );
    }
}