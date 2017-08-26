/// <reference path="../../typings.d.ts" />
import * as React from 'react';
import { markdown } from 'markdown';

export function Formatted(props: { text: string, className?: string }) {
    var md = markdown.toHTML(props.text);
    return <div className={props.className} dangerouslySetInnerHTML={{ __html: md }} />;
}