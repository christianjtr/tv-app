import { useCallback, useEffect, useRef } from 'react';
import { NavigationKeysOptions, NavigationKeys } from '@app-types/KeyboardNavigation';

const useArrowNavigation = (selectors: string) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const handleOnKeyUp = useCallback(
        (event: KeyboardEvent) => {
            const { key } = event;
            if (!NavigationKeysOptions.includes(key as NavigationKeys)) return;

            const container = ref.current;
            if (!container) return;

            const activeElement = document.activeElement;
            const isEditableTarget = (target: EventTarget | null): boolean =>
                target instanceof HTMLElement && (target.matches('input, textarea, select') || target.isContentEditable);
            if (isEditableTarget(event.target) || isEditableTarget(activeElement)) return;

            const availableElements = Array.from(container.querySelectorAll<HTMLElement>(selectors)).filter(
                (element) =>
                    element.tabIndex >= 0 &&
                    !element.matches(':disabled') &&
                    !element.closest('[aria-hidden="true"], [inert]') &&
                    element.getClientRects().length > 0 &&
                    window.getComputedStyle(element).visibility !== 'hidden'
            );

            if (!availableElements.length) return;

            if (activeElement === document.body) {
                event.preventDefault();
                availableElements[0].focus();
                return;
            }

            if (!(activeElement instanceof HTMLElement) || !container.contains(activeElement)) return;

            const isHorizontal = key === 'ArrowLeft' || key === 'ArrowRight';
            const currentRect = activeElement.getBoundingClientRect();
            const currentX = (currentRect.left + currentRect.right) / 2;
            const currentY = (currentRect.top + currentRect.bottom) / 2;
            let nearestElement: HTMLElement | undefined;
            let nearestScore = Number.POSITIVE_INFINITY;

            for (const element of availableElements) {
                if (element === activeElement) continue;

                const rect = element.getBoundingClientRect();
                const dx = (rect.left + rect.right) / 2 - currentX;
                const dy = (rect.top + rect.bottom) / 2 - currentY;
                const primaryDistance = key === 'ArrowRight' ? dx : key === 'ArrowLeft' ? -dx : key === 'ArrowDown' ? dy : -dy;

                if (primaryDistance <= 0) continue;

                const crossDistance = isHorizontal ? Math.abs(dy) : Math.abs(dx);
                if (isHorizontal && crossDistance > Math.max(currentRect.height, rect.height) / 2) continue;
                const score = primaryDistance + crossDistance * 2;
                if (score < nearestScore) {
                    nearestElement = element;
                    nearestScore = score;
                }
            }

            const nextElement = nearestElement;
            if (!nextElement) return;

            event.preventDefault();
            nextElement.focus();
        },
        [selectors]
    );

    useEffect(() => {
        window.addEventListener('keyup', handleOnKeyUp);

        return () => {
            window.removeEventListener('keyup', handleOnKeyUp);
        };
    }, [handleOnKeyUp]);

    return ref;
};

export default useArrowNavigation;
