/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Link, { LinkProps } from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { isInternalUrl, setTargetForUrl } from '../../../utils';
import { useStyles } from './use-styles';

export type BkpLinkProps = LinkProps & { to?: string; onClick?: () => void; showIcon?: boolean };

export const BkpLink = React.forwardRef(
    ({ href, children, className, to, onClick, showIcon = true, ...props }: BkpLinkProps, ref) => {
        const classes = useStyles();

        // Use the optional `to` parameter to do ReactRouter internal navigation
        if (to) {
            return (
                <Link
                    to={to}
                    component={RouterLink}
                    innerRef={ref}
                    className={className}
                    {...props}
                >
                    {children}
                </Link>
            );
        }

        if (href) {
            return (
                <Link
                    href={href}
                    target={setTargetForUrl(window.location.host, href)}
                    innerRef={ref}
                    className={className}
                    {...props}
                >
                    {children}
                    {!isInternalUrl(window.location.host, href) && showIcon && (
                        <OpenInNewIcon className={classes.externalIcon} />
                    )}
                </Link>
            );
        }

        if (onClick) {
            return (
                <Link
                    onClick={onClick}
                    innerRef={ref}
                    className={className}
                    {...props}
                >
                    {children}
                </Link>
            );
        }

        return null;
    }
);
