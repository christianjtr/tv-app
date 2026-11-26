import { cleanup, fireEvent, renderHook } from '@testing-library/react';
import useArrowNavigation from '@hooks/useArrowNavigation';

describe('useArrowNavigation', () => {
    afterEach(() => {
        cleanup();
        document.body.innerHTML = '';
    });

    it('does not move focus out of a text input', () => {
        const { result } = renderHook(() => useArrowNavigation('input, button'));
        const container = document.createElement('div');
        container.innerHTML = '<input><button>Result</button>';
        document.body.append(container);
        result.current.current = container;

        const input = container.querySelector('input') as HTMLInputElement;
        input.focus();
        fireEvent.keyUp(input, { key: 'ArrowRight' });

        expect(document.activeElement).toBe(input);
    });

    it('does nothing when the navigation container has no targets', () => {
        const { result } = renderHook(() => useArrowNavigation('button'));
        result.current.current = document.createElement('div');

        expect(() => fireEvent.keyUp(document.body, { key: 'ArrowDown' })).not.toThrow();
    });
});
