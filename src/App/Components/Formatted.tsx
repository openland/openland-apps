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
    var hrefIndex = tokens[idx].attrIndex('href');
    if (hrefIndex >= 0) {
        var href = tokens[idx].attrs[hrefIndex][1] as string;
        try {
            var url = new URL(href);
            if (url.host !== window.location.host) {
                tokens[idx].attrPush(['target', '_blank']);
            }
        } catch (e) {
            // tokens[idx].attrPush(['target', '_blank']);
        }
    }
    return defaultRender(tokens, idx, options, env, self);
};

export function Formatted(props: { text: string, className?: string }) {
    var md = mkd.render(props.text); // markdown.toHTML(props.text);
    return <div className={props.className} dangerouslySetInnerHTML={{ __html: md }} />;
}