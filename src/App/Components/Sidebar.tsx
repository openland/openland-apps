import * as React from 'react';

export class Sidebar extends React.Component<{ title: string, subtitle?: string, image: string, showCallback?: () => void, isShown?: boolean }> {
    render() {
        return (
            <div className={'st-side' + (this.props.isShown ? ' is-shown' : '')}>
                <a
                    className={'st-side--toggler' + (this.props.isShown ? ' is-shown' : '')}
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        if (this.props.showCallback) {
                            this.props.showCallback!!();
                        }
                    }}
                >
                    <i>{}</i>
                </a>
                <div className="st-side--logo">
                    <img src={this.props.image} /></div>
                <div className="st-side--title">{this.props.title}</div>
                <div className="st-side--text">{this.props.subtitle}</div>
                <ul className="st-side--nav">
                    {this.props.children}
                </ul>
                <a className="st-side--powered" href="https://statecraft.one"><span>Powered by</span> Statecraft</a>
            </div>
        );
    }
}