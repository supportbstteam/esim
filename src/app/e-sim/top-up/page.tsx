import React, { Suspense } from 'react'
import TopUpCheckOut from './topUpCheckout';

function TopUp() {
    
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TopUpCheckOut />
        </Suspense>
    );
}

export default TopUp