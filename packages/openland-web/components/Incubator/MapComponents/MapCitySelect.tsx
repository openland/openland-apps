import * as React from 'react';
import Glamorous from 'glamorous';
import { XCard } from 'openland-x/XCard';
import { XIcon } from 'openland-x/XIcon';
import ClickOutside from '../ClickOutside';
import { XLink, XLinkProps } from 'openland-x/XLink';
import XStyles from 'openland-x/XStyles';

const MapFilterWrapper = Glamorous(XCard)<{ active: boolean, width?: number }>((props) => ({
    width: props.width || 325,
    position: 'absolute',
    top: 18,
    left: 18,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: props.active ? 12 : 0,
    zIndex: props.active ? 12 : 1,
    borderRadius: 6,
    border: 'none',
    transition: 'padding .2s',
    boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.08)',
    '& > div': {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
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
    '> span': {
        color: '#1f3449'
    }
}));

const CheckIcon = Glamorous.div<{ active?: boolean }>((props) => ({
    width: 18,
    height: 18,
    borderRadius: 50,
    color: '#fff',
    backgroundColor: props.active ? '#4428e0' : '#fff',
    backgroundImage: props.active ? 'url(\'/static/img/icons/check-form.svg\')' : 'none',
    backgroundSize: 12,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    border: '1px solid rgba(97, 126, 156, 0.2)',
    marginRight: 10,
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
    zIndex: 10,
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

        let { label, ...linkProps } = this.props;

        return (
            <CitySelectorItemLink {...linkProps} >
                <CheckIcon active={this.props.active} />
                <span>{label}</span>
            </CitySelectorItemLink>
        );
    }
}

const CityTitle = Glamorous.div<{ active: boolean }>((props) => ({
    height: 52,
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 'normal',
    letterSpacing: 0.5,
    color: '#1f3449',
    cursor: 'pointer',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: props.active ? 11 : 0,
    paddingBottom: props.active ? 11 : 0,
    borderBottom: props.active ? 'solid 1px #c1c7cf4d' : 'solid 1px transparent',
    transition: 'all .2s',
    display: 'flex',
    alignItems: 'center',
    '& .title': {
        display: 'flex',
        alignItems: 'center',
        userSelect: 'none',
        whiteSpace: 'nowrap',

        fontSize: 15,
        fontWeight: 500,
        color: '#334562',

        transition: 'all .2s',
        '& .material-icons': {
            marginTop: 3,
            marginLeft: 2,
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
    width?: number;
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
                <MapFilterWrapper active={this.state.active} width={this.props.width}>
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