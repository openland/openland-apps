import { NavigationPage } from '../NavigationPage';
import { HeaderCoordinator } from './HeaderCoordinator';
import { SAnimatedShadowView } from '../../SAnimatedShadowView';
import { SAnimated } from '../../SAnimated';
import { SDevice } from '../../SDevice';

export class HeaderTitleViewCoordinator {
    readonly key: string;
    readonly page: NavigationPage;
    readonly coordinator: HeaderCoordinator;

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

    private searchVisible: boolean = false;

    private titleVisible: boolean = true;
    private isInScrollHandler: boolean = false;

    constructor(page: NavigationPage, coordinator: HeaderCoordinator) {
        this.key = page.key;
        this.page = page;
        this.coordinator = coordinator;
        let w = coordinator.size.width;
        this.headerView = new SAnimatedShadowView('header--' + this.key, { translateX: w / 2, opacity: 1 });
        this.headerSmallView = new SAnimatedShadowView('header-small--' + this.key, { opacity: 0 });
        this.titleView = new SAnimatedShadowView('header-title--' + this.key, { opacity: 0, translateX: w });
        this.rightView = new SAnimatedShadowView('header-right--' + this.key, { opacity: 0, translateX: w });
        this.leftView = new SAnimatedShadowView('header-left--' + this.key, { opacity: 0, translateX: w });
        this.titleLargeView = new SAnimatedShadowView('header-large--' + this.key, { opacity: 0, translateX: w });
        this.searchView = new SAnimatedShadowView('header-search--' + this.key);
        this.searchViewContainer = new SAnimatedShadowView('header-search-container--' + this.key, { translateX: w });
        this.searchInputBackgroundView = new SAnimatedShadowView('header-search-input--' + this.key);
        this.searchCancelView = new SAnimatedShadowView('header-search-button--' + this.key);
    }

    updateSmallTitleState = (smallVisible: boolean) => {

        if (smallVisible) {
            if (SAnimated.isInAnimatedTransaction || !this.isInScrollHandler) {
                this.titleVisible = smallVisible;
                this.titleView.opacity = 1;
                this.titleLargeView.opacity = 0;
            } else {
                if (this.titleVisible === smallVisible) {
                    return;
                }
                this.titleVisible = smallVisible;
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
                this.titleVisible = smallVisible;
            } else {
                if (this.titleVisible === smallVisible) {
                    return;
                }
                this.titleVisible = smallVisible;
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

        if (this.page.config.headerHidden) {
            this.headerView.opacity = 0;
        } else {
            this.headerView.opacity = 1;
        }
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
        let isInSearch = this.page.config.search && this.page.config.searchActive;

        if (this.page.config.appearance === 'large' || this.page.config.appearance === undefined) {

            if (progress > 0) {
                this.titleLargeView.translateX = (progress) * this.coordinator.size.width;
            } else {
                this.titleLargeView.translateX = 0;
            }
            this.titleLargeView.opacity = opacityDelayedClamped;

            // Content Offset
            // Positive for overscroll
            let contentOffset = this.page.config.contentOffset ? this.page.config.contentOffset.offsetValue : 0;

            //
            // Large title offset
            //
            let titleOffset = -contentOffset;
            if (this.page.config.search) {
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
            if (this.page.config.search) {
                if (this.page.config.searchActive) {
                    this.searchView.translateY = 0;
                    this.searchViewContainer.translateY = 0;
                    this.searchViewContainer.translateX = 0;
                } else {
                    this.searchView.translateY = -contentOffset;
                    this.searchViewContainer.translateY = - Math.abs(progress) * 22;
                    if (progress > 0) {
                        this.searchViewContainer.translateX = (progress) * this.coordinator.size.width;
                    } else {
                        this.searchViewContainer.translateX = 0;
                    }
                }
                this.searchView.opacity = opacityDelayedDoubleClamped;
            }

            // Search
            if (this.page.config.search) {
                if (this.page.config.searchActive) {
                    if (!this.searchVisible) {
                        this.searchVisible = true;
                    }
                    this.headerView.translateY = -(SDevice.navigationBarHeightExpanded - SDevice.navigationBarHeight + 44);
                    if (this.page.config.searchUnderlay) {
                        this.page.config.searchUnderlay!!.translateY = -96;
                    }
                    this.searchInputBackgroundView.iosWidth = -70;
                    this.searchInputBackgroundView.translateX = -35;
                    this.searchCancelView.translateX = 0;
                    this.titleVisible = true;
                    this.titleLargeView.opacity = 0;
                    this.titleView.opacity = 0;
                    this.page.config.searchContainer!.opacity = 1;
                } else {
                    if (this.searchVisible) {
                        this.searchVisible = false;
                        let clb = this.page.config.searchClosingCompleted;
                        SAnimated.addTransactionCallback(() => {
                            if (clb) {
                                clb();
                            }
                        });
                    }
                    this.searchInputBackgroundView.iosWidth = 0;
                    this.searchInputBackgroundView.translateX = 0;
                    this.searchCancelView.translateX = 70;
                    if (this.page.config.searchUnderlay) {
                        this.page.config.searchUnderlay!!.translateY = 0;
                    }
                    this.headerView.translateY = 0;
                    this.titleLargeView.opacity = 1;
                    this.page.config.searchContainer!.opacity = 0;

                    // Show/hide scroll depending if large title is visible
                    this.updateSmallTitleState(titleOffset < -(SDevice.navigationBarHeightExpanded - SDevice.navigationBarHeight - 12));
                }

            } else {
                this.titleLargeView.opacity = 1;
                this.updateSmallTitleState(titleOffset < -(SDevice.navigationBarHeightExpanded - SDevice.navigationBarHeight - 12));
                if (this.page.config.searchUnderlay) {
                    this.page.config.searchUnderlay!!.translateY = 0;
                }
                this.headerView.translateY = 0;
            }
            this.titleLargeView.opacity *= opacityDelayed;
        } else if (this.page.config.appearance === 'small-hidden') {
            let offset = this.page.config.contentOffset ? this.page.config.contentOffset.offsetValue : 0;
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