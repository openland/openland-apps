import { NavigationPage } from '../NavigationPage';
import { HeaderCoordinator } from './HeaderCoordinator';
import { HeaderConfig } from '../HeaderConfig';
import { SAnimatedShadowView } from '../../SAnimatedShadowView';
import { STrackedValue } from '../../STrackedValue';
import { SAnimated } from '../../SAnimated';
import { SDevice } from '../../SDevice';
import { Dimensions } from 'react-native';

export class HeaderTitleViewCoordinator {
    readonly key: string;
    readonly page: NavigationPage;
    readonly coordinator: HeaderCoordinator;
    private lastConfig: HeaderConfig;

    private headerSmallView: SAnimatedShadowView;
    private headerView: SAnimatedShadowView;
    private titleView: SAnimatedShadowView;
    private rightView: SAnimatedShadowView;
    private leftView: SAnimatedShadowView;
    private titleLargeView: SAnimatedShadowView;
    private searchView: SAnimatedShadowView;
    private searchViewContainer: SAnimatedShadowView;
    private searchInputBackgroundView: SAnimatedShadowView;
    private searchCancelView: SAnimatedShadowView;

    private subscribedValue?: STrackedValue;
    private subscription?: string;
    private searchVisible: boolean = false;

    private titleVisible: boolean = true;
    private isInScrollHandler: boolean = false;

    constructor(page: NavigationPage, coordinator: HeaderCoordinator) {
        this.key = page.key;
        this.page = page;
        this.coordinator = coordinator;
        let w = coordinator.size.width;
        this.headerView = new SAnimatedShadowView('header--' + this.key, { translateX: w / 2 });
        this.headerSmallView = new SAnimatedShadowView('header-small--' + this.key, { opacity: 0 });
        this.titleView = new SAnimatedShadowView('header-title--' + this.key, { opacity: 0, translateX: w });
        this.rightView = new SAnimatedShadowView('header-right--' + this.key, { opacity: 0, translateX: w });
        this.leftView = new SAnimatedShadowView('header-left--' + this.key, { opacity: 0, translateX: w });
        this.titleLargeView = new SAnimatedShadowView('header-large--' + this.key, { opacity: 0, translateX: w });
        this.searchView = new SAnimatedShadowView('header-search--' + this.key);
        this.searchViewContainer = new SAnimatedShadowView('header-search-container--' + this.key);
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
                        this.isInScrollHandler = true;
                        SAnimated.beginTransaction();
                        this.coordinator._updateState(this.coordinator.state!!, 0);
                        SAnimated.commitTransaction();
                        this.isInScrollHandler = false;
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

    updateSmallTitleState = (smallVisible: boolean) => {
        if (this.titleVisible === smallVisible) {
            return;
        }
        this.titleVisible = smallVisible;

        if (smallVisible) {
            if (SAnimated.isInAnimatedTransaction || !this.isInScrollHandler) {
                this.titleView.opacity = 1;
                this.titleLargeView.opacity = 0;
            } else {
                setTimeout(() => {
                    SAnimated.beginTransaction();
                    SAnimated.setPropertyAnimator((name, prop, from, to) => {
                        SAnimated.timing(name, {
                            property: prop,
                            from: from,
                            to: to,
                            duration: 0.2
                        });
                    });
                    this.titleView.opacity = 1;
                    this.titleLargeView.opacity = 0;
                    SAnimated.commitTransaction();
                });
            }
        } else {
            if (SAnimated.isInAnimatedTransaction || !this.isInScrollHandler) {
                this.titleView.opacity = 0;
                this.titleLargeView.opacity = 1;
            } else {
                setTimeout(() => {
                    SAnimated.beginTransaction();
                    SAnimated.setPropertyAnimator((name, prop, from, to) => {
                        SAnimated.timing(name, {
                            property: prop,
                            from: from,
                            to: to,
                            duration: 0.2
                        });
                    });
                    this.titleView.opacity = 0;
                    this.titleLargeView.opacity = 1;
                    SAnimated.commitTransaction();
                });
            }
        }
    }

    updateState = (progress: number) => {
        //
        // 1  0.75   0.5  0.25  0
        // -3    -2     -1    0   1
        //
        // 1 0.66 0.33 0
        // -2    -1    0  1

        let opacityLinear = (1 - Math.abs(progress));
        let opacitySimple = (1 - Math.abs(progress)) * (1 - Math.abs(progress));
        let opacityDelayed = (1 - Math.abs(progress) * 2);
        let opacityDelayedDouble = (1 - Math.abs(progress) * 4);
        let opacityDelayedClamped = opacityDelayed;
        let opacityDelayedDoubleClamped = opacityDelayed;
        if (opacityDelayedDoubleClamped < 0) {
            opacityDelayedDoubleClamped = 0;
        }
        if (opacityDelayedDoubleClamped > 1) {
            opacityDelayedDoubleClamped = 1;
        }
        if (opacityDelayedClamped < 0) {
            opacityDelayedClamped = 0;
        }
        if (opacityDelayedClamped > 1) {
            opacityDelayedClamped = 1;
        }
        // if (progress > 0.5) {
        //     progress = 0;
        // }
        let isInSearch = this.lastConfig.search && this.lastConfig.searchActive;

        if (this.lastConfig.appearance === 'large' || this.lastConfig.appearance === undefined) {

            if (progress > 0) {
                this.titleLargeView.translateX = (progress) * this.coordinator.size.width;
            } else {
                this.titleLargeView.translateX = 0;
            }
            this.titleLargeView.opacity = opacityDelayedClamped;

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
            // this.titleLargeView.opacity++;
            // this.titleLargeView.opacity--;

            //
            // Search field
            //
            if (this.lastConfig.search) {
                if (this.lastConfig.searchActive) {
                    this.searchView.translateY = 0;
                    this.searchViewContainer.translateY = 0;
                } else {
                    this.searchView.translateY = -contentOffset;
                    this.searchViewContainer.translateY = - Math.abs(progress) * 44;
                }
                this.searchView.opacity = opacityDelayedDoubleClamped;
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
                    this.titleVisible = true;
                    this.titleLargeView.opacity = 0;
                    this.titleView.opacity = 0;
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
                    // this.titleLargeView.opacity = 1;
                    this.lastConfig.searchContainer!.opacity = 0;

                    // Show/hide scroll depending if large title is visible
                    this.updateSmallTitleState(titleOffset < -(SDevice.navigationBarHeightExpanded - SDevice.navigationBarHeight - 12));
                }

            } else {
                // this.titleLargeView.opacity = 1;
                this.updateSmallTitleState(titleOffset < -(SDevice.navigationBarHeightExpanded - SDevice.navigationBarHeight - 12));
                if (this.lastConfig.searchUnderlay) {
                    this.lastConfig.searchUnderlay!!.translateY = 0;
                }
                this.headerView.translateY = 0;
            }
        } else if (this.lastConfig.appearance === 'small-hidden') {
            let offset = this.lastConfig.contentOffset ? this.lastConfig.contentOffset.offsetValue : 0;
            if (offset > SDevice.navigationBarHeight) {
                this.titleView.opacity = 1;
                this.titleVisible = true;
            } else {
                this.titleView.opacity = 0;
                this.titleVisible = false;
            }
        } else {
            this.titleVisible = true;
            this.titleView.opacity = 1;
        }

        // Small header
        this.titleView.opacity *= opacityDelayed; // -1 + (1 - Math.abs(progress)) * (1 - Math.abs(progress)) * 2;
        this.rightView.opacity = opacitySimple;
        if (this.page.startIndex === 0) {
            this.leftView.opacity = 0;
        } else {
            if (isInSearch) {
                this.leftView.opacity = 0;
            } else {
                this.leftView.opacity = opacityLinear * 1.5;
            }
        }
        
        // Titles
        if (isInSearch) {
            this.headerSmallView.translateX = (progress) * this.coordinator.size.width;
            this.titleView.translateX = 0;
        } else {
            this.headerSmallView.translateX = 0;
            this.titleView.translateX = (progress) * this.coordinator.size.width / 2;
        }
    }

}