import * as React from 'react';
import Glamorous from 'glamorous';

const UploadWrapper = Glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 24,
    borderRadius: 4,
    backgroundColor: 'rgba(101, 75, 250, 0.5)',
    position: 'relative',
    overflow: 'hidden'
});

const UploadProgress = Glamorous.div<{ progress: number }>((props) => ({
    height: '100%',
    width: `${props.progress}%`,
    position: 'absolute',
    left: 0,
    top: 0,
    transition: 'all .2s',
    backgroundColor: '#654bfa'
}));

const UploadTitle = Glamorous.div({
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 1.33,
    letterSpacing: -0.1,
    color: '#ffffff',
    zIndex: 1
});

export const MessageUploadComponent = (props: { title?: string, progress: number }) => (
    <UploadWrapper>
        <UploadProgress progress={props.progress}/>
        <UploadTitle>{props.title}</UploadTitle>
    </UploadWrapper>
);