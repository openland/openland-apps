import Glamorous from 'glamorous';

export let XTitle = Glamorous.div<{ marginBottom?: number, marginTop?: number }>((props) => ({
    marginTop: props.marginTop !== undefined ? props.marginTop : 24,
    marginBottom: props.marginBottom !== undefined ? props.marginBottom : 16,
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '22px',
    color: '#000000'
}));