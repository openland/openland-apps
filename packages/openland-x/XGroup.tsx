import * as React from 'react';
import Glamorous from 'glamorous';
import { XFlexStyles, applyFlex } from './Flex';

const AttachRoot = Glamorous.div<XFlexStyles>(
    (props) => ({
        display: 'flex'
    }),
    (props) => applyFlex(props));

export class XGroup extends React.Component<XFlexStyles> {
    render() {
        let children = [];
        const childrenRaw = React.Children.toArray(this.props.children);
        if (childrenRaw.length > 1) {
            let index = 0;
            for (let c of childrenRaw) {
                children.push(React.cloneElement(c as any, {
                    attach: index++ === 0 ? 'right' : index === childrenRaw.length ? 'left' : 'both',
                    height: '100h',
                }));
            }
        } else {
            children.push(childrenRaw[0]);
        }

        return (
            <AttachRoot>
                {children}
            </AttachRoot>
        );
    }
}