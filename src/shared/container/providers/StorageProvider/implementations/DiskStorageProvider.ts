import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel';
import IStorageProvider from '../models/IStorageProvider';
import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/uploads';


class DiskStorageProvider implements IStorageProvider{
    public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file), //local temporario do arquivo que vai ser renomeado
      path.resolve(uploadConfig.uploadFolder, file), // local onde ficara o arquivo ja renomeado
    ); //renomeia arquivo
    return file;
  }
    public async deleteFile(file: string): Promise<void>{
        const filePath = path.resolve(uploadConfig.uploadFolder, file);

        try{
            await fs.promises.stat(filePath)
        }catch {
            return;
        }
        await fs.promises.unlink(filePath);
    }
}

export default DiskStorageProvider
