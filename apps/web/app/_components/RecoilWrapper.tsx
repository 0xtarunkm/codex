'use client';

import { RecoilRoot } from 'recoil';

const RecoilWrapper = ({ children }: { children: React.ReactNode }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilWrapper;
