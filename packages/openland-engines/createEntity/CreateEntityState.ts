export interface CreateEntityState {
    title: string | null;
    secret: boolean | null;
    description: string | null;
    shareWith: string | null;
    photo: {
        uuid: string;
        crop: {
            x: number;
            y: number;
            w: number;
            h: number;
        } | null;
    } | null;
}

export class CreateEntityEngine {
    private state: CreateEntityState = {
        title: null,
        secret: null,
        description: null,
        shareWith: null,
        photo: null,
    };

    ////
    // Actions
    ////

    addToState = (state: CreateEntityState) => {
        this.setState(state);
    }

    clear = () => {
        this.state = {
            title: null,
            secret: null,
            description: null,
            shareWith: null,
            photo: null,
        };
    }

    ////
    // IO
    ////

    getState = () => {
        return this.state;
    }

    private setState = (state: CreateEntityState) => {
        this.state = { ...state };
    }
}
