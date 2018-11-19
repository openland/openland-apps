import * as React from 'react';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XRouterProvider } from 'openland-x-routing/XRouterProvider';
import { Routes } from '../routes';
import '../globals';
import { SharedStorage, getServerStorage, getClientStorage } from 'openland-x-utils/SharedStorage';
import { XStorageProvider } from 'openland-x-routing/XStorageProvider';

interface WithDataProps {
    serverState: { apollo: { data: any, token?: string, org?: string } };
    host: string;
    protocol: string;
    domain: string;
    composedInitialProps: any;
    storage: SharedStorage;
}

export const withData = (name: String, ComposedComponent: React.ComponentType) => {
    let componentName = name.split(' ').map((v) => v.trim()).filter((v) => v !== '').join();
    return class WithData extends React.Component<WithDataProps> {
        static displayName = componentName;
        static async getInitialProps(ctx: any) {
            let host: string;
            let protocol: string;
            let storage: SharedStorage;
            if (ctx.req) {
                host = ctx.req.get('host');
                protocol = ctx.req.protocol;
                storage = getServerStorage(ctx);
            } else {
                host = window.location.host;
                protocol = window.location.protocol.replace(':', '');
                storage = getClientStorage();
            }

            // Evaluate the composed component's getInitialProps()
            let composedInitialProps = {};
            if ((ComposedComponent as any).getInitialProps) {
                composedInitialProps = await (ComposedComponent as any).getInitialProps(ctx);
            }

            return {
                // serverState,
                composedInitialProps,
                host,
                protocol,
                storage
            };
        }

        render() {
            return (
                <XStorageProvider storage={canUseDOM ? getClientStorage() : this.props.storage}>
                    <XRouterProvider routes={Routes} hostName={this.props.host} protocol={this.props.protocol}>
                        <ComposedComponent {...this.props.composedInitialProps} />
                    </XRouterProvider>
                </XStorageProvider>
            );
        }
    };
};