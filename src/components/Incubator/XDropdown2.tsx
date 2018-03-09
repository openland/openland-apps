import * as React from 'react';
import Glamorous from 'glamorous';
import { XIcon } from '../X/XIcon';
import ClickOutside from './ClickOutside'

const XDropdownWrapper = Glamorous.div<{isOpen?: boolean}>((props) => ({
    position: 'relative',
    zIndex: props.isOpen ? 5 : undefined
}))

const XDropdownButton = Glamorous.button<{ isOpen: boolean }>((props) => ({

    backgroundColor: props.isOpen ? '#e9ecef' : undefined,
    backgroundImage: props.isOpen ? 'none' : undefined,
    borderColor: props.isOpen ? 'rgba(27, 31, 35, 0.35)' : undefined,
    boxShadow: props.isOpen ? 'inset 0 0.15em 0.3em rgba(27, 31, 35, 0.15)' : undefined,

    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 8,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '20px',
    color: '#24292e',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    userSelect: 'none',
    backgroundRepeat: 'repeat-x',
    backgroundPosition: '- 1px - 1px',
    backgroundSize: '110 % 110 %',
    border: '1px solid rgba(27, 31, 35, 0.2)',
    borderRadius: 5,
    appearance: 'none',
    '&:hover': {
        backgroundColor: props.isOpen ? '#e6ebf1' : undefined,
        backgroundImage: props.isOpen ? 'linear-gradient(-180deg, #f0f3f6 0%, #e6ebf1 90%)' : undefined,
        backgroundPosition: props.isOpen ? '-.5em' : undefined,
        borderColor: props.isOpen ? 'rgba(27, 31, 35, 0.35)' : undefined
    }
}))

const XDropdownMenu = Glamorous.div<{ isOpen: boolean, buttonStyle?: boolean }>((props) => ({
    display: props.isOpen ? 'block' : 'none',
    position: 'absolute',
    overflow: 'scroll',
    maxHeight: 250,
    top: '110%',
    left: 0,
    width: 'auto',
    border: props.buttonStyle ? '1px solid rgba(34, 36, 38, .15)' : '1px solid #6B50FF',
    borderTop: 'none',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: '#fff'
}))

interface XDropdownProps {
    title: string,
    children: any,
    icon?: string
}

export class XDropdown extends React.Component<XDropdownProps, { isOpen: boolean }> {
    constructor(props: XDropdownProps) {
        super(props)

        this.state = {
            isOpen: false
        }
    }

    handler = (e: any) => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    handleClose = (e: any) => {
        this.setState({
            isOpen: false
        })
    }

    render() {
        let { isOpen } = this.state
        let { title, children, icon } = this.props
        return (
            <ClickOutside onClickOutside={this.handleClose}>
                <XDropdownWrapper isOpen={isOpen}>
                    <XDropdownButton isOpen={isOpen} onClick={this.handler}>
                        {title}
                        <XIcon icon={`${icon ? icon : isOpen ? 'arrow_drop_up' : 'arrow_drop_down'}`} />
                    </XDropdownButton>
                    <XDropdownMenu isOpen={isOpen} buttonStyle={true}>
                        {children}
                    </XDropdownMenu>
                </XDropdownWrapper>
            </ClickOutside>
        )
    }
}