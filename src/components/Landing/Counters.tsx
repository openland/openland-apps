import * as React from 'react';
import { XLink } from '../X/XLink';

export function CounterItem(props: {
    counter: number | string, label?: string, name: string, photo?: { url: string, retina: string }, address?: string, path: string
}) {
    return (
        <div className="col-xs-12 col-sm-4">
            <div className="x-counter">
                <div className="x-counter--in">
                    <div className="x-counter--count">
                        {props.counter}

                        {props.label !== undefined && <span>{props.label}</span>}
                    </div>
                    <div className="x-counter--name">{props.name}</div>
                </div>

                {props.photo !== undefined &&
                <div className="x-counter--photo">
                    <img src={props.photo.url} srcSet={props.photo.retina}/></div>}
                {props.address !== undefined && <div className="x-counter--address">{props.address}</div>}

                <XLink path={props.path} className="x-counter--link">Details</XLink>
            </div>
        </div>
    );
}

export function CounterList(props: { children: any }) {
    return (
        <div className="x-counters--in">
            <div className="row sm-gutter-16">
                {props.children}
            </div>
        </div>
    );
}

export class Counters extends React.Component<{ title: string, times?: boolean, insights?: any, methodology?: any, children: any }, { isShown: boolean }> {
    constructor(props: { title: string, times?: boolean, insights: any, methodology: any, children: any }) {
        super(props);

        this.state = {
            isShown: false
        };
    }

    render() {
        return (
            <div className={'x-counters' + (this.props.times === true ? ' is-times' : '')}>
                <div className="x-container">

                    <div className="x-counters--head">
                        <div className="x-counters--title">{this.props.title}</div>
                        {this.props.methodology !== undefined && this.props.insights !== undefined && (
                            <div className="x-counters--btn">
                                <a href="#" className="x-btn is-outline is-block" onClick={(e) => {
                                    e.preventDefault();
                                    this.setState({isShown: !this.state.isShown});
                                }}>Insights and Methodolodgy</a>
                            </div>
                        )}
                    </div>

                    {this.props.methodology !== undefined && this.props.insights !== undefined && (
                        <div className={'x-counters--more' + (this.state.isShown ? ' is-shown' : '')}>
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <div className="x-counters--stitle">Insights</div>
                                    <div className="x-counters--text">{this.props.insights}</div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="x-counters--stitle">Methodology</div>
                                    <div className="x-counters--text">{this.props.methodology}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {this.props.children}
                </div>
            </div>
        );
    }
}