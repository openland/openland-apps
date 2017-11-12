/// <reference path="../../typings.d.ts" />
import * as React from 'react';
import * as markdown from 'markdown-it';

const mkd = markdown({
    linkify: true,
    typographer: true
});

const defaultRender = mkd.renderer.rules.link_open || function (tokens: any, idx: any, options: any, env: any, self: any) {
    return self.renderToken(tokens, idx, options);
};

mkd.renderer.rules.link_open = function (tokens: any, idx: any, options: any, env: any, self: any) {
    // If you are sure other plugins can't add `target` - drop check below
    var aIndex = tokens[idx].attrIndex('target');

    if (aIndex < 0) {
        tokens[idx].attrPush(['target', '_blank']); // add new attribute
    } else {
        tokens[idx].attrs[aIndex][1] = '_blank';    // replace value of existing attr
    }

    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self);
};

export function Formatted(props: { text: string, className?: string }) {
    var md = mkd.render(props.text); // markdown.toHTML(props.text);
    return <div className={props.className} dangerouslySetInnerHTML={{ __html: md }} />;
}