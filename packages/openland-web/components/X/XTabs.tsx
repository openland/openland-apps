import * as React from 'react';
import Glamorous from 'glamorous';

const XTabsWrapper = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    boxShadow: '0 7px 14px 0 rgba(50, 50, 93, .1), 0 3px 6px 0 rgba(0, 0, 0, .07)',
    borderRadius: 4,
    overflow: 'hidden'
});

const XTabsOption = Glamorous.div<{ isSelect?: boolean }>((props) => ({
    cursor: 'pointer',
    userSelect: 'none',
    flexGrow: 1,
    fontSize: 14,
    fontWeight: 500,
    color: props.isSelect ? '#6772e5' : '#525f7f',
    backgroundColor: props.isSelect ? '#fff' : '#f6f9fc',
    paddingTop: 16,
    paddingBottom: 12,
    textAlign: 'center',
    boxShadow: props.isSelect ? 'rgb(103, 114, 229) 0px 3px inset, rgb(230, 235, 241) -1px 0px inset' : '-1px 0 #e6ebf1'
}));

interface XTabsProps {
    options: any[];
}

export class XTabs extends React.Component<XTabsProps, { value: any }> {
    constructor(props: XTabsProps) {
        super(props);

        this.state = {
            value: {}
        };
    }

    handleSelect = (item: any, key: number) => {
        let selectValue = {
            title: item.title,
            key: key
        };

        this.setState({
            value: selectValue,
        });
    }

    render() {
        let { value } = this.state;
        let { options } = this.props;
        return (
            <>
                <XTabsWrapper>
                    {options.map((item, i) => (
                        <XTabsOption key={i} onClick={() => this.handleSelect(item, i)} isSelect={value.key === i ? true : false}>
                            {item.title}
                        </XTabsOption>
                    ))}
                </XTabsWrapper>
            </>
        );
    }
}