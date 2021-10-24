import { FC, CSSProperties } from 'react';
import { ThemeProps } from '../Icon';
interface progressProps {
    percent: number;
    strokeHeight?: number;
    showText?: boolean;
    styles?: CSSProperties;
    theme?: ThemeProps;
}
declare const Progress: FC<progressProps>;
export default Progress;
