import * as React from 'react';
import { XModalProvider, XModal, registerModalProvider } from './XDialog';

export class XDialogProviderComponent extends React.Component implements XModalProvider {
    showModal = (modal: XModal) => {
        //
    }
    componentWillMount() {
        registerModalProvider(this);
    }
    render() {
        return null;
    }
}