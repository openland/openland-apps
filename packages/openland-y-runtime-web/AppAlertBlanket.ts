import { AlertBlanketApi, AlertBlanketBuilderApi } from 'openland-y-runtime-api/AppAlertBlanketApi';
import AlertBlanket, { AlertBlanketBuilder } from 'openland-x/AlertBlanket';
class WebAlertBlanketBuilder implements AlertBlanketBuilderApi {
    cancelDefaultAction(cancelable: boolean): AlertBlanketBuilderApi {
        this.builder.cancelDefaultAction(cancelable);
        return this;
    }
    builder = new AlertBlanketBuilder();
    title(title: string): AlertBlanketBuilderApi {
        this.builder.title(title);
        return this;
    }
    cancelable(cancelable: boolean): AlertBlanketBuilderApi {
        this.builder.cancelable(cancelable);
        return this;
    }
    message(message: string): AlertBlanketBuilderApi {
        this.builder.message(message);
        return this;
    }
    action(name: string, style?: "destructive" | "cancel" | "default" | undefined, action?: (() => void) | undefined): AlertBlanketBuilderApi {
        this.builder.action(name, () => {
            return new Promise(async (resolve) => {
                if (action) {
                    await action();
                }
                resolve();
            });
        }, style === 'destructive' ? 'danger' : style === 'cancel' ? 'secondary' : 'primary');
        return this;
    }
    onCancel(onCancel: () => void): AlertBlanketBuilderApi {
        this.builder.onCancel(onCancel);
        return this;
    }
    show(): void {
        this.builder.show();
    }

}
export class WebAlertBlanket implements AlertBlanketApi {
    builder(): AlertBlanketBuilderApi {
        return new WebAlertBlanketBuilder();
    }
    alert(message: string) {
        AlertBlanket.alert(message);
    }

}
export const AppAlertBlanket = new WebAlertBlanket();
