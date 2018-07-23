import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';

export const RootContainer = Glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    position: 'relative',
    backgroundColor: '#fff'
});

export const Logo = Glamorous.div<{ width?: number, height?: number }>((props) => ({
    width: props.width ? props.width : 45,
    height: props.height ? props.height : 45,
    backgroundImage: 'url(\'/static/logo-purple.svg\')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    position: 'absolute',
    top: 15,
    left: 23
}));

export const Title = Glamorous.div({
    fontSize: 26,
    fontWeight: 500,
    letterSpacing: 1.8,
    color: '#1f3449',
    marginBottom: 18
});

export const TextWrapper = Glamorous.div({
    marginBottom: 36
});

export const Label = Glamorous.div({
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.27,
    letterSpacing: -0.1,
    color: '#334562',
    marginBottom: 10
});

export const OptionalLabel = Glamorous(Label)({
    opacity: 0.4
});

export const PhotoContiner = Glamorous(XVertical)({
    marginLeft: 24
});

export const InputGroup = Glamorous.div({
    marginBottom: 19,
    width: 360,
    '&:last-child': {
        marginBottom: 0
    }
});

export const ContentWrapper = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    marginTop: 55
});

export const FormWrapper = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
});

export const FieldHeader = Glamorous(XHorizontal)({
    justifyContent: 'space-between'
});

export const Footer = Glamorous(XHorizontal)({
    justifyContent: 'space-between',
    paddingLeft: -14
});
