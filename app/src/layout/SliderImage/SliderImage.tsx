import React, { useEffect } from 'react';
import Glide from '@glidejs/glide';
import './SliderImage.css';

export interface SliderImageProps {
    imageSources: { source: string; title: string }[];
    hasOverlay?: boolean;
}

const SliderImage: React.FC<SliderImageProps> = (props: SliderImageProps): React.ReactElement | null => {
    const { imageSources, hasOverlay = false } = props;

    const hasImageSources = imageSources.length > 0;

    useEffect(() => {
        let glide: Glide;
        if (hasImageSources) {
            glide = new Glide('.glide', {
                type: 'carousel',
                autoplay: 10000,
                hoverpause: false,
                gap: 0,
                animationDuration: 1000,
            }).mount();

            glide.on('swipe.end', () => {
                glide.go('0');
            });
        }

        return () => {
            if (glide) glide.destroy();
        };
    }, [imageSources]);

    if (!hasImageSources) return null;

    return (
        <div className="glide">
            <div className={`glide__track h-96 ${hasOverlay && 'overlay'}`} data-glide-el="track">
                <ul className="glide__slides">
                    {imageSources.map((item, key) => (
                        <li className="glide__slide relative" key={`image_item_${key}`}>
                            <img src={item.source} alt={`poster image ${item.title}`} aria-label={`poster image ${item.title}`} />
                            <h1 className="block text-right md:text-4xl text-lg text-white title--centered">{item.title}</h1>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SliderImage;
