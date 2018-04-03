import * as React from 'react';

export function hasChildren(type: string, children?: any): React.ReactElement<{}> | null {
    let child = React.Children.toArray(children);
    for (let ch of child) {
        if (React.isValidElement(ch) && ch.props[type] === true) {
            return ch;
        }
    }
    return null;
}

export function filterChildren(type: string, children?: any): any {
    let child = React.Children.toArray(children);
    let res: any[] = [];
    for (let ch of child) {
        if (React.isValidElement(ch)) {
            if (ch.props[type] !== true) {
                res.push(ch);
            }
        } else {
            res.push(ch);
        }
    }
    return res;
}

export type XMediaSizes =
    'xs' |
    'sm' |
    'md' |
    'lg' |

    'sm+' |
    'md+' |

    'sm-' |
    'md-';

class CssUtils {
    forXS = '@media (max-width: 767px)';
    forSM = '@media (min-width: 768px) and (max-width: 959px)';
    forMD = '@media (min-width: 960px) and (max-width: 1055px)';
    forLG = '@media (min-width: 1056px) and (max-width: 1247px)';
    forXLG = '@media (min-width: 1248px) ';

    media(medias: [XMediaSizes]) {
        let queries: string[] = [];
        for (let m of medias) {
            if (m === 'xs') {
                queries.push('(max-width: 767px)');
            } else if (m === 'sm') {
                queries.push('(min-width: 768px) and (max-width: 959px)');
            } else if (m === 'md') {
                queries.push('(min-width: 960px) and (max-width: 1055px)');
            } else if (m === 'lg') {
                queries.push('(min-width: 1056px)');
            } else if (m === 'sm+') {
                queries.push('(min-width: 768px)');
            } else if (m === 'md+') {
                queries.push('(min-width: 960px)');
            } else if (m === 'sm-') {
                queries.push('(max-width: 959px)');
            } else if (m === 'md-') {
                queries.push('(max-width: 1055px)');
            }
        }
        if (queries.length === 1) {
            return '@media ' + queries[0];
        } else {
            return '@media ' + queries.map((v) => '(' + v + ')').join(' or ');
        }
    }
}

export let CSSUtils = new CssUtils();