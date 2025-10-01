import React from 'react'
import Image from 'next/image'
function Success() {
    return (
        <div>
            <h2 className="h1">
                Your account has been successfully created.
            </h2>
            <Image src="/succes.gif" alt="success" width={200} height={200} className="mx-auto my-4 rounded-full" />

          
        </div>
    )
}

export default Success