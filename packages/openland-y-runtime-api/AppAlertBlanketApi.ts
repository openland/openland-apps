export type BlanketButtonsStyle = 'destructive' | 'cancel' | 'default';

export interface AlertBlanketBuilderApi {
    title(title: string): AlertBlanketBuilderApi;
    cancelable(cancelable: boolean): AlertBlanketBuilderApi;
    cancelDefaultAction(cancelable: boolean): AlertBlanketBuilderApi;
    message(message: string): AlertBlanketBuilderApi;
    action(name: string, style?: BlanketButtonsStyle, action?: (() => void) | undefined): AlertBlanketBuilderApi;
    onCancel(onCancel: () => void): AlertBlanketBuilderApi;
    show(): void;
}

export interface AlertBlanketApi {
    alert(message: string): void;
    builder(): AlertBlanketBuilderApi;
}