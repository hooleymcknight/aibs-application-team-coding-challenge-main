import { TypographyVariant as Variant } from '@material-ui/core/styles';
import { TypographyVariant } from '../types/typography';

export const typographyVariantMap: Record<TypographyVariant, Variant> = {
    d1: 'h1',
    d2: 'h2',
    h1: 'h3',
    h2: 'h4',
    titleUppercase: 'h5',
    title: 'h6',
    emphasis: 'overline',
    body: 'body1',
    description: 'body2',
    legal: 'caption',
    button: 'button',
    titleUppercaseSmall: 'subtitle1',
    titleSmall: 'subtitle2',
    descriptionOnDarkBackground: 'body2',
    emphasisOnDarkBackground: 'overline',
    bodyOnDarkBackground: 'body1',
};
