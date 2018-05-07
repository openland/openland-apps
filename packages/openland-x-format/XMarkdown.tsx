import * as React from 'react';
import * as marked from 'marked';

export function XMarkdown(props: { className?: string, value: string }) {
    var r = new marked.Renderer();
    r.link = (href: string, title: string, text: string) => `<a href="${href}" title="${title}" target="_blank">${text}</a>`;
    var md = marked(props.value, { renderer: r });
    // var md = mkd.render(props.text); // markdown.toHTML(props.text);
    return <div className={props.className} dangerouslySetInnerHTML={{ __html: md }} />;
}