import * as React from 'react';
import { withPage } from '../../../components/Navigation/withPage';
import { XHead } from '../../../components/X/XHead';
import { XGrid } from '../../../components/X/XGrid';
import { XCell } from '../../../components/X/XGrid';
export default withPage((props) => {

    return (
        <>
        <XHead title="San Francisco Housing Analytics" />
        <div className="x-in">
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
        </div>
        </>
    );
});