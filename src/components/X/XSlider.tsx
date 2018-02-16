import * as React from 'react';
import Slider, { Range } from 'rc-slider';
import Glamorous from 'glamorous';
import * as glamor from 'glamor';

const rcSliderTooltipZoomDownIn = glamor.keyframes({
    '0%': { 
        opacity: 0,
        transformOrigin: '50% 100%',
        transform: 'scale(0, 0)'
    },
    '100%': { 
        transformOrigin: '50% 100%',
        transform: 'scale(1, 1)' 
    }
})

const rcSliderTooltipZoomDownOut = glamor.keyframes({
    '0%': { 
        transformOrigin: '50% 100%',
        transform: 'scale(1, 1)'
    },
    '100%': { 
        opacity: 0,
        transformOrigin: '50% 100%',
        transform: 'scale(0, 0)' 
    }
})

let SliderDiv = Glamorous.div({
    '& *': {
        boxSizing: 'border-box',
    },
    '& .rc-slider': {
        position: 'relative',
        height: 14,
        padding: '5px 0',
        width: '100%',
        borderRadius: '6px',
        touchAction: 'none'
    },
    '& .rc-slider-rail': {
        position: 'absolute',
        width: '100%',
        backgroundColor: '#e9e9e9',
        height: 4,
        borderRadius: '6px'
    },
    '& .rc-slider-track': {
        position: 'absolute',
        left: 0,
        height: 4,
        borderRadius: '6px',
        backgroundColor: '#abe2fb'
    },
    '& .rc-slider-handle': {
        position: 'absolute',
        marginLeft: -7,
        marginTop: -5,
        width: 14,
        height: 14,
        cursor: 'pointer',
        borderRadius: '50%',
        border: 'solid 2px #96dbfa',
        backgroundColor: '#fff',
        touchAction: 'pan-x',
        '&:hover': {
            borderColor: '#57c5f7'
        },
        '&:active': {
            borderColor: '#57c5f7',
            boxShadow: '0 0 5px #57c5f7',
            cursor: 'grabbing'
        },
        '&:focus': {
            borderColor: '#57c5f7',
            boxShadow: '0 0 0 5px #96dbfa',
            outline: 'none'
        }
    },
    '& .rc-slider-mark': {
        position: 'absolute',
        top: 18,
        left: 0,
        width: '100%',
        fontSize: '12px'
    },
    '& .rc-slider-mark-text': {
        position: 'absolute',
        display: 'inline-block',
        verticalAlign: 'middle',
        textAlign: 'center',
        cursor: 'pointer',
        color: '#999'
    },
    '& .rc-slider-mark-text-active': {
        color: '#666'
    },
    '& .rc-slider-step': {
        position: 'absolute',
        width: '100%',
        height: 4,
        background: 'transparent'
    },
    '& .rc-slider-dot': {
        position: 'absolute',
        bottom: -2,
        marginLeft: -4,
        width: 8,
        height: 8,
        border: '2px solid #e9e9e9',
        backgroundColor: '#fff',
        cursor: 'pointer',
        borderRadius: '50%',
        verticalAlign: 'middle'
    },
    '& .rc-slider-dot-active': {
        borderColor: '#96dbfa'
    },
    '& .rc-slider-disabled': {
        backgroundColor: '#e9e9e9',
        '& .rc-slider-track': {
            backgroundColor: '#ccc'
        },
        '& .rc-slider-handle, & .rc-slider-dot': {
            borderColor: '#ccc',
            boxShadow: 'none',
            backgroundColor: '#fff',
            cursor: 'not-allowed'
        },
        '& .rc-slider-mark-text, & .rc-slider-dot': {
            cursor: 'not-allowed !important'
        }
    },
    '& .rc-slider-vertical': {
        width: 14,
        height: '100%',
        padding: '0 5px',
        '& .rc-slider-rail': {
            height: '100%',
            width: 4
        },
        '& .rc-slider-track': {
            left: 5,
            bottom: 0,
            width: 4
        },
        '& .rc-slider-handle': {
            marginLeft: -5,
            marginBottom: -7,
            touchAction: 'pan-y'
        },
        '& .rc-slider-mark': {
            top: 0,
            left: 18,
            height: '100%'
        },
        '& .rc-slider-step': {
            height: '100%',
            width: 4
        },
        '& .rc-slider-dot': {
            left: 2,
            marginBottom: -4,
            '&:first-child, &:last-child': {
                marginBottom: -4
            }
        }
    },
    '& .rc-slider-tooltip-zoom-down-enter, .rc-slider-tooltip-zoom-down-appear': {
        animationDuration: '.3s',
        animationFillMode: 'both',
        display: 'block !important',
        animationPlayState: 'paused',
        transform: 'scale(0, 0)',
        animationTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
        '&.rc-slider-tooltip-zoom-down-enter-active, &.rc-slider-tooltip-zoom-down-appear-active': {
            animationName: rcSliderTooltipZoomDownIn,
            animationPlayState: 'running'
        }
    },
    '& .rc-slider-tooltip-zoom-down-leave': {
        animationDuration: '.3s',
        animationFillMode: 'both',
        display: 'block !important',
        animationPlayState: 'paused',
        animationTimingFunction: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
        '&.rc-slider-tooltip-zoom-down-leave-active': {
            animationName: rcSliderTooltipZoomDownOut,
            animationPlayState: 'running'
        }
    },
    '& .rc-slider-tooltip': {
        position: 'absolute',
        left: -9999,
        top: -9999,
        visibility: 'visible',
        boxSizing: 'border-box'
    },
    '& .rc-slider-tooltip-hidden': {
        display: 'none'
    },
    '& .rc-slider-tooltip-placement-top': {
        padding: '4px 0 8px 0',
        '& .rc-slider-tooltip-arrow': {
            bottom: 4,
            left: '50%',
            marginLeft: -4,
            borderWidth: '4px 4px 0',
            borderTopColor: '#6c6c6c'
        }
    },
    '& .rc-slider-tooltip-inner': {
        padding: '6px 2px',
        minWidth: 24,
        height: 24,
        fontSize: '12px',
        lineHeight: 1,
        color: '#fff',
        textAlign: 'center',
        textDecoration: 'none',
        backgroundColor: '#6c6c6c',
        borderRadius: '6px',
        boxShadow: '0 0 4px #d9d9d9'
    },
    '& .rc-slider-tooltip-arrow': {
        position: 'absolute',
        width: 0,
        height: 0,
        borderColor: 'transparent',
        borderStyle: 'solid'
      }
})

export class XSlider extends React.Component<{ children: any }> {

    static Slider = Slider
    static Range = Range

    render() {
        return (
            <SliderDiv>
                {this.props.children}
            </SliderDiv>
        )
    }
}