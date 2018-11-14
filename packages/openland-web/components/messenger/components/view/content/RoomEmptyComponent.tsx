import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';

const EmptyWrapper = Glamorous(XVertical)({
    position: 'relative',
    paddingTop: 30,
    paddingBottom: 30
});

const EmptyContent = Glamorous.div({
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0
});

const Image = Glamorous.div({
    width: 329,
    height: 329,
    backgroundImage: 'url(\'/static/X/messenger/channels-explore-empty.svg\')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
});

const EmptyText = Glamorous.div({
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: -0.3,
    color: '#99a2b0',
    marginTop: 44
});

export const EmptyComponent = () => (
    <EmptyWrapper separator={10} alignItems="center" justifyContent="center" flexGrow={1}>
        <EmptyContent>
            <Image />
            <EmptyText>No room matches your search</EmptyText>
        </EmptyContent>
    </EmptyWrapper>
);