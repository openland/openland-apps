import * as React from 'react';
import { SharedStorage } from 'openland-x-utils/SharedStorage';
import { getComponentDisplayName } from 'openland-x-utils/getComponentDisplayName';
import { XStorageContext } from './XStorageContext';

export function withStorage<P = {}>(ComposedComponent: React.ComponentType<P & { storage: SharedStorage }>): React.ComponentClass<P> {
    return class WithStorage extends React.Component<P> {
        static displayName = `WithStorage(${getComponentDisplayName(ComposedComponent)})`;

        render() {
            return (
                <XStorageContext.Consumer>
                    {(storage) => {
                        if (!storage) {
                            throw Error('Cookies not configured!');
                        }
                        return <ComposedComponent storage={storage} {...this.props} />;
                    }}
                </XStorageContext.Consumer>
            );
        }
    };
}