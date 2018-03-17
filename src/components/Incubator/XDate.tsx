import * as React from 'react';
import * as ReactDates from 'react-dates';
import Glamorous from 'glamorous';
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';

const XDateContainer = Glamorous.div({
  '& .PresetDateRangePicker_panel': {
      padding: '0 22px 11px'
    },
    '& .PresetDateRangePicker_button': {
      position: 'relative',
      height: '100%',
      textAlign: 'center',
      background: '0 0',
      border: '2px solid #00a699',
      color: '#00a699',
      padding: '4px 12px',
      marginRight: 8,
      font: 'inherit',
      fontWeight: 700,
      lineHeight: 'normal',
      overflow: 'visible',
      boxSizing: 'border-box',
      cursor: 'pointer'
    },
    '& .PresetDateRangePicker_button:active': {
      outline: 0
    },
    '& .PresetDateRangePicker_button__selected': {
      color: '#fff',
      background: '#00a699'
    },
    '& .SingleDatePickerInput': {
      display: 'inline-block',
      backgroundColor: '#fff'
    },
    '& .SingleDatePickerInput__withBorder': {
      border: '1px solid #dbdbdb'
    },
    '& .SingleDatePickerInput__rtl': {
      direction: 'rtl'
    },
    '& .SingleDatePickerInput__disabled': {
      backgroundColor: '#f2f2f2'
    },
    '& .SingleDatePickerInput__block': {
      display: 'block'
    },
    '& .SingleDatePickerInput__showClearDate': {
      paddingRight: '30px'
    },
    '& .SingleDatePickerInput_clearDate': {
      background: '0 0',
      border: 0,
      color: 'inherit',
      font: 'inherit',
      lineHeight: 'normal',
      overflow: 'visible',
      cursor: 'pointer',
      padding: 10,
      margin: '0 10px 0 5px',
      position: 'absolute',
      right: 0,
      top: '50%',
      transform: 'translateY(-50%)'
    },
    '& .SingleDatePickerInput_clearDate__default:focus, & .SingleDatePickerInput_clearDate__default:hover': {
      background: '#dbdbdb',
      borderRadius: '50%'
    },
    '& .SingleDatePickerInput_clearDate__small': {
      padding: 6
    },
    '& .SingleDatePickerInput_clearDate__hide': {
      visibility: 'hidden'
    },
    '& .SingleDatePickerInput_clearDate_svg': {
      fill: '#82888a',
      height: 12,
      width: 15,
      verticalAlign: 'middle'
    },
    '& .SingleDatePickerInput_clearDate_svg__small': {
      height: 9
    },
    '& .SingleDatePickerInput_calendarIcon': {
      background: '0 0',
      border: 0,
      color: 'inherit',
      font: 'inherit',
      lineHeight: 'normal',
      overflow: 'visible',
      cursor: 'pointer',
      display: 'inline-block',
      verticalAlign: 'middle',
      padding: 10,
      margin: '0 5px 0 10px'
    },
    '& .SingleDatePickerInput_calendarIcon_svg': {
      fill: '#82888a',
      height: 15,
      width: 14,
      verticalAlign: 'middle'
    },
    '& .SingleDatePicker': {
      position: 'relative',
      display: 'inline-block'
    },
    '& .SingleDatePicker__block': {
      display: 'block'
    },
    '& .SingleDatePicker_picker': {
      zIndex: 1,
      backgroundColor: '#fff',
      position: 'absolute'
    },
    '& .SingleDatePicker_picker__rtl': {
      direction: 'rtl'
    },
    '& .SingleDatePicker_picker__directionLeft': {
      left: 0
    },
    '& .SingleDatePicker_picker__directionRight': {
      right: 0
    },
    '& .SingleDatePicker_picker__portal': {
      backgroundColor: 'rgba(0,0,0,.3)',
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%'
    },
    '& .SingleDatePicker_picker__fullScreenPortal': {
      backgroundColor: '#fff'
    },
    '& .SingleDatePicker_closeButton': {
      background: '0 0',
      border: 0,
      color: 'inherit',
      font: 'inherit',
      lineHeight: 'normal',
      overflow: 'visible',
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      right: 0,
      padding: 15,
      zIndex: 2
    },
    '& .SingleDatePicker_closeButton:focus, & .SingleDatePicker_closeButton:hover': {
      color: 'darken(#cacccd,10%)',
      textDecoration: 'none'
    },
    '& .SingleDatePicker_closeButton_svg': {
      height: 15,
      width: 15,
      fill: '#cacccd'
    },
    '& .DayPickerKeyboardShortcuts_buttonReset': {
      background: '0 0',
      border: 0,
      borderRadius: 0,
      color: 'inherit',
      font: 'inherit',
      lineHeight: 'normal',
      overflow: 'visible',
      padding: 0,
      cursor: 'pointer',
      fontSize: 14,
      outline: 0
    },
    '& .DayPickerKeyboardShortcuts_buttonReset:active': {
      outline: 0
    },
    '& .DayPickerKeyboardShortcuts_show': {
      width: 22,
      position: 'absolute',
      zIndex: 2
    },
    '& .DayPickerKeyboardShortcuts_show__bottomRight': {
      borderTop: '26px solid transparent',
      borderRight: '33px solid #00a699',
      bottom: 0,
      right: 0
    },
    '& .DayPickerKeyboardShortcuts_show__bottomRight:hover': {
      borderRight: '33px solid #008489'
    },
    '& .DayPickerKeyboardShortcuts_show__topRight': {
      borderBottom: '26px solid transparent',
      borderRight: '33px solid #00a699',
      top: 0,
      right: 0
    },
    '& .DayPickerKeyboardShortcuts_show__topRight:hover': {
      borderRight: '33px solid #008489'
    },
    '& .DayPickerKeyboardShortcuts_show__topLeft': {
      borderBottom: '26px solid transparent',
      borderLeft: '33px solid #00a699',
      top: 0,
      left: 0
    },
    '& .DayPickerKeyboardShortcuts_show__topLeft:hover': {
      borderLeft: '33px solid #008489'
    },
    '& .DayPickerKeyboardShortcuts_showSpan': {
      color: '#fff',
      position: 'absolute'
    },
    '& .DayPickerKeyboardShortcuts_showSpan__bottomRight': {
      bottom: 0,
      right: -28
    },
    '& .DayPickerKeyboardShortcuts_showSpan__topRight': {
      top: 1,
      right: -28
    },
    '& .DayPickerKeyboardShortcuts_showSpan__topLeft': {
      top: 1,
      left: -28
    },
    '& .DayPickerKeyboardShortcuts_panel': {
      overflow: 'auto',
      background: '#fff',
      border: '1px solid #dbdbdb',
      borderRadius: 2,
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      zIndex: 2,
      padding: 22,
      margin: 33
    },
    '& .DayPickerKeyboardShortcuts_title': {
      fontSize: 16,
      fontWeight: 700,
      margin: 0
    },
    '& .DayPickerKeyboardShortcuts_list': {
      listStyle: 'none',
      padding: 0,
      fontSize: 14
    },
    '& .DayPickerKeyboardShortcuts_close': {
      position: 'absolute',
      right: 22,
      top: 22,
      zIndex: 2
    },
    '& .DayPickerKeyboardShortcuts_close:active': {
      outline: 0
    },
    '& .DayPickerKeyboardShortcuts_closeSvg': {
      height: 15,
      width: 15,
      fill: '#cacccd'
    },
    '& .DayPickerKeyboardShortcuts_closeSvg:focus, & .DayPickerKeyboardShortcuts_closeSvg:hover': {
      fill: '#82888a'
    },
    '& .CalendarDay': {
      boxSizing: 'border-box',
      cursor: 'pointer',
      fontSize: 14,
      textAlign: 'center'
    },
    '& .CalendarDay:active': {
      outline: 0
    },
    '& .CalendarDay__defaultCursor': {
      cursor: 'default'
    },
    '& .CalendarDay__default': {
      border: '1px solid #e4e7e7',
      color: '#565a5c',
      background: '#fff'
    },
    '& .CalendarDay__default:hover': {
      background: '#e4e7e7',
      border: '1px double #e4e7e7',
      color: 'inherit'
    },
    '& .CalendarDay__hovered_offset': {
      background: '#f4f5f5',
      border: '1px double #e4e7e7',
      color: 'inherit'
    },
    '& .CalendarDay__outside': {
      border: 0,
      background: '#fff',
      color: '#565a5c'
    },
    '& .CalendarDay__blocked_minimum_nights': {
      background: '#fff',
      border: '1px solid #eceeee',
      color: '#cacccd'
    },
    '& .CalendarDay__blocked_minimum_nights:active, & .CalendarDay__blocked_minimum_nights:hover': {
      background: '#fff',
      color: '#cacccd'
    },
    '& .CalendarDay__highlighted_calendar': {
      background: '#ffe8bc',
      color: '#565a5c'
    },
    '& .CalendarDay__highlighted_calendar:active, & .CalendarDay__highlighted_calendar:hover': {
      background: '#ffce71',
      color: '#565a5c'
    },
    '& .CalendarDay__selected_span': {
      background: '#66e2da',
      border: '1px solid #33dacd',
      color: '#fff'
    },
    '& .CalendarDay__selected_span:active, & .CalendarDay__selected_span:hover': {
      background: '#33dacd',
      border: '1px solid #33dacd',
      color: '#fff'
    },
    '& .CalendarDay__last_in_range': {
      borderRight: '#00a699'
    },
    '& .CalendarDay__selected, & .CalendarDay__selected:active, & .CalendarDay__selected:hover': {
      background: '#00a699',
      border: '1px solid #00a699',
      color: '#fff'
    },
    '& .CalendarDay__hovered_span, & .CalendarDay__hovered_span:hover': {
      background: '#b2f1ec',
      border: '1px solid #80e8e0',
      color: '#007a87'
    },
    '& .CalendarDay__hovered_span:active': {
      background: '#80e8e0',
      border: '1px solid #80e8e0',
      color: '#007a87'
    },
    '& .CalendarDay__blocked_calendar, & .CalendarDay__blocked_calendar:active, & .CalendarDay__blocked_calendar:hover': {
      background: '#cacccd',
      border: '1px solid #cacccd',
      color: '#82888a'
    },
    '& .CalendarDay__blocked_out_of_range, & .CalendarDay__blocked_out_of_range:active, & .CalendarDay__blocked_out_of_range:hover': {
      background: '#fff',
      border: '1px solid #e4e7e7',
      color: '#cacccd'
    },
    '& .CalendarMonth': {
      background: '#fff',
      textAlign: 'center',
      padding: '0 13px',
      verticalAlign: 'top',
      userSelect: 'none'
    },
    '& .CalendarMonth_table': {
      borderCollapse: 'collapse',
      borderSpacing: 0
    },
    '& .CalendarMonth_caption': {
      color: '#565a5c',
      fontSize: 18,
      textAlign: 'center',
      paddingTop: 22,
      paddingBottom: 37,
      captionSide: 'initial'
    },
    '& .CalendarMonth_caption__verticalScrollable': {
      paddingTop: 12,
      paddingBottom: 7
    },
    '& .CalendarMonthGrid': {
      background: '#fff',
      textAlign: 'left',
      zIndex: 0
    },
    '& .CalendarMonthGrid__animating': {
      zIndex: 1
    },
    '& .CalendarMonthGrid__horizontal': {
      position: 'absolute',
      left: 9
    },
    '& .CalendarMonthGrid__vertical': {
      margin: '0 auto'
    },
    '& .CalendarMonthGrid__vertical_scrollable': {
      margin: '0 auto',
      overflowY: 'scroll'
    },
    '& .CalendarMonthGrid_month__horizontal': {
      display: 'inline-block',
      verticalAlign: 'top',
      minHeight: '100%'
    },
    '& .CalendarMonthGrid_month__hideForAnimation': {
      position: 'absolute',
      zIndex: -1,
      opacity: 0,
      pointerEvents: 'none'
    },
    '& .CalendarMonthGrid_month__hidden': {
      visibility: 'hidden'
    },
    '& .DayPickerNavigation_container': {
      position: 'relative',
      zIndex: 2
    },
    '& .DayPickerNavigation_container__vertical': {
      background: '#fff',
      boxShadow: '0 0 5px 2px rgba(0,0,0,.1)',
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: 52,
      width: '100%'
    },
    '& .DayPickerNavigation_container__verticalScrollable': {
      position: 'relative'
    },
    '& .DayPickerNavigation_button': {
      cursor: 'pointer',
      lineHeight: .78,
      userSelect: 'none'
    },
    '& .DayPickerNavigation_button__default': {
      border: '1px solid #e4e7e7',
      backgroundColor: '#fff',
      color: '#757575'
    },
    '& .DayPickerNavigation_button__default:focus, & .DayPickerNavigation_button__default:hover': {
      border: '1px solid #c4c4c4'
    },
    '& .DayPickerNavigation_button__default:active': {
      background: '#f2f2f2'
    },
    '& .DayPickerNavigation_button__horizontal': {
      borderRadius: 3,
      padding: '6px 9px',
      top: 18,
      position: 'absolute'
    },
    '& .DayPickerNavigation_leftButton__horizontal': {
      left: 22
    },
    '& .DayPickerNavigation_rightButton__horizontal': {
      right: 22
    },
    '& .DayPickerNavigation_button__vertical': {
      display: 'inline-block',
      position: 'relative',
      height: '100%',
      width: '50%'
    },
    '& .DayPickerNavigation_button__vertical__default': {
      padding: 5
    },
    '& .DayPickerNavigation_nextButton__vertical__default': {
      borderLeft: 0
    },
    '& .DayPickerNavigation_nextButton__verticalScrollable': {
      width: '100%'
    },
    '& .DayPickerNavigation_svg__horizontal': {
      height: 19,
      width: 19,
      fill: '#82888a'
    },
    '& .DayPickerNavigation_svg__vertical': {
      height: 42,
      width: 42,
      fill: '#565a5c'
    },
    '& .DayPicker': {
      background: '#fff',
      position: 'relative',
      textAlign: 'left'
    },
    '& .DayPicker__horizontal': {
      background: '#fff'
    },
    '& .DayPicker__verticalScrollable': {
      height: '100%'
    },
    '& .DayPicker__hidden': {
      visibility: 'hidden'
    },
    '& .DayPicker__withBorder': {
      boxShadow: '0 2px 6px rgba(0,0,0,.05),0 0 0 1px rgba(0,0,0,.07)',
      borderRadius: 3
    },
    '& .DayPicker_portal__horizontal': {
      boxShadow: 'none',
      position: 'absolute',
      left: '50%',
      top: '50%'
    },
    '& .DayPicker_portal__vertical': {
      position: 'initial'
    },
    '& .DayPicker_focusRegion': {
      outline: 0
    },
    '& .DayPicker_calendarInfo__horizontal, & .DayPicker_wrapper__horizontal': {
      display: 'inline-block',
      verticalAlign: 'top'
    },
    '& .DayPicker_weekHeaders': {
      position: 'relative'
    },
    '& .DayPicker_weekHeaders__horizontal': {
      marginLeft: 9
    },
    '& .DayPicker_weekHeader': {
      color: '#757575',
      position: 'absolute',
      top: 62,
      zIndex: 2,
      padding: '0 13px',
      textAlign: 'left'
    },
    '& .DayPicker_weekHeader__vertical': {
      left: '50%'
    },
    '& .DayPicker_weekHeader__verticalScrollable': {
      top: 0,
      display: 'table-row',
      borderBottom: '1px solid #dbdbdb',
      background: '#fff',
      marginLeft: 0,
      left: 0,
      width: '100%',
      textAlign: 'center'
    },
    '& .DayPicker_weekHeader_ul': {
      listStyle: 'none',
      margin: '1px 0',
      paddingLeft: 0,
      paddingRight: 0,
      fontSize: 14
    },
    '& .DayPicker_weekHeader_li': {
      display: 'inline-block',
      textAlign: 'center'
    },
    '& .DayPicker_transitionContainer': {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 3
    },
    '& .DayPicker_transitionContainer__horizontal': {
      transition: 'height .2s ease-in-out'
    },
    '& .DayPicker_transitionContainer__vertical': {
      width: '100%'
    },
    '& .DayPicker_transitionContainer__verticalScrollable': {
      paddingTop: 20,
      height: '100%',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      overflowY: 'scroll'
    },
    '& .DateInput': {
      margin: 0,
      padding: 0,
      background: '#fff',
      position: 'relative',
      display: 'inline-block',
      width: 130,
      verticalAlign: 'middle'
    },
    '& .DateInput__small': {
      width: 90
    },
    '& .DateInput__block': {
      width: '100%'
    },
    '& .DateInput__disabled': {
      background: '#f2f2f2',
      color: '#dbdbdb'
    },
    '& .DateInput_input': {
      fontWeight: 200,
      fontSize: 18,
      lineHeight: '24px',
      color: '#565a5c',
      backgroundColor: '#fff',
      width: '100%',
      padding: '13px 12px 11px',
      border: 0,
      borderTop: 0,
      borderRight: 0,
      borderBottom: '2px solid transparent',
      borderLeft: 0
    },
    '& .DateInput_input__small': {
      fontSize: 14,
      lineHeight: '18px',
      padding: '8px 8px 6px'
    },
    '& .DateInput_input__regular': {
      fontWeight: 'auto'
    },
    '& .DateInput_input__readOnly': {
      userSelect: 'none'
    },
    '& .DateInput_input__focused': {
      outline: 0,
      background: '#fff',
      border: 0,
      borderTop: 0,
      borderRight: 0,
      borderBottom: '2px solid #008489',
      borderLeft: 0
    },
    '& .DateInput_input__disabled': {
      background: '#f2f2f2',
      fontStyle: 'italic'
    },
    '& .DateInput_screenReaderMessage': {
      border: 0,
      clip: 'rect(0,0,0,0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      width: 1
    },
    '& .DateInput_fang': {
      position: 'absolute',
      width: 20,
      height: 10,
      left: 22,
      zIndex: 2
    },
    '& .DateInput_fangShape': {
      fill: '#fff'
    },
    '& .DateInput_fangStroke': {
      stroke: '#dbdbdb',
      fill: 'transparent'
    },
    '& .DateRangePickerInput': {
      backgroundColor: '#fff',
      display: 'inline-block'
    },
    '& .DateRangePickerInput__disabled': {
      background: '#f2f2f2'
    },
    '& .DateRangePickerInput__withBorder': {
      border: '1px solid #cacccd'
    },
    '& .DateRangePickerInput__rtl': {
      direction: 'rtl'
    },
    '& .DateRangePickerInput__block': {
      display: 'block'
    },
    '& .DateRangePickerInput__showClearDates': {
      paddingRight: 30
    },
    '& .DateRangePickerInput_arrow': {
      display: 'inline-block',
      verticalAlign: 'middle'
    },
    '& .DateRangePickerInput_arrow_svg': {
      verticalAlign: 'middle',
      fill: '#565a5c',
      height: 24,
      width: 24
    },
    '& .DateRangePickerInput_arrow_svg__small': {
      height: 19,
      width: 19
    },
    '& .DateRangePickerInput_clearDates': {
      background: '0 0',
      border: 0,
      color: 'inherit',
      font: 'inherit',
      lineHeight: 'normal',
      overflow: 'visible',
      cursor: 'pointer',
      padding: 10,
      margin: '0 10px 0 5px',
      position: 'absolute',
      right: 0,
      top: '50%',
      transform: 'translateY(-50%)'
    },
    '& .DateRangePickerInput_clearDates__small': {
      padding: 6
    },
    '& .DateRangePickerInput_clearDates_default:focus, & .DateRangePickerInput_clearDates_default:hover': {
      background: '#dbdbdb',
      borderRadius: '50%'
    },
    '& .DateRangePickerInput_clearDates__hide': {
      visibility: 'hidden'
    },
    '& .DateRangePickerInput_clearDates_svg': {
      fill: '#82888a',
      height: 12,
      width: 15,
      verticalAlign: 'middle'
    },
    '& .DateRangePickerInput_clearDates_svg__small': {
      height: 9
    },
    '& .DateRangePickerInput_calendarIcon': {
      background: '0 0',
      border: 0,
      color: 'inherit',
      font: 'inherit',
      lineHeight: 'normal',
      overflow: 'visible',
      cursor: 'pointer',
      display: 'inline-block',
      verticalAlign: 'middle',
      padding: 10,
      margin: '0 5px 0 10px'
    },
    '& .DateRangePickerInput_calendarIcon_svg': {
      fill: '#82888a',
      height: 15,
      width: 14,
      verticalAlign: 'middle'
    },
    '& .DateRangePicker': {
      position: 'relative',
      display: 'inline-block'
    },
    '& .DateRangePicker__block': {
      display: 'block'
    },
    '& .DateRangePicker_picker': {
      zIndex: 1,
      backgroundColor: '#fff',
      position: 'absolute'
    },
    '& .DateRangePicker_picker__rtl': {
      direction: 'rtl'
    },
    '& .DateRangePicker_picker__directionLeft': {
      left: 0
    },
    '& .DateRangePicker_picker__directionRight': {
      right: 0
    },
    '& .DateRangePicker_picker__portal': {
      backgroundColor: 'rgba(0,0,0,.3)',
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%'
    },
    '& .DateRangePicker_picker__fullScreenPortal': {
      backgroundColor: '#fff'
    },
    '& .DateRangePicker_closeButton': {
      background: '0 0',
      border: 0,
      color: 'inherit',
      font: 'inherit',
      lineHeight: 'normal',
      overflow: 'visible',
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      right: 0,
      padding: 15,
      zIndex: 2
    },
    '& .DateRangePicker_closeButton:focus, & .DateRangePicker_closeButton:hover': {
      color: 'darken(#cacccd,10%)',
      textDecoration: 'none'
    },
    '& .DateRangePicker_closeButton_svg': {
      height: 15,
      width: 15,
      fill: '#cacccd'
    }
});

export class XDateRangePicker extends React.Component<ReactDates.DateRangePickerShape> {
    render() {
        return (
            <DateRangePicker {...this.props} />
        );
    }
}

export class XSingleDatePicker extends React.Component<ReactDates.SingleDatePickerShape> {
    render() {
        return (
            <SingleDatePicker {...this.props} />
        );
    }
}

export class XDayPickerRangeController extends React.Component<ReactDates.DayPickerRangeControllerShape> {
    render() {
        return (
            <DayPickerRangeController {...this.props} />
        );
    }
}

export class XDate extends React.Component<{children: any}> {
    static Single = XSingleDatePicker;
    static Range = XDateRangePicker;
    static RangeController = XDayPickerRangeController;

    render() {
        return (
            <XDateContainer>
                {this.props.children}
            </XDateContainer>
        );
    }
}