import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { DataSourceMessageItem, ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { ASImage } from 'react-native-async-view/ASImage';

const Container = (props: { children?: any }) => <ASFlex alignItems="center" justifyContent="center">
    <ASFlex marginTop={16} height={20} backgroundColor="rgba(153,162,176,0.6)" borderRadius={10}>
        <ASText color="#fff" fontSize={12} lineHeight={17} height={20} marginLeft={6} marginRight={6}>
            {props.children}
        </ASText>
    </ASFlex>
</ASFlex>

export class AsyncServiceMessageView extends React.PureComponent<{
    message: DataSourceMessageItem,
    engine: ConversationEngine,
    onUserPress: (id: string) => void;

}> {

    userNameYouTransform = (user: { name: string, id: string }) => {
        return user.id === this.props.engine.engine.user.id ? 'You' : user.name;
    }
    render() {
        let meta = this.props.message.serviceMetaData!;
        if (meta.__typename === 'KickServiceMetadata') {
            if (meta.kickedBy.id === meta.user.id) {
                return (
                    <Container>
                        <ASText color="#fff" fontWeight="600" fontSize={12} lineHeight={17} height={20} marginLeft={6} marginRight={6} onPress={() => this.props.onUserPress((meta as any).user.id)}>{meta.user.name}</ASText>
                        {' '}
                        has left the room
                    </Container>
                );
            } else {
                return (
                    <Container>
                        <ASText color="#fff" fontWeight="600" fontSize={12} lineHeight={17} height={20} marginLeft={6} marginRight={6} onPress={() => this.props.onUserPress((meta as any).user.id)}>{meta.user.name}</ASText>
                        {' '}
                        was kicked by
                        {' '}
                        <ASText color="#fff" fontWeight="600" fontSize={12} lineHeight={17} height={20} marginLeft={6} marginRight={6} onPress={() => this.props.onUserPress((meta as any).kickedBy.id)}>{this.userNameYouTransform(meta.kickedBy)}</ASText>
                    </Container>
                );
            }
        } else if (meta.__typename === 'PhotoChangeServiceMetadata') {
            return (
                <Container>
                    <ASText color="#fff" fontWeight="600" fontSize={12} lineHeight={17} height={20} marginLeft={6} marginRight={6} onPress={() => this.props.onUserPress(this.props.message.senderId)}>{this.userNameYouTransform({ id: this.props.message.senderId, name: this.props.message.senderName })}</ASText>
                    {' '}
                    changed group photo
                    </Container>
            );
        }

        return (
            <Container>
                <ASText color="#fff" fontSize={12} lineHeight={17} height={20} marginLeft={6} marginRight={6}>
                    {this.props.message.text}
                </ASText>
            </Container>
        );
    }
}