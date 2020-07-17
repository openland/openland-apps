import { OpenlandClient } from 'openland-api/spacex';

export class MessagesApi {
    readonly client: OpenlandClient;

    constructor(client: OpenlandClient) {
        this.client = client;
    }

    loadLastRead = async (id: string) => {
        let res = await this.client.queryChatNewReadLastRead({ chatId: id }, { fetchPolicy: 'network-only' });
        if (res.message) {
            return res.message.id;
        } else {
            return null;
        }
    }
}