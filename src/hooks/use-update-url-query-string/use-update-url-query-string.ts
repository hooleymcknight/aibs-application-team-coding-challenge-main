import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const useUpdateUrlQueryString = (searchUpdate: string) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        navigate(
            {
                pathname,
                search: searchUpdate,
            },
            { replace: true }
        );
    }, [navigate, pathname, searchUpdate]);
};
