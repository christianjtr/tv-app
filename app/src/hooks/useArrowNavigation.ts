import { useCallback, useEffect, MutableRefObject, useRef } from 'react';
import { NavigationKeysOptions, NavigationKeys } from '@app-types/KeyboardNavigation';

const useKeyboardNavigation = (selectors: string) => {
    const ref: MutableRefObject<Element | null> = useRef(null);

    const handleOnKeyUp = useCallback(
        (event: KeyboardEvent) => {
            const { key } = event;
            if (!NavigationKeysOptions.includes(key as NavigationKeys)) return;

            const container = ref.current;
            const availableElements = container?.querySelectorAll(selectors);
            if (!container || !availableElements?.length) return;

            const activeElement = document.activeElement;
            const isEditableTarget = (target: EventTarget | null): boolean =>
                target instanceof HTMLElement && (target.matches('input, textarea, select') || target.isContentEditable);
            if (isEditableTarget(event.target) || isEditableTarget(activeElement)) return;

            const currentIndex = Array.from(availableElements).findIndex((availableElement) => availableElement === activeElement);
            if (currentIndex === -1 && activeElement !== document.body && !container.contains(activeElement)) return;

            const direction = key === 'ArrowDown' || key === 'ArrowRight' ? 1 : -1;
            const nextIndex = currentIndex === -1 ? 0 : currentIndex + direction;
            const nextElement = availableElements[nextIndex] as HTMLElement | undefined;
            if (!nextElement) return;

            event.preventDefault();
            nextElement.focus();
        },
        [selectors]
    );

    useEffect(() => {
        document.addEventListener('keyup', handleOnKeyUp);

        return () => {
            document.removeEventListener('keyup', handleOnKeyUp);
        };
    }, [handleOnKeyUp]);

    return ref;
};

export default useKeyboardNavigation;
