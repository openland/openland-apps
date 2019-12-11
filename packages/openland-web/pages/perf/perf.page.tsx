import * as React from 'react';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XButton } from 'openland-x/XButton';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { XVertical2 } from 'openland-x/XVertical2';

const FastButton = css`
    border-radius: 20px;
    height: 40px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #1790ff;

    &:hover {
        background-color: #1585ed;
    }

    line-height: 38px;
    font-size: 15px;
    letter-spacing: 0;
    font-weight: 600;
    color: #ffffff;
`;

class FirstText extends React.Component {
    render() {
        let ch: any[] = [];
        for (let a = 0; a < 1000; a++) {
            ch.push(<XButton key={'b-' + a} text="button" />);
        }
        return <XVertical2>{ch}</XVertical2>;
    }
}

class FastWrapper extends React.PureComponent {
    render() {
        return <div className={FastButton}>button</div>;
    }
}

class SecondText extends React.Component {
    render() {
        let ch: any[] = [];
        for (let a = 0; a < 1000; a++) {
            ch.push(<FastWrapper key={'b-' + a} />);
        }
        return <XVertical2>{ch}</XVertical2>;
    }
}

class ThirdText extends React.Component {
    render() {
        let ch: any[] = [];
        for (let a = 0; a < 1000; a++) {
            ch.push(
                <XView
                    key={'b-' + a}
                    height={40}
                    borderRadius={20}
                    paddingLeft={20}
                    paddingRight={20}
                    backgroundColor="#1790ff"
                    hoverBackgroundColor="#1585ed"
                >
                    button
                </XView>,
            );
        }
        return <XVertical2>{ch}</XVertical2>;
    }
}

export default class Perf extends React.Component {
    render() {
        return (
            <XVertical2>
                <XHorizontal>
                    <XButton text="0" query={{ field: 'tab' }} />
                    <XButton text="1" query={{ field: 'tab', value: '1' }} />
                    <XButton text="2" query={{ field: 'tab', value: '2' }} />
                    <XButton text="3" query={{ field: 'tab', value: '3' }} />
                </XHorizontal>
                <XRouterContext.Consumer>
                    {ctx => {
                        if (ctx!.query.tab === '1') {
                            return <FirstText />;
                        } else if (ctx!.query.tab === '2') {
                            return <SecondText />;
                        } else if (ctx!.query.tab === '3') {
                            return <ThirdText />;
                        } else {
                            return null;
                        }
                    }}
                </XRouterContext.Consumer>
            </XVertical2>
        );
    }
}
