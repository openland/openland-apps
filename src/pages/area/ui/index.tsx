import * as React from 'react';
import { withPage } from '../../../components/Navigation/withPage';
import { XHead } from '../../../components/X/XHead';
import { XGrid } from '../../../components/X/XGrid';
import { XCell } from '../../../components/X/XGrid';
import { XPageContent } from '../../../components/X/XPageContent';
import { XCard } from '../../../components/X/XCard';
import { XButton } from '../../../components/X/XButton';
import { XTitle } from '../../../components/X/XTitle';
import { XVertical } from '../../../components/X/XVertical';

import { XView } from '../../../components/X/XView';
import { Title, Text } from '../../../components/Incubator/XRowsExample';

export default withPage((props) => {

    return (
        <>
        <XHead title="San Francisco Housing Analytics" />
        <XPageContent>
            <XCard>
                <XCard.Content>
                    <XGrid
                        layouts={{
                            templateAreas: [
                                ['sidebar', 'header', 'header'],
                                ['sidebar', 'footer', 'footer']
                            ],
                            'xs': {
                                templateAreas: [
                                    ['header', 'sidebar'],
                                    ['header', 'sidebar'],
                                    ['footer', 'sidebar']
                                ],
                            },
                            'sm': {
                                templateAreas: [
                                    ['sidebar', 'sidebar'],
                                    ['header', 'header'],
                                    ['footer', 'footer']
                                ],
                            }
                        }}
                    >
                        <XCell area="sidebar">
                            Sidebar
                        </XCell>
                        <XCell area="header">
                            Header
                        </XCell>
                        <XCell area="footer">
                            Footer
                        </XCell>
                    </XGrid>
                </XCard.Content>
            </XCard>
            <XCard>
                <XCard.Content>
                    <XTitle>Default Button</XTitle>
                    <XVertical>
                        <XButton alignSelf="flex-start">Default</XButton>
                        <XButton alignSelf="flex-start" style="dark" disabled={true}>Bordered</XButton>
                        <XButton alignSelf="flex-start" style="dark" size="large">Large</XButton>
                        <XButton alignSelf="flex-start" style="dark" size="large" bounce={true}>Bounce</XButton>

                        <XButton alignSelf="flex-start" style="important">Important</XButton>
                        <XButton alignSelf="flex-start" loading={true} />
                        <XButton alignSelf="flex-start" loading={true} disabled={true}>Loading</XButton>
                    </XVertical>
                </XCard.Content>
            </XCard>
            <XCard shadow="medium">
                <XCard.Footer text="footer">
                    <XButton alignSelf="flex-start" style="dark">Bordered</XButton>
                    <XButton alignSelf="flex-start" style="dark">Bordered</XButton>
                </XCard.Footer>
                <XCard.Hint title="test data"/>
            </XCard>
            <XCard>
                <XCard.Hint title="test data"/>
                <XCard.Warning title="Warning example with hint and button element">
                    <XButton alignSelf="flex-start">Default</XButton>
                </XCard.Warning>
            </XCard>
            <XCard separators={true}>
                <XCard.Hint title="test data"/>
                <XCard.Header title="Loader block title"/>
                <XCard.Loader loading={true} >
                    <XCard.FormList>
                        <XCard.FormCell 
                            title="XForm example"
                            placeholder="Placeholder"
                            description="Form description"
                        />
                    </XCard.FormList>
                    <XCard.Warning title="Warning example with hint and button element">
                        <XButton alignSelf="flex-start">Default</XButton>
                    </XCard.Warning>
                </XCard.Loader>
            </XCard>
            <XCard shadow="medium" loading={true}>
                <XCard.Footer text="footer">
                    <XButton alignSelf="flex-start" style="dark">Bordered</XButton>
                    <XButton alignSelf="flex-start" style="dark">Bordered</XButton>
                </XCard.Footer>
            </XCard>
            <XCard>
                <XCard.FormList>
                    <XCard.FormCell 
                        title="XForm example"
                        placeholder="Placeholder"
                        description="Form description"
                    />
                </XCard.FormList>
            </XCard>
            <XCard>
                <XCard.Content>
                    <XView>
                        <Title>Example title</Title>
                        <XView>
                            <Text>Example text</Text>
                            <a style={{color: '#6638F0'}}>example description column child components</a>
                        </XView>
                    </XView>
                    <XView>
                        <XView justifyContent="space-between" direction="row" alignItems="center">
                            <Title>Example title with button</Title>
                            <XButton alignSelf="flex-start" style="dark">Bordered</XButton>
                        </XView>
                        <XView>
                            <Text>
                                Example text
                                <a style={{color: '#6638F0'}}>example description inline child components</a>
                            </Text>
                        </XView>
                    </XView>
                    <XView justifyContent="space-between" direction="row">
                        <Text>Footer example with two buttons</Text>
                        <XView justifyContent="space-between" direction="row" childWhiteSpace={true}>
                            <XButton alignSelf="flex-start" style="dark">Bordered</XButton>
                            <XButton alignSelf="flex-start" style="dark">Bordered</XButton>
                        </XView>
                    </XView>
                </XCard.Content>
            </XCard>
        </XPageContent>
        </>
    );
});