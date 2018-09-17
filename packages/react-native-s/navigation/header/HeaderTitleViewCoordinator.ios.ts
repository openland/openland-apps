import { NavigationPage } from '../NavigationPage';
import { HeaderCoordinator } from './HeaderCoordinator';
import { HeaderConfig } from '../HeaderConfig';
import { SAnimatedShadowView } from '../../SAnimatedShadowView';
import { STrackedValue } from '../../STrackedValue';
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
    private containerView: SAnimatedShadowView;
    private titleView: SAnimatedShadowView;
    private titleLargeView: SAnimatedShadowView;
    private searchView: SAnimatedShadowView;
    private searchInputBackgroundView: SAnimatedShadowView;
    private searchCancelView: SAnimatedShadowView;

    private subscribedValue?: STrackedValue;
    private subscription?: string;
    private searchVisible: boolean = false;

    constructor(page: NavigationPage, coordinator: HeaderCoordinator) {
        this.key = page.key;
        this.page = page;
        this.coordinator = coordinator;
        this.headerView = new SAnimatedShadowView('header--' + this.key);
        this.containerView = new SAnimatedShadowView('header-small--' + this.key);
        this.titleView = new SAnimatedShadowView('header-title--' + this.key);
        this.titleLargeView = new SAnimatedShadowView('header-large--' + this.key);
        this.searchView = new SAnimatedShadowView('header-search--' + this.key);
        this.searchInputBackgroundView = new SAnimatedShadowView('header-search-input--' + this.key);
        this.searchCancelView = new SAnimatedShadowView('header-search-button--' + this.key);

        this.lastConfig = this.page.config;
        this.page.watchConfig((cfg, animated) => {
            this.handleState(cfg, animated !== undefined ? animated : true, false);
        });
        this.handleState(this.page.config, false, true);
    }

    private handleState = (config: HeaderConfig, animated: boolean, initial: boolean) => {
        let isInitial = initial;
        this.lastConfig = config;
        if (this.lastConfig.contentOffset !== this.subscribedValue) {
            if (this.subscribedValue) {
                this.subscribedValue.offset.removeListener(this.subscription!);
                this.subscribedValue = undefined;
            }
            if (this.lastConfig.contentOffset) {
                this.subscribedValue = this.lastConfig.contentOffset;
                this.subscription = this.lastConfig.contentOffset.offset.addListener((v) => {
                    if (isInitial) {
                        return;
                    }
                    if (!this.coordinator.isInTransition && this.coordinator.state!!.history[this.coordinator.state!!.history.length - 1].key === this.page.key) {
                        SAnimated.beginTransaction();
                        this.coordinator._updateState(this.coordinator.state!!, 0);
                        SAnimated.commitTransaction();
                    }
                });
            }
        }
        if (isInitial) {
            isInitial = false;
            return;
        }
        if (!this.coordinator.isInTransition && this.coordinator.state!!.history[this.coordinator.state!!.history.length - 1].key === this.page.key) {
            SAnimated.beginTransaction();
            if (animated) {
                SAnimated.setPropertyAnimator((name, prop, from, to) => {
                    SAnimated.spring(name, {
                        property: prop,
                        from: from,
                        to: to
                    });
                });
            }
            this.coordinator._updateState(this.coordinator.state!!, 0);
            SAnimated.commitTransaction();
        }
    }

    updateState = (progress: number) => {
        this.headerView.opacity = 2 - Math.abs(progress) * 4;
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

            // Random hotfix
            this.titleLargeView.opacity++;
            this.titleLargeView.opacity--;

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
                    if (!this.searchVisible) {
                        this.searchVisible = true;
                    }
                    this.headerView.translateY = -(SDevice.navigationBarHeightExpanded - SDevice.navigationBarHeight + 44);
                    if (this.lastConfig.searchUnderlay) {
                        this.lastConfig.searchUnderlay!!.translateY = -96;
                    }
                    this.searchInputBackgroundView.iosWidth = -70;
                    this.searchInputBackgroundView.translateX = -35;
                    this.searchCancelView.translateX = 0;
                    this.titleLargeView.opacity = 0;
                    this.lastConfig.searchContainer!.opacity = 1;
                } else {
                    if (this.searchVisible) {
                        this.searchVisible = false;
                        let clb = this.lastConfig.searchClosingCompleted;
                        SAnimated.addTransactionCallback(() => {
                            if (clb) {
                                clb();
                            }
                        });
                    }
                    this.searchInputBackgroundView.iosWidth = 0;
                    this.searchInputBackgroundView.translateX = 0;
                    this.searchCancelView.translateX = 70;
                    if (this.lastConfig.searchUnderlay) {
                        this.lastConfig.searchUnderlay!!.translateY = 0;
                    }
                    this.headerView.translateY = 0;
                    this.titleLargeView.opacity = 1;
                    this.lastConfig.searchContainer!.opacity = 0;
                }
            } else {
                this.titleLargeView.opacity = 1;
                if (this.lastConfig.searchUnderlay) {
                    this.lastConfig.searchUnderlay!!.translateY = 0;
                }
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