import * as React from 'react';
import Glamorous from 'glamorous';

const EmptySearchWrapper = Glamorous.div({
    height: 'calc(100vh - 118px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const EmptySearchBox = Glamorous.div({
    background: 'url(/static/X/empty-bg.png) center center no-repeat',
    backgroundSize: 'auto 100%',
    width: '100%',
    height: 600,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
});

const EmptySearchBlockTitle = Glamorous.div({
    marginTop: 54,
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '24px',
    letterSpacing: -0.5,
    color: '#99a2b0',
});

export class EmptySearchBlock extends React.Component<{ text: string }> {
    render() {
        return (
            <EmptySearchWrapper>
                <EmptySearchBox>
                    <img src="" srcSet="/static/X/directory/empty-state.png, /static/X/directory/empty-state@2x.png 2x, /static/X/directory/empty-state@3x.png 3x" />
                    <EmptySearchBlockTitle>{this.props.text}</EmptySearchBlockTitle>
                </EmptySearchBox>
            </EmptySearchWrapper>
        );
    }
}