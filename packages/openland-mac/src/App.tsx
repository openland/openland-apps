/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TextInput,
  Button
} from 'react-native';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import { AccountQuery } from 'openland-api';
import { YQuery } from 'openland-y-graphql/YQuery';
import { ChatListQuery } from 'openland-api/ChatListQuery';
import { ApolloProvider } from 'react-apollo';
import { ConversationShortFragment } from 'openland-api/Types';
import { ConversationState, Day, MessageGroup } from 'openland-engines/messenger/ConversationState';
import { ConversationStateHandler } from 'openland-engines/messenger/ConversationEngine';
import { buildApolloClient } from './utils/apolloClient';
import { AppStyles } from 'openland-mobile/styles/AppStyles';
import { DialogItemView } from 'openland-shared/DialogItemView';
import { MessageView } from 'openland-shared/MessageView';

class MessagesList extends React.PureComponent<{ messenger: MessengerEngine, dialog: ConversationShortFragment }, { state: MessageGroup[] }> implements ConversationStateHandler {

  private ref = React.createRef<FlatList<any>>();

  constructor(props: { messenger: MessengerEngine, dialog: ConversationShortFragment }) {
    super(props);
    let conv = this.props.messenger.getConversation(this.props.dialog.id);
    let res: MessageGroup[] = [];
    for (let d of conv.getState().messagesPrepprocessed) {
      // let msgs = [...d.messages];
      // msgs.reverse();
      // res.push({
      //     day: d,
      //     key: d.key,
      //     data: msgs
      // });
      for (let g of d.messages) {
        res.push(g);
      }
    }
    res.reverse();
    // return res;
    this.state = { state: res };
  }
  componentDidMount() {
    let conv = this.props.messenger.getConversation(this.props.dialog.id);
    conv.subscribe(this);
  }

  onMessageSend() {
    //
  }

  onConversationUpdated(conv: ConversationState) {
    let res: MessageGroup[] = [];
    for (let d of conv.messagesPrepprocessed) {
      let msgs = [...d.messages];
      for (let g of msgs) {
        res.push(g);
      }
    }
    res.reverse();
    this.setState({ state: res });
  }

  handleAvatarPress = () => {
    //
  }

  renderItem = (src: MessageGroup) => {
    return (
      <MessageView onAvatarPress={this.handleAvatarPress} message={src} engine={this.props.messenger.getConversation(this.props.dialog.id)} />
    );
  }

  render() {
    return (
      <View flexGrow={1} flexBasis={0} flexDirection="column" alignItems="stretch">
        <View
          flexGrow={1}
          flexBasis={0}
        // backgroundColor="#ff0"
        >
          <FlatList
            contentContainerStyle={{
              paddingBottom: 10,
              paddingTop: 20
            }}
            style={{ width: '100%', height: '100%', backgroundColor: '#fff' }}
            data={this.state.state}
            renderItem={(item: any) => this.renderItem(item.item)}
            keyExtractor={(item: any) => item.key}
            // getItemLayout={(itm, ind) => ({ length: 130, offset: ind * 130, index: ind })}
            removeClippedSubviews={true}
            legacyImplementation={true}
            // disableVirtualization={true}
            // maxToRenderPerBatch={1}
            windowSize={1}
            {...({ flipped: true } as any)}
          />
        </View>
      </View>
    );
  }
}

export default class App extends Component<{}, { messenger?: MessengerEngine, client?: OpenApolloClient, dialog?: ConversationShortFragment, text: string }> {

  constructor(props: {}) {
    super(props);

    this.state = { text: '' };
  }

  componentDidMount() {
    (async () => {
      let client = buildApolloClient();
      let meq = await client.client.query<any>({
        query: AccountQuery.document
      });
      let messenger = new MessengerEngine(client, meq.data.me);
      this.setState({ messenger, client });
    })();
  }

  selectDialog = (dialog: ConversationShortFragment) => {
    this.setState({ dialog, text: '' });
  }

  render() {
    return (
      <View width="100%" height="100%" backgroundColor="#fff">
        {!this.state.messenger && <ActivityIndicator />}
        {this.state.client && (
          <ApolloProvider client={this.state.client.client}>
            <View flexDirection="row" alignItems="stretch" width="100%" height="100%">
              <View flexDirection="column" width={350}>
                <YQuery query={ChatListQuery}>
                  {(res) => {
                    if (!res.data || !res.data.chats) {
                      return <ActivityIndicator />;
                    }
                    let conv = res.data.chats.conversations;
                    return (
                      <View flexGrow={1} flexBasis={0}>
                        <View
                          style={{
                            // height: 56,
                            paddingLeft: 15,
                            paddingTop: 44,
                            paddingBottom: 22
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 28,
                              fontWeight: '600'
                            }}
                          >
                            Messages
                          </Text>
                        </View>
                        <FlatList
                          data={conv}
                          renderItem={(v) => (<DialogItemView key={v.item.id} onPress={this.selectDialog} engine={this.state.messenger!!} item={v.item} selected={this.state.dialog && (v.item.id === this.state.dialog.id)} />)}
                          keyExtractor={(k) => k.id}
                          extraData={this.state.dialog && this.state.dialog.id}
                        />
                      </View>
                    );
                  }}
                </YQuery>
              </View>
              <View width={1} backgroundColor={AppStyles.separatorColor} />
              <View flexGrow={1} flexBasis={0} flexDirection="column" alignItems="stretch">
                {this.state.dialog && (
                  <>
                    <View
                      style={{
                        paddingLeft: 15,
                        paddingTop: 22,
                        paddingBottom: 22,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: '500'
                          }}
                        >
                          {this.state.dialog.title}
                        </Text>
                      </View>
                    </View>
                    <View backgroundColor="#b7bdc6" opacity={0.3} width={'100%'} height={1} />
                    <View flexGrow={1} flexBasis={0} flexDirection="column" alignItems="stretch">
                      <MessagesList key={this.state.dialog!!.id} dialog={this.state.dialog!!} messenger={this.state.messenger!!} />
                    </View>
                    <View width={1} backgroundColor={AppStyles.separatorColor} />
                    <View paddingTop={3} paddingBottom={5} flexDirection="row" paddingLeft={30} paddingRight={30} key={this.state.dialog!!.id + 'panel'}>
                      <View
                        marginBottom={12}
                        marginTop={12}
                        marginRight={8}
                        borderRadius={15}
                        borderWidth={1}
                        borderColor={AppStyles.separatorColor}
                        flex={1}
                        flexGrow={1}
                        flexBasis={0}
                        paddingTop={8}
                        paddingBottom={8}
                        paddingLeft={8}
                        paddingRight={8}
                      >
                        <TextInput
                          placeholder="Message..."
                          placeholderTextColor="grey"
                          style={{ fontSize: 16 }}
                          onChangeText={(v) => this.setState({ text: v })}
                          value={this.state.text}
                          multiline={false}
                        />
                      </View>
                      <View alignSelf="center">
                        <Button
                          title="send"
                          onPress={() => {
                            this.state.messenger!!.getConversation(this.state.dialog!!.id).sendMessage(this.state.text);
                            this.setState({ text: '' });
                          }}
                        />
                      </View>
                    </View>
                  </>
                )}
              </View>
            </View>
          </ApolloProvider>)}
      </View>
    );
  }
}