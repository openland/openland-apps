import * as React from 'react';
import * as S from 'semantic-ui-react';
export interface ColumnProps {
    col?: number;
}

export class Column extends React.Component<ColumnProps, {}> {
    render() {
        return (
            <S.GridColumn>{this.props.children}</S.GridColumn>
        );
    }
}

export class CardRow extends React.Component<{}, {}> {
    render() {
        return (
            <S.GridRow>
                {this.props.children}
            </S.GridRow>
        );
    }
}