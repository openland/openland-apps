import * as React from 'react';
import { Span } from './Span';

export const renderSpans = (Element: any, spans?: Span[], isService?: boolean) => {
    if (spans && spans.length > 0) {
        return spans.map((s, key) => (
            <Element span={s} key={key} isService={isService}>
                {renderSpans(Element, s.childrens, isService)}
            </Element>
        ));
    } else {
        return null;
    }
};
