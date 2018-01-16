import * as React from 'react';
import { XLink } from './X/XLink';
import { withRouter } from '../utils/withRouter';
import { XContainer } from './X/XContainer';
import { AuthenticationControlls } from './Login';
import { Navigation } from './Navigation';

export class Header extends React.Component<{home?: boolean}, { isShown: boolean }> {
    constructor(props: {}) {
        super(props);

        this.state = {
            isShown: false
        };
    }

    render() {
        return (
            <div className={'x-header' + (this.props.home ? '' : ' is-top') + (this.state.isShown ? ' is-shown' : '')}>
                <XContainer wide={true} clearfix={true}>
                    <div className="x-header--wrap">
                        {this.props.home && (<a className="x-header--logo" href="https://statecraft.one/">
                                <img src="/static/img/logotype.svg" alt=""/>
                            </a>)}

                        {!this.props.home && (<XLink className="x-header--label" path="/">San Francisco</XLink>)}

                        <a className="x-header--open visible-xs" href="#" onClick={(e) => {
                            e.preventDefault();
                            this.setState({isShown: !this.state.isShown});
                        }}>{}</a>

                        <div className="x-header--nav hidden-xs">
                            <Navigation/>
                        </div>

                        <div className="x-header--auth hidden-xs">
                            <AuthenticationControlls/>
                        </div>
                    </div>
                </XContainer>

                <div className="x-header--menu">
                    <div className="x-header--nav">
                        <Navigation/>
                    </div>

                    <div className="x-header--auth">
                        <AuthenticationControlls/>
                    </div>
                </div>
            </div>
        );
    }
}