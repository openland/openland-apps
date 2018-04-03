import * as React from 'react';
import { withRouter, XWithRouter } from '../withRouter';
import * as qs from 'query-string';
import { ChangeEvent } from 'react';

type XFilterInputFieldProps = { searchKey: string, placeholder?: string, className?: string } & XWithRouter;

class XFilterInputField extends React.Component<XFilterInputFieldProps, { value: string }> {

    timeout: number | null = null;

    constructor(props: XFilterInputFieldProps, context?: any) {
        super(props, context);
        let s = JSON.parse(JSON.stringify(this.props.router.query!!));
        var value: string = '';
        if (s[this.props.searchKey]) {
            value = s[this.props.searchKey];
        }
        this.state = { value: value };
    }

    resetTimeout() {
        if (this.timeout !== null) {
            window.clearTimeout(this.timeout);
            this.timeout = null;
        }
    }

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ value: e.target.value });

        let s2 = JSON.parse(JSON.stringify(this.props.router.query!!));
        if (e.target.value === '') {
            delete s2[this.props.searchKey];
        } else {
            s2[this.props.searchKey] = e.target.value;
        }
        let q = qs.stringify(s2);

        let path = q !== '' ? this.props.router.path + '?' + q : this.props.router.path;

        this.resetTimeout();
        this.timeout = window.setTimeout(() => { this.props.router.replace(path); }, 20);
    }

    render() {
        return (
            <input
                className={this.props.className}
                type="text"
                placeholder={this.props.placeholder}
                value={this.state.value}
                onChange={this.handleChange}
            />
        );
    }

    componentWillUnmount() {
        this.resetTimeout();
    }
}

export const XFilterInput = withRouter<{ searchKey: string, placeholder?: string, className?: string }>(XFilterInputField);