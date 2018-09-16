import { NavigationPage } from '../NavigationPage';
import { HeaderCoordinator } from './HeaderCoordinator';
import { SAnimatedShadowView } from '../../SAnimatedShadowView';
import { HeaderConfig } from '../HeaderConfig';
import { SAnimated } from '../../SAnimated';

export class HeaderTitleViewCoordinator {
    readonly key: string;
    readonly page: NavigationPage;
    readonly coordinator: HeaderCoordinator;
    private headerView: SAnimatedShadowView;
    private lastConfig: HeaderConfig;

    constructor(page: NavigationPage, coordinator: HeaderCoordinator) {
        this.key = page.key;
        this.page = page;
        this.coordinator = coordinator;
        this.headerView = new SAnimatedShadowView('header--' + this.key);

        this.lastConfig = this.page.config;
        let isStarting = true;
        this.page.watchConfig((cfg) => {
            if (isStarting) {
                return;
            }
            if (!this.coordinator.isInTransition && this.coordinator.state!!.history[this.coordinator.state!!.history.length - 1].key === page.key) {
                SAnimated.beginTransaction();
                SAnimated.setPropertyAnimator((name, prop, from, to) => {
                    SAnimated.spring(name, {
                        property: prop,
                        from: from,
                        to: to
                    });
                });
                this.coordinator._updateState(this.coordinator.state!!, 0);
                SAnimated.commitTransaction();
            }
        });
        isStarting = false;
    }

    updateState = (progress: number) => {
        this.headerView.opacity = 1.5 - Math.abs(progress) * 2; // Meet in the center
        // Do nothing
    }
}