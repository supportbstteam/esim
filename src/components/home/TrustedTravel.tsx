import React from 'react'
import PageTitle from '../ui/PageTitle'
import {QuoteSlider} from '@/components/ui/QuoteSlider';
function TrustedTravel() {
  return (
    <div className='container mb-24'>
        <PageTitle 
        title="Trusted by Travelers Worldwide" 
        subtitle="Your travel experience, made seamless."
        desk="Don’t just take our word for it."
        leftLogo="/bas_stam.png"
        rightLogo="/roun_stamp.png"
        subclass=""
        />

        <div className="mt-18">
            <QuoteSlider />
        </div>
    </div>
  )
}

export default TrustedTravel