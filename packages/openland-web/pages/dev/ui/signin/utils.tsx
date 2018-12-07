import * as React from 'react';
import { XCheckbox } from 'openland-x/XCheckbox';
import { XSelect } from 'openland-x/XSelect';
import { XInput } from 'openland-x/XInput';
import persist from 'react-localstorage-hoc';
import * as lodash from 'lodash';

const getDefaultStateFromBranchSchema = (schema: any) => {
    return lodash.fromPairs(
        lodash.toPairs(schema).map(([key, value]) => {
            return [key, (value as any).default];
        }),
    );
};

const getDefaultStateFromSchema = (schema: any) => {
    return lodash.fromPairs(
        lodash.toPairs(schema).map(([key, value]) => {
            return [key, getDefaultStateFromBranchSchema(value as any)];
        }),
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
                    this.state = {
                        branch: 'root',
                        branchesStates: getDefaultStateFromSchema(schema),
                    };
                } else {
                    const initialBranch = Object.keys(schema)[0];
                    this.state = {
                        branch: initialBranch,
                        branchesStates: getDefaultStateFromSchema(schema),
                    };
                }
            }

            getBranchState = () => {
                return this.state.branchesStates[this.state.branch];
            };

            getBranchValueState = (key: any) => {
                return this.getBranchState()[key];
            };

            setBranchState = (key: any, value: any) => {
                const newState = {
                    ...this.state,
                    branchesStates: {
                        ...this.state.branchesStates,
                        [this.state.branch]: {
                            ...this.getBranchState(),
                            [key]: value,
                        },
                    },
                };

                this.setState(newState);
            };

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
                                <br />
                            </div>
                        )}
                        {lodash.toPairs(branchSchema).map(([key, myValue]) => {
                            const anyValue = myValue as any;

                            if (anyValue.type === 'select') {
                                return (
                                    <div
                                        style={
                                            anyValue.hide
                                                ? { display: 'none' }
                                                : {}
                                        }
                                    >
                                        <XSelect
                                            value={this.getBranchValueState(
                                                key,
                                            )}
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

                                                this.setBranchState(key, value);
                                            }}
                                        />
                                    </div>
                                );
                            }
                            if (anyValue.type === 'checkbox') {
                                return (
                                    <div
                                        style={
                                            anyValue.hide
                                                ? { display: 'none' }
                                                : {}
                                        }
                                    >
                                        <XCheckbox
                                            label={key}
                                            switcher={true}
                                            checked={this.getBranchValueState(
                                                key,
                                            )}
                                            onChange={({ checked }) => {
                                                this.setBranchState(
                                                    key,
                                                    checked,
                                                );
                                            }}
                                        />
                                    </div>
                                );
                            }

                            if (anyValue.type === 'input') {
                                console.log(anyValue);
                                return (
                                    <div
                                        style={
                                            anyValue.hide
                                                ? { display: 'none' }
                                                : {}
                                        }
                                    >
                                        <XInput
                                            size="large"
                                            title={key}
                                            value={this.getBranchValueState(
                                                key,
                                            )}
                                            onChange={value =>
                                                this.setBranchState(key, value)
                                            }
                                        />
                                    </div>
                                );
                            }
                            return null;
                        })}
                        {this.props.children({
                            branch: this.state.branch,
                            ...this.getBranchState(),
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
