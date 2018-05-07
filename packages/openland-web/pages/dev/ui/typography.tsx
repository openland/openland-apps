import '../../../globals';
import * as React from 'react';
import glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from '../../../components/DevDocsScaffold';
import { XContent } from '../../../components/X/XContent';
import { XVertical } from '../../../components/X/XVertical';
import XStyles from 'openland-x/XStyles';

const H900 = glamorous.div({
    ...XStyles.text.h900
});

const H800 = glamorous.div({
    ...XStyles.text.h800
});

const H700 = glamorous.div({
    ...XStyles.text.h700
});

const H600 = glamorous.div({
    ...XStyles.text.h600
});

const H500 = glamorous.div({
    ...XStyles.text.h500
});

const H400 = glamorous.div({
    ...XStyles.text.h400
});

const H300 = glamorous.div({
    ...XStyles.text.h300
});

const H200 = glamorous.div({
    ...XStyles.text.h200
});

const H100 = glamorous.div({
    ...XStyles.text.h100
});

const M500 = glamorous.div({
    ...XStyles.text.m500
});

export default withApp('UI Framework - Typograpthy', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Typography">
            <XContent>
                <XVertical>
                    <H900>Text h900</H900>
                    <div>For oversized screen titles. Use in moderation.</div>
                    <H800>Text h800</H800>
                    <div>Empty states and feature introductions. Top level headers.</div>
                    <H700>Text h700</H700>
                    <div>Main titles, use only once per page.</div>
                    <H600>Text h600</H600>
                    <div>Headings that identify key functionality.</div>
                    <H500>Text h500</H500>
                    <div>Sub-section and field group headings.</div>
                    <M500>Text m500</M500>
                    <div>Sidebar Items</div>
                    <H400>Text h400</H400>
                    <div>Deep headings and for highlighting important pieces of information.</div>
                    <H300>Text h300</H300>
                    <div>Heading up a group of list items.</div>
                    <H200>Text h200</H200>
                    <div>Low level headings.</div>
                    <H100>Text h100</H100>
                    <div>Low level headings.</div>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});