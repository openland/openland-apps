import Glamorous from 'glamorous';

export let XRow = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
});

export const XColumn = Glamorous.div<{ mode?: 'fixed' | 'fit' | 'fill' | null }>((props) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',

    flexGrow: props.mode === 'fill' ? 1 : 0,
    flexBasis: props.mode === 'fill' ? 1 : undefined,
    flexShrink: 0,

    width: props.mode === 'fixed' ? 160 : undefined,
    paddingRight: props.mode === 'fixed' ? 40 : undefined,
    '&:last-child': props.mode === 'fixed' ? { paddingRight: 0 } : undefined
}));

export let XGrid = Glamorous.div<{ mode?: 'two-row' }>({
    width: '100%',
    height: '100%',
    display: 'grid',
    gridGap: 0,
    gridTemplateColumns: '168px auto',
    gridTemplateAreas: `
      "sidebar header header"
      "sidebar footer button"
    `,
    '@media(max-width: 767px)': {
        gridTemplateAreas: `
        "sidebar header header"
        "footer  footer footer"
        "button  button button"
      `,
    }
});

export let XCell = Glamorous.div<{ area: 'sidebar' | 'header' | 'footer' | 'button' }>((props) => ({
    gridArea: props.area
}));