import { useEffect, useState } from 'react';
import { PropertyDisplayNameConfiguration } from '../../types';
import { DISPLAY_METADATA_URL } from '../../constants';

export type UseDisplayMetadataValue = PropertyDisplayNameConfiguration | null;
export interface UseDisplayMetadataPayload {
    displayMetadataMap: UseDisplayMetadataValue;
    loading: boolean;
    error: null | Error;
}

export function useDisplayMetadata(): UseDisplayMetadataPayload {
    const [displayMetadataMap, setDisplayNameMap] = useState<UseDisplayMetadataValue>(null);
    const [error, setError] = useState<null | Error>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!displayMetadataMap) {
            setLoading(true);
            fetch(DISPLAY_METADATA_URL)
                .then((res) => res.json())
                .then(setDisplayNameMap)
                .catch(setError)
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [displayMetadataMap]);

    return { displayMetadataMap, loading, error };
}
