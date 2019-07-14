import * as React from 'react';
import { URouting } from './URouting';

const factory = () => () => <div />;

describe('URouting', () => {
    it('should route', () => {
        let routing = new URouting();
        routing.addRoute('/main', factory);
        routing.addRoute('/chats/:chatId', factory);
        expect(routing.resolve('/main')!.route.path).toBe('/main');
        expect(routing.resolve('/main/')!.route.path).toBe('/main');
        expect(routing.resolve('/chats/123')!.params).toEqual({ chatId: '123' });
        expect(routing.resolve('/chats/123/')!.params).toEqual({ chatId: '123' });
    });
});