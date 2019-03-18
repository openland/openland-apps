import { SequenceHandler } from './SequenceHandler';
import { GraphqlClient, GraphqlActiveSubscription } from 'openland-graphql/GraphqlClient';
import { GraphqlTypedSubscription } from 'openland-y-graphql/typed';

export class SequenceModernWatcher<TSubscription extends { event: any }, TVars> {
    readonly name: string;
    readonly client: GraphqlClient;
    private readonly handler: (src: any) => void;
    private readonly seqHandler?: (seq: number) => void;
    private readonly query: any;
    private readonly sequenceHandler: SequenceHandler;
    private readonly variables?: any;
    private currentState: string | null;
    private subscription: GraphqlActiveSubscription<TSubscription, TVars>;

    constructor(name: string, query: GraphqlTypedSubscription<TSubscription, TVars>, client: GraphqlClient, handler: (src: any) => void | Promise<void>, seqHandler?: (seq: number) => void, variables?: TVars, state?: string | null) {
        this.name = name;
        this.query = query;
        this.handler = handler;
        this.seqHandler = seqHandler;
        this.client = client;
        this.currentState = null;
        this.variables = variables;
        this.sequenceHandler = new SequenceHandler(this.handleInternal);

        if (state) {
            this.currentState = state;
        }
        this.subscription = this.client.subscribe(this.query, { ...this.variables, state: this.currentState });
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
            if (this.seqHandler) {
                this.seqHandler(event.seq);
            }
        } else {
            // Do single update
            this.currentState = event.state;
            this.subscription.updateVariables({ ...this.variables, state: this.currentState });
            this.sequenceHandler.push(event.update);
            if (this.seqHandler) {
                this.seqHandler(event.seq);
            }
        }
    }

    private handleInternal = async (update: any) => {
        await this.handler(update);
    }
}