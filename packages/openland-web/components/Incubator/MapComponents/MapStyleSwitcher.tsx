import * as React from 'react';
import Glamorous from 'glamorous';
import ClickOutside from '../ClickOutside';
import { XLink, XLinkProps } from 'openland-x/XLink';
import { XIcon } from 'openland-x/XIcon';

const Shadow = Glamorous.div<{ active: boolean }>((props) => ({
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
    visibility: props.active ? 'visible' : 'hidden',
    opacity: props.active ? 1 : 0,
    backgroundColor: 'rgba(0, 0, 0, 0.41)',
    zIndex: 10
}));

const XSwitcherWrapper = Glamorous.div<{ active: boolean }>((props) => ({
    width: 170,
    position: 'relative',
    boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.08)',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#fff',
    transition: 'max-height .2s',
    maxHeight: props.active ? 200 : 60,
    zIndex: props.active ? 10 : 1,
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'auto !important',
    '& > div': {
        flexDirection: 'column',
        width: '100%',
        '& > a': {
            zIndex: 0,
            flexShrink: 0,
            order: 2,
            '&.is-active': {
                order: 1
                // position: props.active ? undefined : 'absolute',
                // top: props.active ? undefined : 0,
                // left: props.active ? undefined : 0,
                // zIndex: 1
            }
        }
    },
    '& .material-icons': {
        position: 'absolute',
        right: 23,
        bottom: 23,
        fontSize: 15,
        color: '#abbacb',
        opacity: 0.8,
        transition: 'all .2s',
        transform: props.active ? 'rotate(180deg)' : 'rotate(0)',
        pointerEvents: 'none'
    }
}));

const XSwitcherItemStyled = Glamorous(XLink)({
    display: 'flex',
    alignItems: 'center',
    height: 60,
    width: '100%',
    color: '#1f3449',
    borderBottom: 'solid 1px #c1c7cf4d',
    backgroundColor: '#fff',
    transition: 'all .2s',
    boxSizing: 'border-box',
    paddingLeft: 15,
    '&:last-child': {
        borderBottom: 'none'
    },
    '& > span': {
        maxWidth: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
});

const OverButton = Glamorous.div<{ active: boolean }>((props) => ({
    height: 60,
    width: '100%',
    visibility: props.active ? 'hidden' : 'visible',
    pointerEvents: props.active ? 'none' : undefined,
    position: 'absolute',
    bottom: 0,
    left: 0,
    cursor: 'pointer',
    zIndex: 2
}));

const XSwitcherItemImage = Glamorous.div<{ img: string }>((props) => ({
    width: 32,
    height: 32,
    backgroundImage: `url(${props.img})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#fafafc',
    marginRight: 12,
    borderRadius: 6,
    boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.08)'
}));

interface MapStyleSwitcherItemProps extends XLinkProps {
    text: string;
    img: string;
}

class MapStyleSwitcherItem extends React.Component<MapStyleSwitcherItemProps> {
    static defaultProps = {
        _isMapStyleItem: true
    };

    render() {
        const { text, img, ...other } = this.props;
        return (
            <XSwitcherItemStyled {...other}>
                <XSwitcherItemImage img={this.props.img} />
                <span>{this.props.text}</span>
            </XSwitcherItemStyled>
        );
    }
}

interface MapStyleSwitcherProps {
    children: any;
}

export class MapStyleSwitcher extends React.Component<MapStyleSwitcherProps, { active: boolean }> {

    static Item = MapStyleSwitcherItem;

    constructor(props: MapStyleSwitcherProps) {
        super(props);

        this.state = {
            active: false,
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
            if (React.isValidElement(i) && (i.props as any)._isMapStyleItem === true) {
                items.push(React.cloneElement(i as any, { onClick: this.disable }));
            } else {
                children.push(i);
            }
        }

        return (
            <>
                <Shadow active={this.state.active} />
                <XSwitcherWrapper active={this.state.active}>
                    <ClickOutside onClickOutside={this.disable} flex={true}>
                        {items}
                    </ClickOutside>
                    <OverButton active={this.state.active} onClick={this.activate} />
                    <XIcon icon="keyboard_arrow_up" />
                </XSwitcherWrapper>
            </>
        );
    }
}