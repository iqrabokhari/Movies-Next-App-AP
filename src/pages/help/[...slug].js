import { useRouter } from 'next/router';
import Link from 'next/link';

const helpContent = {
  faqs: {
    title: 'Frequently Asked Questions',
    content: 'Here are some common questions and answers...',
  },
  contact: {
    title: 'Contact Us',
    content: 'Feel free to reach out to us at contact@example.com.',
  },
  privacy: {
    title: 'Privacy Policy',
    content: 'We respect your privacy and protect your data responsibly.',
  },
};

export default function HelpPage() {
  const router = useRouter();
  const slug = router.query.slug || [];


  if (slug.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Help Center</h1>
        <p className="mb-4">How can we assist you today?</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><Link href="/help/faqs" className="text-blue-600 hover:underline">FAQs</Link></li>
          <li><Link href="/help/contact" className="text-blue-600 hover:underline">Contact Us</Link></li>
          <li><Link href="/help/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link></li>
        </ul>
      </div>
    );
  }

  const pageKey = slug[0]; // just the first part, like 'faqs' or 'contact'
  const page = helpContent[pageKey];

  if (!page) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
        <p className="mb-4">The help topic you're looking for does not exist.</p>
        <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
      <p className="mb-6">{page.content}</p>
      <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
    </div>
  );
}
