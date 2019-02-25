import * as React from 'react';
import { XFormContext } from './XFormContext';

export class XFormField2 extends React.Component<
    {
        children: Function;
        field: string;
        className?: string;
    },
    {
        blurredOnce: boolean;
    }
> {
    constructor(props: any) {
        super(props);
        this.state = {
            blurredOnce: false,
        };
    }

    render() {
        const props = this.props;
        return (
            <XFormContext.Consumer>
                {form => {
                    if (!form) {
                        throw Error('Unable to find form!');
                    }

                    const errors = form.validated.filter(
                        ([fieldName]: any) => fieldName === props.field,
                    );

                    const isValid =
                        errors.filter(([first, second]: any) => second.length).length === 0;

                    const isTouched = form.touched.indexOf(props.field) !== -1;

                    const showError =
                        isTouched && !isValid && (this.state.blurredOnce || form.submited);

                    const childrenAny = props.children as any;
                    return (
                        <div
                            className={props.className}
                            onBlur={() =>
                                this.setState({
                                    blurredOnce: true,
                                })
                            }
                        >
                            {childrenAny({ isValid, isTouched, showError })}
                        </div>
                    );
                }}
            </XFormContext.Consumer>
        );
    }
}
