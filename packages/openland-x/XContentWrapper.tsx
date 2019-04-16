import Glamorous from 'glamorous';

interface XContentWrapperProps {
    withPaddingBottom?: boolean;
    withFlex?: boolean;
    flexDirection?: any;
    flexGrow?: any;
    flexShrink?: any;
}

export const XContentWrapper = Glamorous.div<XContentWrapperProps>(props => ({
    position: 'relative',
    display: props.withFlex ? 'flex' : 'block',
    flexDirection: props.flexDirection !== undefined ? props.flexDirection : undefined,
    flexGrow: props.flexGrow !== undefined ? props.flexGrow : undefined,
    flexShrink: props.flexShrink !== undefined ? props.flexShrink : undefined,
    width: '100%',
    maxWidth: 832,
    margin: '0 auto',
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: props.withPaddingBottom ? 20 : 0,
    paddingLeft: 16,
}));
