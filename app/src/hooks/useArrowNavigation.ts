import { useEffect, MutableRefObject, useRef } from 'react';
import { NavigationKeysOptions, NavigationKeys } from '@app-types/KeyboardNavigation';

const useKeyboardNavigation = (selectors: string) => {
    const ref: MutableRefObject<Element | null> = useRef(null);

    const handleKeyboardNav = (event: KeyboardEvent, currentIndex: number, availableElements: NodeListOf<Element>) => {
        let selectedElement;
        const { key } = event;

        if (currentIndex === -1) (Array.from(availableElements)?.[0] as HTMLElement).focus();

        if (key === 'ArrowDown' || key === 'ArrowRight') {
            selectedElement = availableElements[currentIndex + 1];
        }

        if (key === 'ArrowUp' || key === 'ArrowLeft') {
            selectedElement = availableElements[currentIndex - 1];
        }

        (selectedElement as HTMLElement)?.focus();
    };

    const handleOnKeyUp = (event: KeyboardEvent) => {
        const { key } = event;
        if (!ref || !NavigationKeysOptions.includes(key as NavigationKeys)) return;

        const activeElement = document.activeElement;

        const availableElements: NodeListOf<Element> | undefined = ref.current?.querySelectorAll(selectors);
        if (!availableElements) return;

        const currentIndex = Array.from(availableElements).findIndex((availableElement) => availableElement === activeElement);

        handleKeyboardNav(event, currentIndex, availableElements);
    };

    useEffect(() => {
        document.addEventListener('keyup', handleOnKeyUp);

        return () => {
            document.removeEventListener('keyup', handleOnKeyUp);
        };
    }, []);

    return ref;
};

export default useKeyboardNavigation;
