import { NavigationPage } from '../NavigationPage';
import { HeaderCoordinator } from './HeaderCoordinator';
import { HeaderConfig } from '../HeaderConfig';
import { SAnimatedShadowView } from '../../SAnimatedShadowView';
import { STrackedValue } from '../../STrackedValue';
import { AnimatedViewKeys } from '../AnimatedViewKeys';
import { SAnimated } from '../../SAnimated';
import { SDevice } from '../../SDevice';
import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export class HeaderTitleViewCoordinator {
    readonly key: string;
    readonly page: NavigationPage;
    readonly coordinator: HeaderCoordinator;
    private lastConfig: HeaderConfig;

    private headerView: SAnimatedShadowView;
    private titleView: SAnimatedShadowView;
    private titleLargeView: SAnimatedShadowView;
    private searchView: SAnimatedShadowView;
    private searchInputBackgroundView: SAnimatedShadowView;
    private searchCancelView: SAnimatedShadowView;
    private pageView: SAnimatedShadowView;

    private subscribedValue?: STrackedValue;
    private subscription?: string;

    constructor(page: NavigationPage, coordinator: HeaderCoordinator) {
        this.key = page.key;
        this.page = page;
        this.coordinator = coordinator;
        this.headerView = new SAnimatedShadowView('header--' + this.key);
        this.titleView = new SAnimatedShadowView('header-small--' + this.key);
        this.titleLargeView = new SAnimatedShadowView('header-large--' + this.key);
        this.pageView = new SAnimatedShadowView(AnimatedViewKeys.page(this.key));
        this.searchView = new SAnimatedShadowView('header-search--' + this.key);
        this.searchInputBackgroundView = new SAnimatedShadowView('header-search-input--' + this.key);
        this.searchCancelView = new SAnimatedShadowView('header-search-button--' + this.key);

        this.lastConfig = this.page.config.getState()!!;
        let isStarting = true;
        this.page.config.watch((cfg) => {
            this.lastConfig = cfg;
            if (this.lastConfig.contentOffset !== this.subscribedValue) {
                if (this.subscribedValue) {
                    this.subscribedValue.offset.removeListener(this.subscription!);
                    this.subscribedValue = undefined;
                }
                if (this.lastConfig.contentOffset) {
                    this.subscribedValue = this.lastConfig.contentOffset;
                    this.subscription = this.lastConfig.contentOffset.offset.addListener((v) => {
                        if (isStarting) {
                            return;
                        }
                        if (!this.coordinator.isInTransition && this.coordinator.state!!.history[this.coordinator.state!!.history.length - 1].key === page.key) {
                            SAnimated.beginTransaction();
                            this.coordinator._updateState(this.coordinator.state!!, 0);
                            SAnimated.commitTransaction();
                        }
                    });
                }
            }
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
        this.headerView.translateX = (progress) * SCREEN_WIDTH / 2;

        if (this.lastConfig.appearance === 'large' || this.lastConfig.appearance === undefined) {
            // Content Offset
            // Positive for overscroll
            let contentOffset = this.lastConfig.contentOffset ? this.lastConfig.contentOffset.offsetValue : 0;

            //
            // Large title offset
            //
            let titleOffset = -contentOffset;
            if (this.lastConfig.search) {
                if (contentOffset < 0) {
                    // Do nothing on overscroll
                } else {
                    if (contentOffset < 44) {
                        titleOffset = 0;
                    } else {
                        titleOffset += 44;
                    }
                }
            }
            this.titleLargeView.translateY = titleOffset;

            //
            // Search field
            //
            if (this.lastConfig.search) {
                this.searchView.translateY = -contentOffset - Math.abs(progress) * 44;
            }

            // Show/hide scroll depending if large title is visible
            if (titleOffset < -(SDevice.navigationBarHeightExpanded - SDevice.navigationBarHeight - 12)) {
                this.titleView.opacity = 1;
            } else {
                this.titleView.opacity = 0;
            }

            // Search
            if (this.lastConfig.search) {
                if (this.lastConfig.searchActive) {
                    this.headerView.translateY = -(SDevice.navigationBarHeightExpanded - SDevice.navigationBarHeight + 44);
                    this.pageView.translateY = -96;
                    this.searchInputBackgroundView.iosWidth = -70;
                    this.searchInputBackgroundView.translateX = -35;
                    this.searchCancelView.translateX = 0;
                    this.titleLargeView.opacity = 0;
                } else {
                    this.searchInputBackgroundView.iosWidth = 0;
                    this.searchInputBackgroundView.translateX = 0;
                    this.searchCancelView.translateX = 70;
                    this.pageView.translateY = 0;
                    this.headerView.translateY = 0;
                    this.titleLargeView.opacity = 1;
                }
            } else {
                this.pageView.translateY = 0;
                this.headerView.translateY = 0;
            }
        } else if (this.lastConfig.appearance === 'small-hidden') {
            let offset = this.lastConfig.contentOffset ? this.lastConfig.contentOffset.offsetValue : 0;
            if (offset > SDevice.navigationBarHeight) {
                this.titleView.opacity = 1;
            } else {
                this.titleView.opacity = 0;
            }
        } else {
            this.titleView.opacity = 1;
        }
    }
}