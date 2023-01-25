import get from 'lodash/get';
import { useCallback } from 'react';
import { useDisplayMetadata } from '../use-display-metadata/use-display-metadata';

export const usePickMetadata = () => {
    /**
     * hook that returns a convenience function to pick display
     * metadata off of metadata display map
     */
    const { displayMetadataMap } = useDisplayMetadata();

    return useCallback(
        (accessorKey: string) =>
            get(displayMetadataMap, accessorKey, {
                description: 'Loading...',
                shortName: 'Loading...',
                longName: 'Loading...',
            }),
        [displayMetadataMap]
    );
};
