import { ApolloClient } from 'apollo-client';
import UUID from 'uuid/v4';
import { SendMessageMutation } from 'openland-api/SendMessageMutation';

export interface MessageSendHandler {
    onProgress(key: string, progress: number): void;
    onCompleted(key: string): void;
    onFailed(key: string): void;
}

export class MessageSender {
    private client: ApolloClient<{}>;
    private uploadedFiles = new Map<string, string>();

    constructor(client: ApolloClient<{}>) {
        this.client = client;
    }

    sendFile(conversationId: string, file: UploadCare.File, callback: MessageSendHandler) {
        let key = UUID();
        (async () => {
            try {
                if (!this.uploadedFiles.has(key)) {
                    let res = await new Promise<UploadCare.FileInfo>((resolver, reject) => {
                        file.fail(() => {
                            reject();
                        });
                        file.progress((p) => {
                            callback.onProgress(key, p.progress);
                        });
                        file.done((f) => {
                            resolver(f);
                        });
                    });
                    this.uploadedFiles.set(key, res.uuid);
                }
            } catch (e) {
                callback.onFailed(key);
            }
            this.doSendMessage(conversationId, null, this.uploadedFiles.get(key)!!, key, callback);
        })();
        return key;
    }

    sendMessage(conversationId: string, message: string, callback: MessageSendHandler) {
        message = message.trim();
        if (message.length === 0) {
            throw Error('Message can\'t be empty');
        }
        let key = UUID();
        this.doSendMessage(conversationId, message, null, key, callback);
        return key;
    }

    private doSendMessage(conversationId: string, message: string | null, file: string | null, key: string, callback: MessageSendHandler) {
        (async () => {
            try {
                await this.client.mutate({
                    mutation: SendMessageMutation.document,
                    variables: {
                        message: message,
                        file: file,
                        repeatKey: key,
                        conversationId: conversationId
                    }
                });
            } catch (e) {
                if (e.graphQLErrors && e.graphQLErrors.find((v: any) => v.doubleInvoke === true)) {
                    // Ignore
                } else {
                    // Just ignore for now
                    console.warn(e);
                    callback.onFailed(key);
                    return;
                }
            }
            callback.onCompleted(key);
        })();
    }
}