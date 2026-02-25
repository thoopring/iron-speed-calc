import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://iron-speed-calc.vercel.app', // 🌟 본인 도메인 주소
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}