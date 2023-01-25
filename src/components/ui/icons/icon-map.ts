import { ElementType } from 'react';
import InfoIcon from '@material-ui/icons/Info';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import Download from 'mdi-material-ui/Download';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PageViewIcon from '@material-ui/icons/Pageview';
import ExploreIcon from '@material-ui/icons/Explore';

export const iconMap: { [key: string]: ElementType<SvgIconProps> } = {
    download: Download,
    view: VisibilityIcon,
    information: InfoIcon,
    specimens: PageViewIcon,
    compass: ExploreIcon,
};
