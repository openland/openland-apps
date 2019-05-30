/**
 * Copyright (c) 2017-present, Wonday (@wonday.org)
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    Dimensions,
    View,
    Text,
    SafeAreaView
} from 'react-native';

import Pdf from 'react-native-pdf';
import { withApp } from 'openland-mobile/components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';

const WIN_WIDTH = Dimensions.get('window').width;

class PdfPreviewComponent extends React.PureComponent<PageProps, {
    page: number,
    scale: number,
    numberOfPages: number,
    horizontal: false,
    width: number
}> {

    pdf: any;
    url?: string;
    constructor(props: any) {
        super(props);
        this.state = {
            page: 1,
            scale: 1,
            numberOfPages: 0,
            horizontal: false,
            width: WIN_WIDTH
        };
        let uuid = this.props.router.params.config.uuid;
        this.url = uuid.includes('https://ucarecdn.com/') ? uuid : 'https://ucarecdn.com/' + uuid + '/';
        this.pdf = null;
    }

    prePage = () => {
        let prePage = this.state.page > 1 ? this.state.page - 1 : 1;
        this.setState({ page: prePage });
        console.log(`prePage: ${prePage}`);
    };

    nextPage = () => {
        let nextPage = this.state.page + 1 > this.state.numberOfPages ? this.state.numberOfPages : this.state.page + 1;
        this.setState({ page: nextPage });
        console.log(`nextPage: ${nextPage}`);
    };

    zoomOut = () => {
        let scale = this.state.scale > 1 ? this.state.scale / 1.2 : 1;
        this.setState({ scale: scale });
        console.log(`zoomOut scale: ${scale}`);
    };

    zoomIn = () => {
        let scale = this.state.scale * 1.2;
        scale = scale > 3 ? 3 : scale;
        this.setState({ scale: scale });
        console.log(`zoomIn scale: ${scale}`);
    };

    // switchHorizontal = () => {
    //     this.setState({ horizontal: !this.state.horizontal, page: this.state.page });
    // };

    render() {
        let source = { uri: this.url, cache: true };

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
                        onLoadComplete={(numberOfPages, filePath) => {
                            // this.state.numberOfPages = numberOfPages; //do not use setState, it will cause re-render
                            // console.log(`total page count: ${numberOfPages}`);
                            // console.log(tableContents);
                        }}
                        onPageChanged={(page, numberOfPages) => {
                            // this.state.page = page; //do not use setState, it will cause re-render
                        }}
                        onError={(error) => {
                            console.log(error);
                        }}
                        style={{ flex: 1 }}
                    />
                </View>
            </ASSafeAreaView>

        )
    }
}

export const PdfPreview = withApp(PdfPreviewComponent, { navigationAppearance: 'small' });
