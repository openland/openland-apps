import { AlertBlanketApi, AlertBlanketBuilderApi } from 'openland-y-runtime-api/AppAlertBlanketApi';
import AlertBlanket, { AlertBlanketBuilder } from 'openland-mobile/components/AlertBlanket';

export class NativeAlertBlanketStub implements AlertBlanketApi {
    builder(): AlertBlanketBuilderApi {
        return new AlertBlanketBuilder();
    }
    alert(message: string) {
        AlertBlanket.alert(message);
    }

}
export const AppAlertBlanket = new NativeAlertBlanketStub();
