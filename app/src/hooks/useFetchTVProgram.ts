import { useState, useEffect } from 'react';
import { TVProgramDetailed, AllowedTVProgramResource } from '@app-types/TVProgram';
import * as TVProgramServices from '@services/apis/tv-app/tvprogram.api.services';

const useFetchTVProgram = (id: number | string, tvProgramResourceType: AllowedTVProgramResource) => {
    const [tvProgram, setTVProgram] = useState<TVProgramDetailed | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        let isCurrentRequest = true;

        if (id && tvProgramResourceType) {
            setTVProgram(null);
            setHasError(false);
            setIsLoading(true);
            (async () => {
                try {
                    const result = await TVProgramServices.getTVProgramById(id, tvProgramResourceType);
                    if (isCurrentRequest) setTVProgram(result);
                } catch {
                    if (isCurrentRequest) setHasError(true);
                } finally {
                    if (isCurrentRequest) setIsLoading(false);
                }
            })();
        } else {
            setTVProgram(null);
            setHasError(false);
            setIsLoading(false);
        }

        return () => {
            isCurrentRequest = false;
        };
    }, [id, tvProgramResourceType]);

    return {
        tvProgram,
        isLoading,
        hasError,
    };
};

export { useFetchTVProgram };
