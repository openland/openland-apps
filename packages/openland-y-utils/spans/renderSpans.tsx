import * as React from 'react';
import { Span } from './Span';

export const renderSpans = (Element: any, spans?: Span[], isService?: boolean, mId?: string) => {
    if (spans && spans.length > 0) {
        return spans.map((s, key) => (
            <Element span={s} key={key} isService={isService} mId={mId}>
                {renderSpans(Element, s.children, isService, mId)}
            </Element>
        ));
    } else {
        return null;
    }
};
