type Plan = {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
};

const staticPlans: Plan[] = [
  {
    id: '1',
    name: 'Free Plan (Starter)',
    price: 0.00,
    description: 'For freelancers or small users who need basic invoicing.',
    features: [
      'Create up to 5 invoices per month',
      'PDF export & email invoices',
      'Basic dashboard analytics',
      'Manual payment tracking',
      'Email support',
    ],
  },
  {
    id: '2',
    name: 'Pro Plan (Recommended)',
    price: 19.99,
    description: 'For growing businesses that need automation and efficiency.',
    features: [
      'Unlimited invoices & clients',
      'Recurring invoices & auto-reminders',
      'Online payment integration',
      'Advanced dashboard analytics',
      'Invoice templates & branding customization',
      'Multi-currency & multi-language support',
      'Priority email & chat support',
    ],
  },
  {
    id: '3',
    name: 'Enterprise Plan (Ultimate)',
    price: 29.99,
    description: 'For large businesses that need full control & team collaboration.',
    features: [
      'Everything in Pro Plan',
      'Team collaboration',
      'Role-based permission & approval workflow',
      'Custom reports & financial insights',
      'Dedicated account manager & 24/7 support',
    ],
  },
];

export default function SubscriptionPlans() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-32">
        <h1 className='text-2xl text-white'>BillFlow</h1>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="container mx-auto p-4">
          <p className={`text-xl text-center text-gray-800 md:text-2xl md:leading-normal mb-4`}>Subscription Plans</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {staticPlans.map((plan) => (
              <div key={plan.id} className="border border-gray-200 rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition-shadow flex flex-col">
                <h2 className="text-2xl font-semibold mb-2 text-blue-600">{plan.name}</h2>
                <p className="text-gray-700 mb-4">{plan.description}</p>
                <p className="text-3xl font-bold mb-4 text-blue-600">${plan.price.toFixed(2)}</p>
                <ul className="list-disc list-inside mb-4 text-gray-600 flex-grow">
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <a href="/register" className="block w-full bg-blue-600 text-white text-center mt-auto p-2 rounded-lg hover:bg-blue-500 transition-colors">
                  Choose Plan
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
