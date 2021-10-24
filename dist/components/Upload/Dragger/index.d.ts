import { FC } from 'react';
export interface DraggerProps {
    onFile: (file: FileList) => void;
}
declare const Dragger: FC<DraggerProps>;
export default Dragger;
