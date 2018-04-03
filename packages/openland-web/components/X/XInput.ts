import Glamorous from 'glamorous';

let InputsStyle = {
    borderRadius: 4,
    boxShadow: '0 0 0 1px rgba(50, 50, 93, .16), 0 0 0 1px rgba(50, 151, 211, 0), 0 0 0 2px rgba(50, 151, 211, 0), 0 1px 1px rgba(0, 0, 0, .08)',
    boxShadowOnFocus: '0 0 0 1px rgba(50, 50, 93, 0), 0 0 0 1px rgba(50, 151, 211, .2), 0 0 0 2px rgba(50, 151, 211, .25), 0 1px 1px rgba(0, 0, 0, .08)',
    boxShadovNovalid: '0 0 0 1px rgba(226, 89, 80, .16), 0 0 0 1px rgba(50, 151, 211, 0), 0 0 0 2px rgba(50, 151, 211, 0), 0 1px 1px rgba(0, 0, 0, .08)',
    color: '#525f7f',
    backgroundColor: '#fff',
    placeholderColor: '#8898aa',
    fontSize: '14px',
    lineHeight: 1.6,
    paddingTop: 4,
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 2,
    outline: 'none',
};

export const XInput = Glamorous.input<{ placeholder?: string, novalid?: boolean }>((props) => ({
    height: 28,
    boxSizing: 'border-box',
    border: 'none',
    borderRadius: 4,
    boxShadow: props.novalid ? InputsStyle.boxShadovNovalid : InputsStyle.boxShadow,
    color: props.novalid ? '#e25950' : '#525f7f',
    backgroundColor: '#fff',
    fontSize: '14px',
    lineHeight: 1.6,
    paddingTop: 4,
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 2,
    outline: 'none',
    '&:focus': {
        boxShadow: InputsStyle.boxShadowOnFocus
    },
    '&::placeholder': {
        color: props.novalid ? '#e25950' : '#8898aa'
    }
}));