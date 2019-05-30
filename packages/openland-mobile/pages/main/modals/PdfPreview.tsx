/**
 * Copyright (c) 2017-present, Wonday (@wonday.org)
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
    Dimensions,
    View,
} from 'react-native';

import Pdf from 'react-native-pdf';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';

const WIN_WIDTH = Dimensions.get('window').width;

export class PdfPreview extends React.PureComponent<{ path: string }, {
    page: number,
    scale: number,
    numberOfPages: number,
    horizontal: false,
    width: number
}> {

    pdf: any;
    url?: string;
    constructor(props: { path: string }) {
        super(props);
        this.state = {
            page: 1,
            scale: 1,
            numberOfPages: 0,
            horizontal: false,
            width: WIN_WIDTH
        };
        this.url = props.path;
        this.pdf = null;
    }

    render() {
        let source = { uri: this.url, cache: false };
        return (
            <ASSafeAreaView style={{ width: '100%', height: '100%' }}>
                <View style={{ flex: 1, width: this.state.width }}>
                    <Pdf
                        ref={(pdf) => {
                            this.pdf = pdf;
                        }}
                        source={source}
                        page={this.state.page}
                        scale={this.state.scale}
                        horizontal={this.state.horizontal}
                        onError={(error) => {
                            console.warn(error);
                        }}
                        style={{ flex: 1 }}
                    />
                </View>
            </ASSafeAreaView>
        )
    }
}