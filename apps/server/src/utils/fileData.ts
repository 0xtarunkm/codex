import { v4 as uuidv4 } from 'uuid';

export const nodeFileData = {
  id: uuidv4(),
  name: 'root',
  isDirectory: true,
  parentId: null,
  children: [
    {
      id: uuidv4(),
      name: 'index.js',
      isDirectory: false,
      parentId: '1',
    },
  ],
};
