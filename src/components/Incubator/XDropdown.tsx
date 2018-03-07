import * as React from 'react';
import Glamorous from 'glamorous';
import { XIcon } from '../X/XIcon';
import ClickOutside from './ClickOutside'

const XDropdownWrapper = Glamorous.div<{ isOpen: boolean }>((props) => ({
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    border: `1px solid ${props.isOpen ? '#6B50FF' : 'rgba(34, 36, 38, .15)'}`,
    borderBottom: `1px solid ${props.isOpen ? 'transparent' : 'rgba(34, 36, 38, .15)'}`,
    borderRadius: 5,
    borderBottomLeftRadius: props.isOpen ? 0 : undefined,
    borderBottomRightRadius: props.isOpen ? 0 : undefined,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 16,
    paddingRight: 5,
    zIndex: 1
}))

const XDropdownText = Glamorous.div<{ selected?: boolean }>((props) => ({
    fontSize: 14,
    color: props.selected ? 'color: rgba(0, 0, 0, .87)' : 'rgba(191, 191, 191, .87)',
}))

const XDropdownMenu = Glamorous.div<{ isOpen: boolean }>((props) => ({
    display: props.isOpen ? 'block' : 'none',
    position: 'absolute',
    overflow: 'scroll',
    maxHeight: 200,
    top: '100%',
    left: -1,
    width: 'calc(100% + 2px)',
    border: '1px solid #6B50FF',
    borderTop: 'none',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: '#fff'
}))

const XDropDownOption = Glamorous.div<{ isSelect?: boolean }>((props) => ({
    cursor: 'pointer',
    display: 'flex',
    fontSize: 14,
    borderTop: '1px solid #fafafa',
    color: 'rgba(0, 0, 0, .87)',
    backgroundColor: props.isSelect ? 'rgba(0, 0, 0, .05)' : undefined,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: 'center',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, .03)'
    }
}))

interface XDropdownProps {
    title: string,
    options: any[]
}

export class XDropdown extends React.Component<XDropdownProps, { isOpen: boolean, selected: boolean, value?: any }> {
    constructor(props: XDropdownProps) {
        super(props)

        this.state = {
            isOpen: false,
            selected: false,
            value: {}
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

    handleSelect = (item: any, key: number) => {
        let selectValue = {
            title: item.title,
            key: key
        }

        this.setState({
            isOpen: !this.state.isOpen,
            value: selectValue,
            selected: true
        })
    }

    render() {
        let { isOpen, selected, value } = this.state
        let { title, options } = this.props
        return (
            <ClickOutside onClickOutside={this.handleClose}>
                <XDropdownWrapper isOpen={isOpen} onClick={this.handler}>
                    <XDropdownText selected={selected}>{value.title ? value.title : title}</XDropdownText>
                    <XIcon icon={`${isOpen ? 'arrow_drop_up' : 'arrow_drop_down'}`} />
                    <XDropdownMenu isOpen={isOpen}>
                        {options.map((item, i) => (
                            <XDropDownOption key={i} onClick={() => this.handleSelect(item, i)} isSelect={value.key === i ? true : false}>
                                {item.title}
                            </XDropDownOption>
                        ))}
                    </XDropdownMenu>
                </XDropdownWrapper>
            </ClickOutside>
        )
    }
}