import * as React from 'react';
import { SharedStorage } from 'openland-x-utils/SharedStorage';
import { XStorageContext } from './XStorageContext';

export class XStorageProvider extends React.Component<{ storage: SharedStorage }> {
    render() {
        return <XStorageContext.Provider value={this.props.storage}>{this.props.children}</XStorageContext.Provider>;
    }
}