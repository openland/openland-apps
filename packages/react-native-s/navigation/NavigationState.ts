import { NavigationPage } from './NavigationPage';

export class NavigationState {
    readonly history: NavigationPage[];
    constructor(history: NavigationPage[]) {
        this.history = [...history];
    }
}