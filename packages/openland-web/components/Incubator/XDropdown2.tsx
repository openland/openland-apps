import * as React from 'react';
import Glamorous from 'glamorous';
import { XIcon } from '../X/XIcon';
import ClickOutside from './ClickOutside';

const XDropdownWrapper = Glamorous.div<{isOpen?: boolean}>((props) => ({
    position: 'relative',
    zIndex: props.isOpen ? 5 : undefined
}));

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
}));

interface XDropdownMenuProps {
    isOpen: boolean;
    aligment?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const XDropdownMenu = Glamorous.div<XDropdownMenuProps>((props) => ({
    display: props.isOpen ? 'block' : 'none',
    position: 'absolute',
    overflow: 'scroll',
    maxHeight: 250,
    top: props.aligment ? ((props.aligment === 'bottom-left' || props.aligment === 'bottom-right') ? '110%' : undefined) : '110%',
    bottom: props.aligment ? ((props.aligment === 'top-left' || props.aligment === 'top-right') ? '110%' : undefined) : undefined,
    left: props.aligment ? ((props.aligment === 'top-left' || props.aligment === 'bottom-left') ? 0 : undefined) : 0,
    right: props.aligment ? ((props.aligment === 'top-right' || props.aligment === 'bottom-right') ? 0 : undefined) : undefined,
    width: 'auto',
    border: '1px solid rgba(34, 36, 38, .15)',
    borderRadius: 5,
    backgroundColor: '#fff'
}));

interface XDropdownProps {
    title: string;
    children: any;
    icon?: string;
    aligment?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export class XDropdown extends React.Component<XDropdownProps, { isOpen: boolean }> {
    constructor(props: XDropdownProps) {
        super(props);

        this.state = {
            isOpen: false
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

    render() {
        let { isOpen } = this.state;
        let { title, children, icon, aligment } = this.props;
        return (
            <ClickOutside onClickOutside={this.handleClose}>
                <XDropdownWrapper isOpen={isOpen}>
                    <XDropdownButton isOpen={isOpen} onClick={this.handler}>
                        {title}
                        <XIcon icon={`${icon ? icon : isOpen ? 'arrow_drop_up' : 'arrow_drop_down'}`} />
                    </XDropdownButton>
                    <XDropdownMenu isOpen={isOpen} aligment={aligment}>
                        {children}
                    </XDropdownMenu>
                </XDropdownWrapper>
            </ClickOutside>
        );
    }
}