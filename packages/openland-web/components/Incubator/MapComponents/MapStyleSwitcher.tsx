import * as React from 'react';
// import * as ReactDom from 'react-dom';
import Glamorous from 'glamorous';
// import { CSSProperties } from 'glamorous';
import ClickOutside from '../ClickOutside';
import { XLink, XLinkProps } from 'openland-x/XLink';

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
    width: 140,
    position: 'relative',
    boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.08)',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#fff',
    transition: 'all .2s',
    maxHeight: props.active ? 200 : 60,
    zIndex: props.active ? 10 : 1,
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'auto !important',
    // width: '100%',
    // opacity: props.active ? 1 : 0
    '& > div': {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        '& > a': {
            // opacity: props.active ? 1 : 0,
            zIndex: 0,
            '&.is-active': {
                // opacity: 1,
                position: props.active ? undefined : 'absolute',
                top: props.active ? undefined : 0,
                left: props.active ? undefined : 0,
                zIndex: 1
            }
        }
    }
}));

// const XSwitcherItemStyles = {
//     display: 'flex',
//     alignItems: 'center',
//     height: 60,
//     width: '100%',
//     color: '#1f3449',
//     borderBottom: 'solid 1px rgba(97, 126, 156, 0.2)',
//     '&.is-active': {
//         color: '#4428e1'
//     },
//     '&:last-child': {
//         borderBottom: 'none'
//     },
//     '& > span': {
//         maxWidth: '100%',
//         whiteSpace: 'nowrap',
//         overflow: 'hidden',
//         textOverflow: 'ellipsis'
//     },
// } as CSSProperties;

const XSwitcherItemStyled = Glamorous(XLink)({
    display: 'flex',
    alignItems: 'center',
    height: 60,
    width: '100%',
    color: '#1f3449',
    borderBottom: 'solid 1px #c1c7cf4d',
    backgroundColor: '#fff',
    transition: 'all .2s',
    boxSizing: 'content-box',
    paddingLeft: 15,
    '&.is-active': {
        color: '#4428e1'
    },
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

// const XSwitherTargetStyled = Glamorous(XLink)<{ active: boolean }>((props) => ({
//     ...XSwitcherItemStyles,
//     transition: 'all .2s',
//     opacity: props.active ? 0 : 1,
//     visibility: props.active ? 'hidden' : 'visible',
//     pointerEvents: props.active ? 'none' : undefined,
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
// }));

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

// interface MapStyleSwitcherTargetProps extends XLinkProps {
//     text: string;
//     img: string;
//     active: boolean;
// }

// const MapStyleSwitcherTarget = (props: MapStyleSwitcherTargetProps) => {
//     const { text, img, ...other } = props;
//     return (
//         <XSwitherTargetStyled {...other}>
//             <XSwitcherItemImage img={props.img} />
//             <span>{props.text}</span>
//         </XSwitherTargetStyled>
//     );
// };

interface MapStyleSwitcherProps {
    children: any;
}

interface MapStyleSwitcherState {
    active: boolean;
    // text: string;
    // img: string;
}

export class MapStyleSwitcher extends React.Component<MapStyleSwitcherProps, MapStyleSwitcherState> {

    static Item = MapStyleSwitcherItem;
    // static refs = new Set();
    // timeout: any;

    constructor(props: MapStyleSwitcherProps) {
        super(props);

        this.state = {
            active: false,
            // text: '',
            // img: ''
        };
    }

    // componentWillUnmount() {
    //     clearTimeout(this.timeout);
    // }

    // handleContentRef = (ref: any | null) => {
    //     MapStyleSwitcher.refs.add(ref);

    //     if (MapStyleSwitcher.refs.size !== 0) {
    //         this.targetHandler();
    //     }
    // }

    activate = () => {
        this.setState({ active: !this.state.active });
        // if (MapStyleSwitcher.refs.size !== 0) {
        //     this.targetHandler();
        // }
    }

    disable = () => {
        this.setState({ active: false });
        // if (MapStyleSwitcher.refs.size !== 0) {
        //     this.targetHandler();
        // }
    }

    // targetHandler = () => {
    //     for (let item of MapStyleSwitcher.refs) {
    //         if (ReactDom.findDOMNode(item).classList.contains('is-active')) {
    //             this.setState({
    //                 text: item.props.text,
    //                 img: item.props.img
    //             });
    //         }
    //     }
    //     // if (MapStyleSwitcher.refs.size !== 0) {
    //     //     this.timeout = setTimeout(
    //     //         () => { this.targetHandler(); },
    //     //         500
    //     //     );
    //     // }
    // }

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
                    {/* <ClickOutside onClickOutside={this.disable}>
                        {items}
                    </ClickOutside> */}
                    <ClickOutside onClickOutside={this.disable}>
                        {items}
                    </ClickOutside>
                    <OverButton active={this.state.active} onClick={this.activate} />
                    {/* <MapStyleSwitcherTarget active={this.state.active} text={this.state.text} img={this.state.img} onClick={this.activate} /> */}
                </XSwitcherWrapper>
            </>
        );
    }
}