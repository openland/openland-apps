import * as React from 'react';
import Glamorous from 'glamorous';
import { XIcon } from '../X/XIcon';
import ClickOutside from './ClickOutside';

const XDropdownWrapper = Glamorous.div<{ isOpen: boolean, buttonStyle?: boolean }>((props) => ({
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    border: props.buttonStyle ? '1px solid rgba(34, 36, 38, .15)' : `1px solid ${props.isOpen ? '#6B50FF' : 'rgba(34, 36, 38, .15)'}`,
    borderBottom: props.buttonStyle ? undefined : `1px solid ${props.isOpen ? 'transparent' : 'rgba(34, 36, 38, .15)'}`,
    backgroundImage: props.buttonStyle ? (props.isOpen ? 'none' : `linear-gradient(-180deg, #fafbfc 0%, #eff3f6 90%)`) : undefined,
    backgroundColor: props.buttonStyle ? (props.isOpen ? '#e9ecef' : '#eff3f6') : undefined,
    boxShadow: props.buttonStyle ? (props.isOpen ? 'inset 0 0.15em 0.3em rgba(27, 31, 35, 0.15)' : undefined) : undefined,
    borderRadius: 5,
    borderBottomLeftRadius: props.isOpen ? 0 : undefined,
    borderBottomRightRadius: props.isOpen ? 0 : undefined,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 16,
    paddingRight: 5,
    zIndex: props.isOpen ? 5 : undefined,
    '&:hover': {
        backgroundColor: props.buttonStyle ? '#e6ebf1' : undefined,
        backgroundImage: props.buttonStyle ? 'linear-gradient(-180deg, #f0f3f6 0%, #e6ebf1 90%)' : undefined
    }
}));

const XDropdownText = Glamorous.div<{ selected?: boolean, buttonStyle?: boolean }>((props) => ({
    fontSize: 14,
    color: props.buttonStyle ? '#24292e' : props.selected ? 'color: rgba(0, 0, 0, .87)' : 'rgba(191, 191, 191, .87)',
}));

const XDropdownMenu = Glamorous.div<{ isOpen: boolean, buttonStyle?: boolean }>((props) => ({
    display: props.isOpen ? 'block' : 'none',
    position: 'absolute',
    overflow: 'scroll',
    maxHeight: 200,
    top: '100%',
    left: -1,
    width: 'calc(100% + 2px)',
    border: props.buttonStyle ? '1px solid rgba(34, 36, 38, .15)' : '1px solid #6B50FF',
    borderTop: 'none',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: '#fff'
}));

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
}));

interface XDropdownProps {
    title: string;
    options?: any[];
    children?: any;
    icon?: string;
}

export class XDropdown extends React.Component<XDropdownProps, { isOpen: boolean, selected: boolean, value?: any }> {
    constructor(props: XDropdownProps) {
        super(props);

        this.state = {
            isOpen: false,
            selected: false,
            value: {}
        };
    }

    handler = (e: any) => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleClose = (e: any) => {
        this.setState({
            isOpen: false
        });
    }

    handleSelect = (item: any, key: number) => {
        let selectValue = {
            title: item.title,
            key: key
        };

        this.setState({
            isOpen: !this.state.isOpen,
            value: selectValue,
            selected: true
        });
    }

    render() {
        let { isOpen, selected, value } = this.state;
        let { title, options, children, icon } = this.props;
        return (
            <ClickOutside onClickOutside={this.handleClose}>
                {options && (
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
                )}
                {children && (
                    <XDropdownWrapper isOpen={isOpen} onClick={this.handler} buttonStyle={true}>
                        <XDropdownText selected={selected} buttonStyle={true}>
                            {title}
                        </XDropdownText>
                        <XIcon icon={`${icon ? icon : isOpen ? 'arrow_drop_up' : 'arrow_drop_down'}`} />
                        <XDropdownMenu isOpen={isOpen} buttonStyle={true}>
                            {children}
                        </XDropdownMenu>
                    </XDropdownWrapper>
                )}
            </ClickOutside>
        );
    }
}