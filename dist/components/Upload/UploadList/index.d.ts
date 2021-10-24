import { FC } from 'react';
import { uploadFile } from '../';
export interface UploadListProps {
    fileList: uploadFile[];
    onRemove: (_file: uploadFile) => void;
}
declare const UploadList: FC<UploadListProps>;
export default UploadList;
