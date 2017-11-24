import * as React from 'react';
// import { Header } from './Header';
import { withComponent } from './withComponent';
import { Icons } from './Icons';
import { Formatted } from './Formatted';
import { withUser } from './UserProvider';
import { Account } from '../../api/';
export const Background = withComponent((props) => {
    return <div className="st-page--bg" style={{ backgroundImage: 'url(/img/sf-bg.jpg)' }} />;
});

export const Content = withComponent((props) => {
    return (
        <div className="st-page--wrap">
            <div className="st-box">
                {props.children}
            </div>
        </div>
    );
});

export const Section = withComponent((props) => {
    return (
        <div className="st-box--section">
            {props.children}
        </div>
    );
});

export const PageTitle = withComponent<{ title: string }>((props) => (
    <div className="st-page--title-w">
        <div className="st-page--title">{props.title}</div>
        {React.Children.count(props.children) > 0 && (
            <div className="st-page--title-b">
                {props.children}
            </div>
        )}
    </div>
));

export const PageIntro = withComponent<{ intro: string }>((props) => (
    <Formatted className="st-page--intro" text={props.intro} />
));

export const Grid = withComponent((props) => {
    return (
        <div className="st-page--grid">
            {props.children}
        </div>
    );
});

export const Column = withComponent((props) => {
    return (
        <div className="st-page--col">
            {props.children}
        </div>
    );
});

export const Row = withComponent((props) => {
    return (
        <div className="st-box in-grid">
            <div className="st-data">
                {props.children}
            </div>
        </div>
    );
});

export const RowTitle = withComponent<{ title: string, icon: Icons }>((props) => {
    return (
        <div className="st-data--title"><i className={'icon-' + props.icon + '-c'}>{}</i>{props.title}</div>
    );
});

class PageRender extends React.Component<{ title: string, account: Account }> {
    componentDidMount() {
        if (this.props.account.city != null) {
            document.title = this.props.account.city + ' ' + this.props.account.name + ' • ' + this.props.title;
        } else {
            document.title = this.props.account.name + ' • ' + this.props.title;
        }
    }
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export const Page = withUser<{ title: string }>((props) => {
    return <PageRender {...props} />;
});