import Router from 'next/router';

class UTransitionManagerImpl {

    onBackPressed?: () => void;

    isPushing = false;
    isFakePopping = false;
    topId = 1;
    currentId = 1;
    constructor() {
        if (typeof window !== 'undefined') {
            if (window.history.state && window.history.state.options) {
                let index = window.history.state.options['unicorn-id'];
                if (typeof index === 'number') {
                    this.topId = Math.max(index, this.topId);
                    this.currentId = index;
                }
            }
            Router.events.on('routeChangeComplete', () => {
                let id = 0;
                let index = window.history.state.options['unicorn-id'];
                console.log(JSON.stringify(window.history.state));
                if (typeof index === 'number') {
                    id = index;
                }

                console.log('route| ' + this.currentId + ' -> ' + id);

                if (this.currentId < id) {
                    // Forward
                    console.log('router| forward');
                } else {
                    // Backward
                    console.log('router| backward');
                    if (this.onBackPressed) {
                        this.onBackPressed();
                    }
                }

                this.currentId = id;
                this.topId = Math.max(this.topId, id);
            });
        }
    }

    push = (path: string) => {
        Router.push('/unicorn', path, { shallow: true, ['unicorn-transition']: 'push', ['unicorn-id']: ++this.topId });
    }

    fakePop = (path: string) => {
        Router.push('/unicorn', path, { shallow: true, ['unicorn-transition']: 'pop', ['unicorn-id']: ++this.topId });
    }
}

export const UTransitionManager = new UTransitionManagerImpl();