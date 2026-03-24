import React, { Suspense } from 'react'
import TopUpCheckOut from './topUpCheckout';
import ProtectedRoute from '@/components/hooks/ProtectedRoute';

function TopUp() {
    
    return (
        <ProtectedRoute>
        <Suspense fallback={<div>Loading...</div>}>
            <TopUpCheckOut />
        </Suspense>
        </ProtectedRoute>
    );
}

export default TopUp