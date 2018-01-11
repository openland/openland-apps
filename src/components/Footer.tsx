import * as React from 'react';
import { XContainer } from './X/XContainer';
import { NavigationFooter } from './Navigation';

export class Footer extends React.Component {
    render() {
        return (
            <div className="x-footer">
                <XContainer clearfix={true}>
                    <div className="x-footer--title">
                        <div className="x-footer--logo">
                            <img src="/static/img/logotype.svg" alt=""/>
                        </div>

                        <div className="x-footer--city">San Francisco</div>
                    </div>

                    <NavigationFooter />

                    <div className="x-footer--box">
                        {this.props.children}
                    </div>
                </XContainer>
            </div>
        );
    }
}