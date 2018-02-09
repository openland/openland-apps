import * as React from 'react';
import { withPage } from '../../../components/Navigation/withPage';
import { XCardExample } from '../../../components/Incubator/XRowsExample';
import { XHead } from '../../../components/X/XHead';
import { XGrid } from '../../../components/X/XGrid';
import { XCell } from '../../../components/X/XGrid';
import { XPageContent } from '../../../components/X/XPageContent';
import { XCard } from '../../../components/X/XCard';
import { XButton } from '../../../components/X/XButton';
import { XTitle } from '../../../components/X/XTitle';
import { XVertical } from '../../../components/X/XVertical';
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
                        <XButton alignSelf="flex-start" style="dark">Bordered</XButton>
                        <XButton alignSelf="flex-start" style="dark" size="large">Large</XButton>
                        <XButton alignSelf="flex-start" style="dark" size="large" bounce={true}>Bounce</XButton>

                        <XButton alignSelf="flex-start" style="important">Important</XButton>
                        <XButton alignSelf="flex-start" loading={true} />
                        <XButton alignSelf="flex-start" loading={true}>Loading</XButton>
                    </XVertical>
                    <XCardExample
                        headerTitle="Header Title Example"
                        headerDescription="Description example."
                    />
                </XCard.Content>
            </XCard>
        </XPageContent>
        </>
    );
});