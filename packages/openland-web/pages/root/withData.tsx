import * as React from 'react';
import { NextAppContext } from 'next/app';
import { getToken } from 'openland-x-graphql/auth';
import { SharedStorage, getServerStorage, getClientStorage } from 'openland-x-utils/SharedStorage';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { createClientWeb } from 'openland-api/createClientWeb';

export function withData(App: React.ComponentType<any>) {
    return class WithData extends React.Component {
        static async getInitialProps(ctx: NextAppContext) {
            let appProps = {};
            try {
                if ((App as any).getInitialProps) {
                    appProps = await (App as any).getInitialProps(ctx);
                }
            } catch (e) {
                console.warn(e);
                throw e;
            }

            let host: string;
            let protocol: string;
            let storage: SharedStorage;
            let isApp: boolean;
            if (ctx.ctx.req) {
                host = (ctx.ctx.req as any).get('host');
                protocol = (ctx.ctx.req as any).protocol;
                let useragent = (ctx.ctx.req as any).get('User-Agent') as string;
                isApp = useragent ? useragent.indexOf('Electron') >= 0 : false;
                storage = getServerStorage(ctx.ctx);
            } else {
                host = window.location.host;
                protocol = window.location.protocol.replace(':', '');
                isApp = !!(global as any).require;
                storage = getClientStorage();
            }

            let token = getToken(ctx.ctx.req);
            createClientWeb(token);
            await null;
            return {
                ...appProps,
                token,
                host,
                protocol,
                storage,
                isApp,
            };
        }

        private client: OpenlandClient;
        constructor(props: any) {
            super(props);
            this.client = createClientWeb(props.token);
        }

        render() {
            return <App {...this.props} client={this.client} />;
        }
    };
}
