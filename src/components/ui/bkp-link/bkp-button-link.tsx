/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { isInternalUrl, setTargetForUrl } from '../../../utils';
import { useStyles } from './use-styles';

export type BkpButtonLinkProps = ButtonProps & { to?: string; showIcon?: boolean };

export const BkpButtonLink = React.forwardRef<HTMLAnchorElement, BkpButtonLinkProps>(
    ({ href, children, className, to, showIcon = true, ...props }: BkpButtonLinkProps, ref) => {
        const classes = useStyles();

        // Use the optional `to` parameter to do ReactRouter internal navigation
        if (to) {
            return (
                <RouterLink
                    to={to}
                    className={className}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        {...props}
                        className={className}
                        innerRef={ref}
                    >
                        {children}
                    </Button>
                </RouterLink>
            );
        }

        if (href) {
            return (
                <Link
                    href={href}
                    target={setTargetForUrl(window.location.host, href)}
                >
                    <Button
                        className={className}
                        {...props}
                        innerRef={ref}
                    >
                        {children}
                        {!isInternalUrl(window.location.host, href) && showIcon && (
                            <OpenInNewIcon className={classes.externalIcon} />
                        )}
                    </Button>
                </Link>
            );
        }

        return null;
    }
);
