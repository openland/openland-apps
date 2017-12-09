import * as React from 'react';
import marked from 'marked';

export function Formatted(props: { text: string, className?: string }) {
    var r = new marked.Renderer();
    r.link = (href: string, title: string, text: string) => `<a href="${href}" title="${title}" target="_blank">${text}</a>`;
    var md = marked(props.text, { renderer: r });
    // var md = mkd.render(props.text); // markdown.toHTML(props.text);
    return <div className={props.className} dangerouslySetInnerHTML={{ __html: md }} />;
}