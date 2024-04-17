import { useRecoilValue, useSetRecoilState } from 'recoil';
import { fileTreeDataState } from '@/store/atom/fileTreeDataAtom';
import { playgroundState } from '@/store/atom/playgroundAtom';
import axios from 'axios';

// const setFileTreeData = useSetRecoilState(fileTreeDataState);
// const playground = useRecoilValue(playgroundState);

// export const fetchFileTreeData = async () => {
//   try {
//     const res = await axios.get(
//       `http://api.${playground.title}.localhost/api/v1/files/all`
//     );

//     console.log(res.data.data);
//     setFileTreeData(res.data.data);
//   } catch (error) {
//     console.log(error);
//   }
// };
