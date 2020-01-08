import { AlertBlanketApi, AlertBlanketBuilderApi } from 'openland-y-runtime-api/AppAlertBlanketApi';

export class AlertBlanketStub implements AlertBlanketApi {
    builder(): AlertBlanketBuilderApi {
        throw new Error("Method not implemented.");
    }
    alert(message: string) {
        throw new Error("Method not implemented.");
    }

}
export const AppAlertBlanket = new AlertBlanketStub();
