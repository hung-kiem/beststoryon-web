import React from 'react';

import { HeaderMobile } from './headerMobile';
import { HeaderDesktop } from './headerDesktop';

export function Header() {
    return (
        <>
            <HeaderMobile />
            <HeaderDesktop />
        </>
    );
}
