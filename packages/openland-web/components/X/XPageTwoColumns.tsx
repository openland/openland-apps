import * as React from 'react';
import { XGrid } from './XGrid';
import { XCell } from './XGrid';
import { XPageContent } from './XPageContent';
import { XVertical } from './XVertical';

export class XPageTwoColumnsContent extends React.Component {
    render() {
        return (
            <XCell area="content">
                <XVertical>
                    {this.props.children}
                </XVertical>
            </XCell>
        );
    }
}

export class XPageTwoColumnsInfo extends React.Component {
    render() {
        return (
            <XCell area="info">
                <XVertical>
                    {this.props.children}
                </XVertical>
            </XCell>
        );
    }
}

export class XPageTwoColumns extends React.Component {

    static Primary = XPageTwoColumnsContent;
    static Secondary = XPageTwoColumnsInfo;

    render() {
        return (
            <XPageContent>
                <XGrid
                    layouts={{
                        gap: 30,
                        templateColumns: '2fr 1fr',
                        templateAreas: [
                            ['content', 'info'],
                        ],
                        'md-': {
                            templateColumns: '1fr',
                            templateAreas: [
                                ['content'],
                                ['info']
                            ],
                        }
                    }}>
                    {this.props.children}
                </XGrid>
            </XPageContent>
        );
    }
}