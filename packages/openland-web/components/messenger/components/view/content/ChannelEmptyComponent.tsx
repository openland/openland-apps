import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';

const EmptyWrapper = Glamorous(XVertical)({
    position: 'relative',
    paddingTop: 30,
    paddingBottom: 30
});

const Reactangle = Glamorous.div({
    width: '100%',
    height: 600,
    position: 'absolute',
    top: 'calc(50% - 300px)',
    left: 0,
    backgroundImage: 'url(\'/static/X/messenger/reactangle.svg\')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'bottom',
    zIndex: 0,
    pointerEvents: 'none'
});

const EmptyContent = Glamorous.div({
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    marginBottom: 50
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
        <Reactangle />
        <EmptyContent>
            <Image />
            <EmptyText>No channel matches your search</EmptyText>
        </EmptyContent>
    </EmptyWrapper>
);