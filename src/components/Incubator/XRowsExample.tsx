import * as React from 'react'
import Glamorous from 'glamorous'
import { XButton } from '../X/XButton';

// interface XRowProps {
//     children: any,
//     type?: 'header' | 'footer',
//     style?: 'inline' | 'column',
//     justifyContent?: 'space-between' | ''
// }

interface XCardExampleProps {
    children?: any,
    headerTitle: string,
    headerDescription: string
}

export const XCardWrapper = Glamorous.div<{children: any}>({
    display: 'flex',
    flexDirection: 'column'
})

export const XRow = Glamorous.div<{children: any}>({
    display: 'flex',
    flexDirection: 'column',
})

export const XRowTitle = Glamorous.div<{children?: any}>({
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '24px',
    lineHeight: '34px',
    fontWeight: 500,
})

export const XRowText = Glamorous.div<{column?: boolean}>((props) => {
    return {
        display: props.column ? undefined : 'flex',
        flexDirection: props.column ? 'column' : undefined,
        color: '#5D677A',
        fontSize: '17px',
        lineHeight: '26px'
    }
})

export const XRowContent = Glamorous.div<{children: any}>({
    color: '#5D677A',
    fontSize: '17px',
    lineHeight: '26px',
    display: 'flex',
    justifyContent: 'space-between'
})

export function XCardExample(props: XCardExampleProps) {
    return (
        <XCardWrapper>
            <XRow>
                <XRowTitle>
                    {props.headerTitle}
                </XRowTitle>
                <XRowText>
                    {props.headerDescription}
                    <a>description inline child components</a>
                </XRowText>
            </XRow>
            <XRow>
                <XRowTitle>
                    Header title example with component
                    <XButton alignSelf="flex-end" style="dark">Bordered</XButton>
                </XRowTitle>
                <XRowText column={true}>
                    {props.headerDescription}
                    <a style={{display: 'block'}}>description column child components</a>
                </XRowText>
            </XRow>
            <XRow>
                <XRowContent>
                    {props.headerDescription}
                    <div>
                        <XButton alignSelf="flex-end" style="dark">Bordered</XButton>
                        <XButton alignSelf="flex-end" style="dark">Bordered</XButton>
                    </div>
                </XRowContent>
            </XRow>
        </XCardWrapper>
    )
}