import Link from 'next/link';
import { getHomePageData } from '@/lib/data';
import { HomePageClient } from '@/components/home-page-client';

export default async function HomePage() {
  const data = await getHomePageData();
  return <HomePageClient {...data} />;
}
