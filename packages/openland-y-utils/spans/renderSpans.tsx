import * as React from 'react';
import { Span } from './Span';

export const renderSpans = (Element: any, spans?: Span[], isService?: boolean, mId?: string, chatId?: string) => {
    if (spans && spans.length > 0) {
        return spans.map((s, key) => (
            <Element span={s} key={key} isService={isService} mId={mId} chatId={chatId}>
                {renderSpans(Element, s.children, isService, mId, chatId)}
            </Element>
        ));
    } else {
        return null;
    }
};
