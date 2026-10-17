import { redirect } from 'next/navigation';
import { Locale } from '@/i18n-config';

type Props = {
  params: Promise<{ lang: Locale }>;
};

export default async function RentalRedirectPage({ params }: Props) {
  const { lang } = await params;
  // Equipment rental has been decommissioned by user directive.
  // Redirect visitors seamlessly to trips.
  redirect(`/${lang || 'th'}/trips`);
}
