import { useState, useEffect } from 'react';
import { TVProgramDetailed, AllowedTVProgramResource } from '@app-types/TVProgram';
import * as TVProgramServices from '@services/apis/tv-app/tvprogram.api.services';

const useFetchTVProgram = (id: number | string, tvProgramResourceType: AllowedTVProgramResource) => {
    const [tvProgram, setTVProgram] = useState<TVProgramDetailed | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        let isCurrentRequest = true;

        if (id && tvProgramResourceType) {
            setTVProgram(null);
            setIsLoading(true);
            (async () => {
                try {
                    const result = await TVProgramServices.getTVProgramById(id, tvProgramResourceType);
                    if (isCurrentRequest) setTVProgram(result);
                } catch (error) {
                    if (isCurrentRequest) throw new Error(`Error fetching tv program, [Error]: ${error}`);
                } finally {
                    if (isCurrentRequest) setIsLoading(false);
                }
            })();
        } else {
            setTVProgram(null);
            setIsLoading(false);
        }

        return () => {
            isCurrentRequest = false;
        };
    }, [id, tvProgramResourceType]);

    return {
        tvProgram,
        isLoading,
    };
};

export { useFetchTVProgram };
