import React, { useMemo } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import useEmblaCarousel from 'embla-carousel-react';
import './SliderImage.css';

export interface SliderImageProps {
    imageSources: { source: string; title: string }[];
}

const EMBLA_OPTIONS = {
    loop: true,
    duration: 40,
    breakpoints: {
        '(prefers-reduced-motion: reduce)': { duration: 0 },
    },
};

const SliderImage: React.FC<SliderImageProps> = (props: SliderImageProps): React.ReactElement => {
    const { imageSources } = props;
    const plugins = useMemo(
        () => [
            Fade({
                breakpoints: {
                    '(prefers-reduced-motion: reduce)': { active: false },
                },
            }),
            Autoplay({
                delay: 10000,
                stopOnInteraction: false,
                stopOnMouseEnter: false,
                breakpoints: {
                    '(prefers-reduced-motion: reduce)': { active: false },
                },
            }),
        ],
        []
    );
    const [emblaRef] = useEmblaCarousel(EMBLA_OPTIONS, plugins);

    if (!imageSources.length) {
        return <div className="hero-slider h-[25rem] md:h-[38rem] skeleton flex w-full items-center justify-center opacity-60"></div>;
    }

    return (
        <div className="hero-slider" data-cy="hero-slider" role="region" aria-label="Featured titles" aria-roledescription="carousel">
            <div className="hero-slider__viewport h-[25rem] md:h-[38rem]" ref={emblaRef}>
                <div className="hero-slider__container">
                    {imageSources.map((item, key) => (
                        <div className="hero-slider__slide" data-cy="hero-slide" key={`image_item_${key}`}>
                            <img src={item.source} alt={`${item.title} backdrop`} data-cy="hero-image" />
                            <div className="hero-caption">
                                <p className="hero-caption__title" data-cy="hero-title">
                                    {item.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SliderImage;
