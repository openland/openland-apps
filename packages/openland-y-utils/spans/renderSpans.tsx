import * as React from 'react';
import { Span } from './Span';

export const renderSpans = (Element: any, spans?: Span[]) => {
    if (spans && spans.length > 0) {
        return spans.map((s, key) => (
            <Element span={s} key={key}>{renderSpans(Element, s.childrens)}</Element>
        ));
    } else {
        return null;
    }
}