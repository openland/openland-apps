import * as React from 'react';
import { XGrid2 } from './XGrid2';
import { XCell } from './XGrid';
import { XVertical } from './XVertical';

export class XLayoutTwoColumnsContent extends React.Component {
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

export class XLayoutTwoColumnsInfo extends React.Component {
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

export class XLayoutTwoColumns extends React.Component {

    static Primary = XLayoutTwoColumnsContent;
    static Secondary = XLayoutTwoColumnsInfo;

    render() {
        return (
            <XGrid2
                layouts={{
                    gap: 32,
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
            </XGrid2>
        );
    }
}