/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  FlatList,
  TextInput,
  Button,
  ListView
} from 'react-native';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { buildClient, OpenApolloClient } from 'openland-y-graphql/apolloClient';
import { AccountQuery } from 'openland-api';
import { YQuery } from 'openland-y-graphql/YQuery';
import { ChatListQuery } from 'openland-api/ChatListQuery';
import { YApolloProvider } from 'openland-y-graphql/YApolloProvider';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { DialogComponent } from './DialogComponent';
import { ConversationShortFragment } from 'openland-api/Types';
import { ConversationState, Day, MessageGroup } from 'openland-engines/messenger/ConversationState';
import { BubbleView } from './BubbleView';
import { isServerMessage } from 'openland-engines/messenger/types';
import { ConversationStateHandler } from 'openland-engines/messenger/ConversationEngine';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

interface MessagesSection {
  day?: Day;
  key: string;
  data: MessageGroup[];
}

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
      msgs.reverse();
      // res.push({
      //     day: d,
      //     key: d.key,
      //     data: msgs
      // });

      for (let g of msgs) {
        res.push(g);
      }
    }
    res.reverse();
    // return res;
    this.setState({ state: res });
  }
  renderItem = (src: MessageGroup) => {
    let isOut = src.sender.id === this.props.messenger.user.id;
    return (
      <View>
        <View flexDirection="column" alignItems="flex-start">
          <Text>{src.sender.name}</Text>
          {src.messages.map((v) => (<BubbleView key={isServerMessage(v) ? v.id : v.key} appearance="text" isOut={isOut}><Text style={{ color: isOut ? '#fff' : '#000' }}>{v.message}</Text></BubbleView>))}
        </View>
      </View>
    );
    //
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
            contentContainerStyle={{
              transform: [{ scaleY: -1 }]
            }}
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
      let client = buildClient({
        // Put your token here
        // token: '<token>',
        organization: '61gk9KRrl9ComJkvYnvdcddr4o',
        endpoint: 'https://api.openland.com/api',
        wsEndpoint: 'wss://api.openland.com/api'
      });
      let meq = await client.client.query<any>({
        query: AccountQuery.document
      });
      let messenger = new MessengerEngine(client, meq.data.me);
      this.setState({ messenger, client });
    })();
  }

  selectDialog = (dialog: ConversationShortFragment) => {
    this.setState({ dialog });
  }

  render() {
    return (
      <View width="100%" height="100%">
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
                      // <View flexGrow={1} flexBasis={0} flexDirection="column">
                      <View flexGrow={1} flexBasis={0} backgroundColor={'#ff0'}>
                        <ListView
                          dataSource={new ListView.DataSource({ rowHasChanged: () => false }).cloneWithRows(conv)}
                          renderRow={(v) => (<DialogComponent key={v.id} onPress={this.selectDialog} engine={this.state.messenger!!} item={v} />)}
                        />
                        {/* <ScrollView style={{ transform: [{ scaleY: -1 }] }}>
                          {conv.map((v) => (<DialogComponent key={v.id} onPress={this.selectDialog} engine={this.state.messenger!!} item={v} />))}
                        </ScrollView> */}
                      </View>
                      // </View>
                    );
                    // return (
                    //   <MessengerContext.Consumer>
                    //     {(messenger) => (<DialogListComponent engine={messenger!!} dialogs={conv} onPress={this.handleItemClick} />)}
                    //   </MessengerContext.Consumer>
                    // );
                  }}
                </YQuery>
              </View>
              <View flexGrow={1} flexBasis={0} flexDirection="column" alignItems="stretch">
                {this.state.dialog && (
                  <>
                    <View><Text>{this.state.dialog.title}</Text></View>
                    <View flexGrow={1} flexBasis={0} flexDirection="column" alignItems="stretch">
                      <MessagesList key={this.state.dialog!!.id} dialog={this.state.dialog!!} messenger={this.state.messenger!!} />
                    </View>
                    <View>
                      <TextInput
                        onChangeText={(v) => this.setState({ text: v })}
                        value={this.state.text}
                      />
                      <Button
                        title="send"
                        onPress={() => {
                          this.state.messenger!!.getConversation(this.state.dialog!!.id).sendMessage(this.state.text);
                        }}
                      />
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