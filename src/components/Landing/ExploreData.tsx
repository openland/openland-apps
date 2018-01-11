import * as React from 'react';
import { XLink } from '../X/XLink';

export function ExploreDataItem(props: { name: string, counter: number, photo: string, path: string }) {
    return (
        <div className="col-xs-12 col-sm-6">
            <div className="x-explore--item">
                <div className="x-explore--in">
                    <div className="x-explore--count">{props.counter.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')}</div>
                    <div className="x-explore--name">{props.name}</div>
                </div>

                <div className="x-explore--photo"><img src={props.photo} alt="" /></div>

                <XLink path={props.path} className="x-explore--link">Explore</XLink>
            </div>
        </div>
    );
}

export function ExploreData(props: { title: string, children: any }) {
    return (
        <div className="x-explore">
            <div className="x-container">
                <div className="x-explore--title">{props.title}</div>

                <div className="row">
                    {props.children}
                </div>
            </div>
        </div>
    );
}