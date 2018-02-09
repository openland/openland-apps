import * as React from 'react'
import Glamorous from 'glamorous'
import { XButton } from '../X/XButton';

interface XCardExampleProps {
    children?: any,
    headerTitle: string,
    headerDescription: string
}

export const XRow = Glamorous.div<{children: any}>({
    display: 'flex',
    flexDirection: 'column',
})

export const XRowContent = Glamorous.div<{children: any; column?: boolean; spaceBetween?: boolean}>((props) => {
    return {
        display: 'flex',
        alignItems: props.column ? undefined : 'center',
        justifyContent: props.spaceBetween ? 'space-between' : undefined,
        flexDirection: props.column ? 'column' : undefined
    }
})

export const Title = Glamorous.span({
    fontSize: '24px',
    lineHeight: '34px',
    fontWeight: 500,
})

export const Text = Glamorous.span({
    color: '#5D677A',
    fontSize: '17px',
    lineHeight: '26px'
})

// ------------
export const XCardWrapper = Glamorous.div<{children: any}>({
    display: 'flex',
    flexDirection: 'column'
})

export function XCardExample(props: XCardExampleProps) {
    return (
        <XCardWrapper>
            <XRow>
                <Title>
                    {props.headerTitle}
                </Title>
                <XRowContent>
                    <Text>
                        {props.headerDescription}
                    </Text>
                    <a>description inline child components</a>
                </XRowContent>
            </XRow>
            <XRow>
                <XRowContent spaceBetween={true}>
                    <Title>Header title example with component</Title>
                    <XButton alignSelf="flex-end" style="dark">Bordered</XButton>
                </XRowContent>
                <XRowContent column={true}>
                    <Text>{props.headerDescription}</Text>
                    <a>description column child components</a>
                </XRowContent>
            </XRow>
            <XRow>
                <XRowContent spaceBetween={true}>
                    <XRowContent column={true}>
                        <Text>{props.headerDescription}</Text>
                        <a>description column child components</a>
                    </XRowContent>
                    <div>
                        <XButton alignSelf="flex-end" style="dark">Bordered</XButton>
                        <XButton alignSelf="flex-end" style="dark">Bordered</XButton>
                    </div>
                </XRowContent>
            </XRow>
        </XCardWrapper>
    )
}