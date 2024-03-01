'use client';

import { ReactNode, createContext, useContext,  useState } from 'react';

const TenantContext = createContext<any>(undefined);

export function TenantProvider ({ children }: { children: ReactNode }) {
  const [tenant, setTenant] = useState();

  return (
    <TenantContext.Provider value={{tenant, setTenant}}>
      {children}
    </TenantContext.Provider>
  );
};

export default TenantProvider ;
export const useTenantContext = () => useContext(TenantContext);