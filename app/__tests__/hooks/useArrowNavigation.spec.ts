import { cleanup, fireEvent, renderHook } from '@testing-library/react';
import useArrowNavigation from '@hooks/useArrowNavigation';

const setBounds = (element: HTMLElement, left: number, top: number) => {
    const bounds = {
        x: left,
        y: top,
        left,
        top,
        right: left + 40,
        bottom: top + 40,
        width: 40,
        height: 40,
        toJSON: () => ({}),
    } as DOMRect;

    Object.defineProperty(element, 'getBoundingClientRect', { configurable: true, value: () => bounds });
    Object.defineProperty(element, 'getClientRects', { configurable: true, value: () => [bounds] as unknown as DOMRectList });
};

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

        setBounds(container.querySelector('input') as HTMLInputElement, 0, 0);
        setBounds(container.querySelector('button') as HTMLButtonElement, 0, 100);
        const input = container.querySelector('input') as HTMLInputElement;
        input.focus();
        fireEvent.keyUp(input, { key: 'ArrowRight' });

        expect(document.activeElement).toBe(input);
    });

    it('moves focus to the nearest element in each direction without wrapping', () => {
        const { result } = renderHook(() => useArrowNavigation('button'));
        const container = document.createElement('div');
        container.innerHTML = '<button>Top left</button><button>Top right</button><button>Bottom left</button><button>Bottom right</button>';
        document.body.append(container);
        result.current.current = container;

        const header = document.createElement('button');
        container.prepend(header);
        setBounds(header, -100, -100);

        const [topLeft, topRight, bottomLeft, bottomRight] = Array.from(container.querySelectorAll('button')).slice(1);
        setBounds(topLeft, 0, 0);
        setBounds(topRight, 100, 0);
        setBounds(bottomLeft, 0, 100);
        setBounds(bottomRight, 100, 100);

        topLeft.focus();
        fireEvent.keyUp(topLeft, { key: 'ArrowRight' });
        expect(document.activeElement).toBe(topRight);

        fireEvent.keyUp(topRight, { key: 'ArrowDown' });
        expect(document.activeElement).toBe(bottomRight);

        fireEvent.keyUp(bottomRight, { key: 'ArrowLeft' });
        expect(document.activeElement).toBe(bottomLeft);

        fireEvent.keyUp(bottomLeft, { key: 'ArrowUp' });
        expect(document.activeElement).toBe(topLeft);

        fireEvent.keyUp(topLeft, { key: 'ArrowLeft' });
        expect(document.activeElement).toBe(topLeft);
    });

    it('does nothing when the navigation container has no targets', () => {
        const { result } = renderHook(() => useArrowNavigation('button'));
        result.current.current = document.createElement('div');

        expect(() => fireEvent.keyUp(document.body, { key: 'ArrowDown' })).not.toThrow();
    });
});
