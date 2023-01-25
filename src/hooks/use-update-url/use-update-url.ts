import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getURLString, URLConfig } from '../../utils';

export const useUpdateUrl = (config: URLConfig) => {
    const navigate = useNavigate();
    const nextUrl = getURLString(config);

    useEffect(() => {
        navigate(nextUrl, { replace: true });
    }, [navigate, nextUrl]);
};
