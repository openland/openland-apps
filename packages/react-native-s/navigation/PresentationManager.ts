import { NavigationManager } from './NavigationManager';

export class PresentationManager {
    readonly parentManager: NavigationManager;
    private isPresented = false;
    private readonly onPresented: (manager: NavigationManager) => void;
    private readonly onDismissed: () => void;

    constructor(manager: NavigationManager, onPresented: (manager: NavigationManager) => void, onDismissed: () => void) {
        this.parentManager = manager;
        this.onPresented = onPresented;
        this.onDismissed = onDismissed;
        manager.setPresentationManager(this);
    }

    present = (route: string, params?: any) => {
        if (!this.isPresented) {
            this.isPresented = true;
            this.onPresented(new NavigationManager(this.parentManager.routes, route, params, this.parentManager));
        }
    }

    dismiss = () => {
        if (this.isPresented) {
            this.isPresented = false;
            this.onDismissed();
        }
    }
}