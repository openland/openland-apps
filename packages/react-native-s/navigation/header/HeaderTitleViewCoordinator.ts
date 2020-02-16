import { NavigationPage } from '../NavigationPage';
import { HeaderCoordinator } from './HeaderCoordinator';
import { SAnimatedShadowView } from 'react-native-fast-animations';

export class HeaderTitleViewCoordinator {
    readonly key: string;
    readonly page: NavigationPage;
    readonly coordinator: HeaderCoordinator;
    private headerView: SAnimatedShadowView;

    constructor(page: NavigationPage, coordinator: HeaderCoordinator) {
        this.key = page.key;
        this.page = page;
        this.coordinator = coordinator;
        this.headerView = new SAnimatedShadowView('header--' + this.key, { opacity: 0 });
    }

    updateState = (progress: number) => {
        this.headerView.opacity = 1.5 - Math.abs(progress) * 2; // Meet in the center
        // Do nothing
    }
}