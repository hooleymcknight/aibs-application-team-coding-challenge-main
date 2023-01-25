import { dispatchCustomEvent } from '../dispatch-custom-event';

describe('dispatchCustomEvent', () => {
    test('it dispatches a custom event type', () => {
        const checkResult = (e: CustomEvent) => expect(e.detail).toEqual('bar');

        document.addEventListener('foo', checkResult);

        dispatchCustomEvent('foo', 'bar');

        document.removeEventListener('foo', checkResult);
    });

    test('it dispatches a custom event with no detail', () => {
        const checkResult = (e: CustomEvent) => expect(e.detail).toBeNull;

        document.addEventListener('foo', checkResult);

        dispatchCustomEvent('foo');

        document.removeEventListener('foo', checkResult);
    });

    test('it dispatches an event with a detail object', () => {
        const info = {
            country: 'USA',
            pop: 328_200_000,
            valid: false,
        };

        const checkResult = (e: CustomEvent) => expect(e.detail).toEqual(info);

        document.addEventListener('foo', checkResult);

        dispatchCustomEvent('foo', info);

        document.removeEventListener('foo', checkResult);
    });
});
