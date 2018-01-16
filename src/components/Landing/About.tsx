import * as React from 'react';
import { XMarkdown } from '../X/XMarkdown';
import { XContainer } from '../X/XContainer';

export function AboutItem(props: { title: string, text: string }) {
    return (
        <div className="col-xs-12 col-sm-6">
            <div className="x-about--item">
                <div className="x-about--stitle">{props.title}</div>

                <XMarkdown className="x-about--text" text={props.text} />
            </div>
        </div>
    );
}

export function About(props: { title: string, mail: string, children: any }) {
    return (
        <div className="x-about">
            <XContainer wide={true}>
                <div className="x-about--title">{props.title}</div>
                <div className="row">
                    {props.children}
                </div>

                <div className="x-about--contacts">
                    <span>Get in touch</span>

                    <div className="x-about--btn">
                        <a href={'mailto:' + props.mail} className="x-btn is-outline is-block">
                            {props.mail}
                        </a>
                    </div>
                </div>
            </XContainer>
        </div>
    );
}