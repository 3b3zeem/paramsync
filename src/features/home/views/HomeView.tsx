'use client';

import React from 'react';
import { HomeHero } from '../components/HomeHero';
import { HomeFeaturePillars } from '../components/HomeFeaturePillars';
import { HomeCodePreview } from '../components/HomeCodePreview';
import { HomeComparison } from '../components/HomeComparison';

export function HomeView() {
  return (
    <div className="w-full">
      <HomeHero />

      <HomeFeaturePillars />

      <HomeCodePreview />

      <HomeComparison />
    </div>
  );
}
