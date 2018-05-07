import * as React from 'react';
import Glamorous from 'glamorous';
import { XCard } from '../../X/XCard';
import { XIcon } from 'openland-x/XIcon';
import XStyles from '../../X/XStyles';
import ClickOutside from '../ClickOutside';
import { XLink, XLinkProps } from 'openland-x/XLink';

const MapFilterWrapper = Glamorous(XCard)<{ active: boolean }>((props) => ({
    position: 'absolute',
    top: 18,
    left: 18,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 12,
    paddingBottom: 12,
    zIndex: props.active ? 2 : 1,
    '& > div': {
        display: 'flex',
        flexDirection: 'column'
    }
}));

const CitySelectorItemsWrapper = Glamorous.div<{ open: boolean }>((props) => ({
    display: 'flex',
    flexDirection: 'column',
    maxHeight: props.open ? 100 : 0,
    overflow: 'hidden',
    transition: 'all .2s',
    marginLeft: 16,
    marginRight: 16,
    marginTop: props.open ? 15 : 0,
    opacity: props.open ? 1 : 0
}));

const CitySelectorItemLink = Glamorous(XLink)<{ active: boolean }>((props) => ({
    ...XStyles.text.h400,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: props.active ? '#4428e0' : '#525f7f',
    marginBottom: 20,
    cursor: 'pointer',
    '&:last-child': {
        marginBottom: 0
    },
    '> div': {
        width: 16,
        height: 16,
        borderRadius: 50,
        backgroundColor: props.active ? '#4428e0' : '#fff',
        border: '1px solid rgba(97, 126, 156, 0.2)',
        marginRight: 10,
        position: 'relative',
        '&::after': {
            content: props.active ? `''` : undefined,
            width: 8,
            height: 8,
            borderRadius: 50,
            backgroundColor: '#ffffff',
            position: 'absolute',
            top: 3,
            left: 3
        }
    },
    '> span': {
        color: '#1f3449'
    }
}));

const Shadow = Glamorous.div<{ active: boolean }>((props) => ({
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
    visibility: props.active ? 'visible' : 'hidden',
    opacity: props.active ? 1 : 0,
    backgroundColor: 'rgba(0, 0, 0, 0.41)',
    zIndex: 2,
    pointerEvents: 'none'
}));

interface CitySelectorItemProps extends XLinkProps {
    label: string;
    active: boolean;
}

export class CitySelectorItem extends React.Component<CitySelectorItemProps> {
    static defaultProps = {
        _isCitySelectorElement: true
    };
    render() {

        let { label, ...other } = this.props;

        return (
            <CitySelectorItemLink {...other}>
                <div />
                <span>{label}</span>
            </CitySelectorItemLink>
        );
    }
}

const CityTitle = Glamorous.div<{ active: boolean }>((props) => ({
    fontSize: 18,
    fontWeight: 500,
    lineHeight: 'normal',
    letterSpacing: -0.2,
    color: '#1f3449',
    cursor: 'pointer',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: props.active ? 11 : 0,
    borderBottom: props.active ? '1px solid rgba(96, 124, 156, 0.07)' : '1px solid rgba(0, 0, 0, 0)',
    transition: 'all .2s',
    '& .title': {
        display: 'flex',
        alignItems: 'center',

        '& .material-icons': {
            fontSize: 15,
            color: '#abbacb',
            opacity: 0.8,
            transform: props.active ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'all .2s'
        }
    }
}));

interface ConfirmPopoverProps {
    children: any;
    title?: string;
    count?: string;
}

export class CitySelector extends React.Component<ConfirmPopoverProps, { active: boolean }> {
    static Item = CitySelectorItem;

    constructor(props: any) {
        super(props);

        this.state = {
            active: false
        };
    }

    activate = () => {
        this.setState({ active: !this.state.active });
    }

    disable = () => {
        this.setState({ active: false });
    }

    render() {

        let items: any[] = [];
        let children: any[] = [];

        for (let i of React.Children.toArray(this.props.children)) {
            if (React.isValidElement(i) && (i.props as any)._isCitySelectorElement === true) {
                items.push(React.cloneElement(i as any, { onClick: this.disable }));
            } else {
                children.push(i);
            }
        }

        return (
            <>
                <Shadow active={this.state.active} />
                <MapFilterWrapper active={this.state.active}>
                    <ClickOutside onClickOutside={this.disable}>
                        <CityTitle onClick={this.activate} active={this.state.active}>
                            <div className="title">
                                {this.props.title}
                                <XIcon icon="keyboard_arrow_right" />
                            </div>
                            {children}
                        </CityTitle>
                        <CitySelectorItemsWrapper open={this.state.active}>
                            {items}
                        </CitySelectorItemsWrapper>
                    </ClickOutside>
                </MapFilterWrapper>
            </>
        );
    }
}