import { NavigationManager } from './NavigationManager';

export class PresentationManager {
    readonly parentManager: NavigationManager;

    constructor(manager: NavigationManager, onPresented: (manager: NavigationManager) => void, onDismissed: () => void) {
        this.parentManager = manager;
        manager.setPresentationManager(this);
    }

    present = (route: string, params?: any) => {
        //
    }
}