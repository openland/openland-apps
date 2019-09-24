import { SequenceHandler } from './SequenceHandler';
import { GraphqlClient, GraphqlActiveSubscription } from 'openland-graphql/GraphqlClient';

export class SequenceModernWatcher<TSubscription extends { event: any }, TVars> {
    readonly name: string;
    readonly client: GraphqlClient;
    private readonly handler: (src: any) => void;
    private readonly seqHandler?: (seq: number) => void;
    private readonly stateHandler?: (seq: string) => void;
    private readonly sequenceHandler: SequenceHandler;
    private readonly variables?: any;
    private currentState: string | null;
    private subscription: GraphqlActiveSubscription<TSubscription, TVars>;

    constructor(name: string, subscription: GraphqlActiveSubscription<TSubscription, TVars>, client: GraphqlClient, handler: (src: any) => void | Promise<void>, seqHandler?: (seq: number) => void, variables?: TVars, state?: string | null, stateHandler?: (seq: string) => void) {
        this.name = name;
        this.handler = handler;
        this.seqHandler = seqHandler;
        this.client = client;
        this.currentState = null;
        this.variables = variables;
        this.sequenceHandler = new SequenceHandler(this.handleInternal);
        this.stateHandler = stateHandler;

        if (state) {
            this.currentState = state;
        }
        this.subscription = subscription;
        this.start();
    }

    public destroy() {
        this.subscription.destroy();
    }

    private start() {
        (async () => {
            while (true) {

                let update = await this.subscription.get();
                this.handleUpdate(update);
            }
        })();
    }

    private handleUpdate = (update: TSubscription) => {

        // if (update.errors && update.errors.length > 0) {
        //     throw update.errors;
        // }

        let event = update.event;
        if (event.fromSeq) {
            // Do batch updates
            this.currentState = event.state;
            this.subscription.updateVariables({ ...this.variables, state: this.currentState });
            for (let u of event.updates) {
                this.sequenceHandler.push(u);
            }
            this.sequenceHandler.doAfter(() => {
                if (this.seqHandler) {
                    this.seqHandler(event.seq);
                }
                if (this.stateHandler) {
                    this.stateHandler(event.state);
                }
            });
        } else if (event.state && event.updates) {
            // handle batch updates for subscriptions without seq
            this.currentState = event.state;
            this.subscription.updateVariables({ ...this.variables, state: this.currentState });
            for (let u of event.updates) {
                this.sequenceHandler.push(u);
            }
            this.sequenceHandler.doAfter(() => {
                if (this.stateHandler) {
                    this.stateHandler(event.state);
                }
            });
        } else if (event.updates) {
            // handle batch updates for subscriptions without seq and state
            for (let u of event.updates) {
                this.sequenceHandler.push(u);
            }
        } else {
            // Do single update
            this.currentState = event.state;
            this.subscription.updateVariables({ ...this.variables, state: this.currentState });
            this.sequenceHandler.push(event.update);
            this.sequenceHandler.doAfter(() => {
                if (this.seqHandler) {
                    this.seqHandler(event.seq);
                }
                if (this.stateHandler) {
                    this.stateHandler(event.state);
                }
            });

        }
    }

    private handleInternal = async (update: any) => {
        await this.handler(update);
    }
}