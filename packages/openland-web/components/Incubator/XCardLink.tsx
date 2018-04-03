import * as React from 'react';
import Glamorous from 'glamorous';
import { XCard } from '../X/XCard';
import { XIcon } from '../X/XIcon';

const XCardLinkDiv = Glamorous(XCard)({
    alignSelf: 'flex-start',
    '> a': {
        position: 'relative',
        paddingTop: 40,
        paddingBottom: 40,
        paddingRight: 40,
        paddingLeft: 150,
        display: 'flex',
        color: '#6B50FF',
        transition: 'all 0.18s',
        '&:hover': {
            color: '#182642'
        }
    }
});

const IconDiv = Glamorous.div({
    position: 'absolute',
    left: 0,
    top: 'calc(50% - 65px)',
    display: 'block',
    '> i': {
        fontSize: 130
    }
});

const ContentDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
});

const Title = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    fontSize: 20,
    lineHeight: 1.6,
    fontWeight: 600,
    color: 'inherit',
    '> i': {
        marginLeft: 5
    }
});

const Text = Glamorous.div<{ ellipcise?: boolean }>((props) => ({
    opacity: 0.7,
    color: '#182642',
    fontSize: '14px',
    lineHeight: 'normal',
    fontWeight: 'normal',
}));

interface XCardLinkProps {
    title: string;
    text: string;
    path?: string | null;
    href?: string | null;
    icon: string;
}

export function XCardLink(props: XCardLinkProps) {
    return (
        <XCardLinkDiv path={props.path} href={props.href} bounce={true} shadow="large">
            <IconDiv>
                <XIcon icon={props.icon}/>
            </IconDiv>
            <ContentDiv>
                <Title>
                    {props.title}
                    <XIcon icon="arrow_forward"/>
                </Title>
                <Text>{props.text}</Text>
            </ContentDiv>
        </XCardLinkDiv>
    );
}