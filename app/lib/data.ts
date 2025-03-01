import { PrismaClient } from "@prisma/client";
import { formatCurrency } from './utils';

const prisma = new PrismaClient();

export async function fetchRevenue() {
  try {
    const data = await prisma.revenue.findMany();
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await prisma.invoices.findMany({
      orderBy: {
        date: 'desc',
      },
      take: 5,
      select: {
        id: true,
        amount: true,
        customer: {
          select: {
            id: true,
            name: true,
            image_url: true,
            email: true,
          },
        },
      },
    });
    const latestInvoices = data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    const [invoiceCount, customerCount, invoiceStatus] = await Promise.all([
      prisma.invoices.count(),
      prisma.customers.count(),
      prisma.invoices.groupBy({
        by: ['status'],
        _sum: {
          amount: true,
        },
      }),
    ]);

    const totalPaidInvoices = formatCurrency(
      invoiceStatus.find((status) => status.status === 'paid')?._sum.amount ?? 0
    );
    const totalPendingInvoices = formatCurrency(
      invoiceStatus.find((status) => status.status === 'pending')?._sum.amount ?? 0
    );

    return {
      numberOfCustomers: customerCount,
      numberOfInvoices: invoiceCount,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const isFloat = !isNaN(parseFloat(query));
  const isDate = !isNaN(new Date(query).getTime());
  try {
    const invoices = await prisma.invoices.findMany({
      select: {
        id: true,
        amount: true,
        date: true,
        status: true,
        customer: {
          select: {
            name: true,
            email: true,
            image_url: true,
          },
        }
      },
      where: {
        OR: [
          { amount: { equals: isFloat ? parseFloat(query) : undefined } },
          { date: { equals: isDate ? new Date(query) : undefined } },
          { status: { contains: query, mode: 'insensitive'} },
          { customer: { name: { contains: query, mode: 'insensitive' } } },
          { customer: { email: { contains: query, mode: 'insensitive' } } },
          { status: { contains: query, mode: 'insensitive' } },
        ],
      },
      orderBy: {
        date: 'desc',
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const isFloat = !isNaN(parseFloat(query));
    const isDate = !isNaN(new Date(query).getTime());
    const data = await prisma.invoices.count({
      where: {
        OR: [
          { amount: { equals: isFloat ? parseFloat(query) : undefined } },
          { date: { equals: isDate ? new Date(query) : undefined } },
          { status: { contains: query, mode: 'insensitive'} },
          { customer: { name: { contains: query, mode: 'insensitive' } } },
          { customer: { email: { contains: query, mode: 'insensitive' } } },
          { status: { contains: query, mode: 'insensitive' } },
        ],
      },
    })

    const totalPages = Math.ceil(Number(data) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await prisma.invoices.findUnique({
      where: { id }, 
      select: {
        id: true,
        customer_id: true,
        amount: true,
        status: true 
      }
    })

    const invoice = data && {
      ...data,
      // Convert amount from cents to dollars
      amount: data.amount / 100,
    };

    return invoice;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const customers = await prisma.customers.findMany({
      orderBy: {
        name: 'asc',
      }, 
      select: {
        id: true,
        name: true
      }
    });

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await prisma.customers.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
        image_url: true,
        invoices: {
          select: {
          id: true,
          amount: true,
          status: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    const customers = data.map((customer) => {
      const total_invoices = customer.invoices.length;
      const total_pending = customer.invoices
      .filter((invoice) => invoice.status === 'pending')
      .reduce((sum, invoice) => sum + invoice.amount, 0);
      const total_paid = customer.invoices
      .filter((invoice) => invoice.status === 'paid')
      .reduce((sum, invoice) => sum + invoice.amount, 0);

      return {
      ...customer,
      total_invoices,
      total_pending: formatCurrency(total_pending),
      total_paid: formatCurrency(total_paid),
      };
    });

    return customers;

    // const data = await prisma.customers.findMany({
    //   where: {
    //     OR: [
    //       { name: { contains: query, mode: 'insensitive' } },
    //       { email: { contains: query, mode: 'insensitive' } },
    //     ],
    //   },
    //   orderBy: {
    //     name: 'asc',
    //   },
    //   select: {
    //     id: true,
    //     name: true,
    //     email: true,
    //     image_url: true,
    //     total_invoices: true,
    //     total_pending: true,
    //     total_paid: true,
    //   },
    // })

    // const customers = data.map((customer) => ({
    //   ...customer,
    //   total_pending: formatCurrency(customer.total_pending),
    //   total_paid: formatCurrency(customer.total_paid),
    // }));

    // return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}
