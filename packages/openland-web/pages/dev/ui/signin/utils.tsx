import * as React from 'react';
import { XCheckbox } from 'openland-x/XCheckbox';
import { XSelect } from 'openland-x/XSelect';
import { XInput } from 'openland-x/XInput';
import persist from 'react-localstorage-hoc';
import * as lodash from 'lodash';

const getDefaultStateFromSchema = (schema: any) => {
    return lodash.fromPairs(
        lodash
            .toPairs(schema)
            .map(([key, value]) => [key, (value as any).default]),
    );
};
export const CreateWrapIntoState = (schema: any) => {
    return persist(
        class WrapIntoStateInner extends React.Component<
            {
                children: any;
            },
            any
        > {
            constructor(props: any) {
                super(props);

                if (!!schema.root) {
                    const branchSchema = schema.root;
                    this.state = getDefaultStateFromSchema(branchSchema);
                } else {
                    const initialBranch = Object.keys(schema)[0];
                    this.state = {
                        branch: initialBranch,
                        ...getDefaultStateFromSchema(schema[initialBranch]),
                    };
                }
            }

            render() {
                let branchSchema;
                if (!!schema.root) {
                    branchSchema = schema.root;
                } else {
                    branchSchema = schema[this.state.branch];
                }

                return (
                    <div>
                        {!schema.root && (
                            <div>
                                branch:
                                <XSelect
                                    value={this.state.branch}
                                    options={Object.keys(schema).map(
                                        (item: any) => ({
                                            value: item,
                                            label: item,
                                        }),
                                    )}
                                    onChange={(val: any) => {
                                        const value = val ? val.value : null;
                                        this.setState({
                                            branch: value,
                                        });
                                    }}
                                />
                                <br/>
                            </div>
                        )}
                        {lodash.toPairs(branchSchema).map(([key, myValue]) => {
                            const anyValue = myValue as any;

                            if (anyValue.type === 'select') {
                                return (
                                    <XSelect
                                        value={this.state[key]}
                                        options={anyValue.value.map(
                                            (item: any) => ({
                                                value: item,
                                                label: item,
                                            }),
                                        )}
                                        onChange={(val: any) => {
                                            const value = val
                                                ? val.value
                                                : null;
                                            this.setState({
                                                [key]: value,
                                            });
                                        }}
                                    />
                                );
                            }
                            if (anyValue.type === 'checkbox') {
                                return (
                                    <XCheckbox
                                        label={key}
                                        switcher={true}
                                        checked={this.state[key]}
                                        onChange={({ checked }) => {
                                            this.setState({
                                                [key]: checked,
                                            });
                                        }}
                                    />
                                );
                            }

                            if (anyValue.type === 'input') {
                                return (
                                    <XInput
                                        size="large"
                                        title={key}
                                        value={this.state[key]}
                                        onChange={value =>
                                            this.setState({
                                                [key]: value,
                                            })
                                        }
                                    />
                                );
                            }
                            return null;
                        })}
                        {this.props.children({
                            ...this.state,
                            ...lodash.fromPairs(
                                lodash
                                    .toPairs(schema)
                                    .filter(([key, value]) => {
                                        return value === 'callback';
                                    })
                                    .map(([key, value]) => {
                                        const fnValue = value as any;
                                        const finalValue = (cbValue: any) => {
                                            fnValue({
                                                value: cbValue,
                                                context: this,
                                            });
                                        };
                                        return [key, finalValue];
                                    }),
                            ),
                        })}
                    </div>
                );
            }
        },
    );
};
