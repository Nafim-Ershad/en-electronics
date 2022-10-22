import React from 'react';
import Link from 'next/link';
// import Image from 'next/image';
import { urlFor } from '../lib/client';

function HeroBanner({heroBanner}) {
  console.log(heroBanner);
  return (
    <div className='hero-banner-container'>
      <div>
        <p className="beats-solo">SMALL TEXT</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img src={urlFor(heroBanner.image)} alt="headphones" className='hero-banner-image'/>
      </div>

      <div>
        <Link href={`/product/${heroBanner.product}`}>
          <button type='button'>{heroBanner.buttonText}</button>
        </Link>
        <div className="desc">
          <h5>Description</h5>
          <p>{heroBanner.desc}</p>
        </div>
      </div>
    </div>
  )
};

export default HeroBanner;