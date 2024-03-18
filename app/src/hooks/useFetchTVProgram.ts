import { useState, useEffect } from 'react';
import { TVProgramDetailed, AllowedTVProgramResource } from '@app-types/TVProgram';
import * as TVProgramServices from '@services/apis/tv-app/tvprogram.api.services';

const useFetchTVProgram = (id: number | string, tvProgramResourceType: AllowedTVProgramResource) => {
    const [tvProgram, setTVProgram] = useState<TVProgramDetailed | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (id && tvProgramResourceType) {
            (async () => {
                try {
                    setIsLoading(true);
                    const result = await TVProgramServices.getTVProgramById(id, tvProgramResourceType);
                    setTVProgram(result);
                } catch (error) {
                    throw new Error(`Error fetching tv program, [Error]: ${error}`);
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    }, [id, tvProgramResourceType]);

    return {
        tvProgram,
        isLoading,
    };
};

export { useFetchTVProgram };
