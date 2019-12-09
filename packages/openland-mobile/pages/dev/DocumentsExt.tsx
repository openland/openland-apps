import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { SScrollView } from 'react-native-s/SScrollView';
import { View } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { ZDocumentExt } from 'openland-mobile/components/file/ZDocumentExt';

const DocumentsExtComponent = React.memo(props => {
    return (
        <>
            <SHeader title="Document extensions" />
            <SScrollView>
                <View paddingLeft={16} paddingRight={8} flexDirection="row">
                    <View marginVertical={8} marginRight={8}>
                        <ZDocumentExt name="table.xlsx" />
                    </View>
                    <View marginVertical={8} marginRight={8}>
                        <ZDocumentExt name="table.xlsx" loading={true} />
                    </View>
                    <View marginVertical={8} marginRight={8}>
                        <ZDocumentExt name="table.xlsx" size="large" />
                    </View>
                    <View marginVertical={8} marginRight={8}>
                        <ZDocumentExt name="table.xlsx" size="large" loading={true} />
                    </View>
                </View>
                <View paddingLeft={16} paddingRight={8} flexDirection="row">
                    <View marginVertical={8} marginRight={8}>
                        <ZDocumentExt name="archive.zip" />
                    </View>
                    <View marginVertical={8} marginRight={8}>
                        <ZDocumentExt name="archive.zip" loading={true} />
                    </View>
                    <View marginVertical={8} marginRight={8}>
                        <ZDocumentExt name="archive.zip" size="large" />
                    </View>
                    <View marginVertical={8} marginRight={8}>
                        <ZDocumentExt name="archive.zip" size="large" loading={true} />
                    </View>
                </View>
                <View paddingLeft={16} paddingRight={8} flexDirection="row">
                    <View marginVertical={8} marginRight={8}>
                        <ZDocumentExt name="book.pdf" />
                    </View>
                    <View marginVertical={8} marginRight={8}>
                        <ZDocumentExt name="book.pdf" loading={true} />
                    </View>
                    <View marginVertical={8} marginRight={8}>
                        <ZDocumentExt name="book.pdf" size="large" />
                    </View>
                    <View marginVertical={8} marginRight={8}>
                        <ZDocumentExt name="book.pdf" size="large" loading={true} />
                    </View>
                </View>
                <View paddingLeft={16} paddingRight={8} flexDirection="row">
                    <View marginVertical={8} marginRight={8}>
                        <ZDocumentExt name="design.fig" />
                    </View>
                    <View marginVertical={8} marginRight={8}>
                        <ZDocumentExt name="design.fig" loading={true} />
                    </View>
                    <View marginVertical={8} marginRight={8}>
                        <ZDocumentExt name="design.fig" size="large" />
                    </View>
                    <View marginVertical={8} marginRight={8}>
                        <ZDocumentExt name="design.fig" size="large" loading={true} />
                    </View>
                </View>
                <View paddingLeft={16} paddingRight={8} flexDirection="row">
                    <View marginVertical={8} marginRight={8}>
                        <ZDocumentExt name="paper.docx" />
                    </View>
                    <View marginVertical={8} marginRight={8}>
                        <ZDocumentExt name="paper.docx" loading={true} />
                    </View>
                    <View marginVertical={8} marginRight={8}>
                        <ZDocumentExt name="paper.docx" size="large" />
                    </View>
                    <View marginVertical={8} marginRight={8}>
                        <ZDocumentExt name="paper.docx" size="large" loading={true} />
                    </View>
                </View>
                <View paddingLeft={16} paddingRight={8} flexDirection="row">
                    <View marginVertical={8} marginRight={8}>
                        <ZDocumentExt name="some_file" />
                    </View>
                    <View marginVertical={8} marginRight={8}>
                        <ZDocumentExt name="some_file" loading={true} />
                    </View>
                    <View marginVertical={8} marginRight={8}>
                        <ZDocumentExt name="some_file" size="large" />
                    </View>
                    <View marginVertical={8} marginRight={8}>
                        <ZDocumentExt name="some_file" size="large" loading={true} />
                    </View>
                </View>
            </SScrollView>
        </>
    );
});

export const DocumentsExt = withApp(DocumentsExtComponent, { navigationAppearance: 'small' });