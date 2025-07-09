import systemData from "../data/systemData";

// Calculate real financial data from system data
export const calculateFinancials = () => {
  // Calculate Total Revenue from completed and partially paid invoices
  const totalRevenue = systemData.invoices.reduce((sum, invoice) => {
    return sum + invoice.amountReceived;
  }, 0);

  // Calculate Total Expenses (Employee salaries + raw materials cost estimates)
  const employeeSalaries = systemData.employees.reduce(
    (sum, emp) => sum + emp.paid,
    0,
  );

  // Estimate raw materials cost based on inventory movements (30% of inventory value)
  const rawMaterialsCost = systemData.inventory.reduce(
    (sum, item) => sum + item.quantity * item.price * 0.3,
    0,
  );

  // Fixed operational costs (utilities, maintenance, etc.)
  const operationalCosts = 7000; // Monthly operational costs

  const totalExpenses =
    employeeSalaries + Math.floor(rawMaterialsCost) + operationalCosts;

  // Calculate Net Profit
  const netProfit = totalRevenue - totalExpenses;
  const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

  // Calculate monthly data for charts (last 6 months)
  const monthlyData = [];
  const currentDate = new Date();

  for (let i = 5; i >= 0; i--) {
    const monthDate = new Date(currentDate);
    monthDate.setMonth(monthDate.getMonth() - i);
    const monthName = monthDate.toLocaleDateString("en-US", { month: "short" });

    // Calculate revenue for this month based on invoice dates
    const monthRevenue = systemData.invoices
      .filter((inv) => {
        const invDate = new Date(inv.date);
        return (
          invDate.getMonth() === monthDate.getMonth() &&
          invDate.getFullYear() === monthDate.getFullYear()
        );
      })
      .reduce((sum, inv) => sum + inv.amountReceived, 0);

    // Estimate monthly expenses (current month expenses divided by past months)
    const monthExpenses = Math.floor(
      totalExpenses * (0.8 + Math.random() * 0.4),
    ); // Vary by ±20%

    monthlyData.push({
      month: monthName,
      revenue:
        monthRevenue || Math.floor(totalRevenue * (0.8 + Math.random() * 0.4)), // Use calculated or estimate
      expenses: monthExpenses,
      profit:
        (monthRevenue ||
          Math.floor(totalRevenue * (0.8 + Math.random() * 0.4))) -
        monthExpenses,
    });
  }

  // Calculate expense breakdown from real data
  const expenseBreakdown = [
    {
      category: "Labor",
      amount: employeeSalaries,
      color: "bg-green-500",
      percentage:
        totalExpenses > 0 ? (employeeSalaries / totalExpenses) * 100 : 0,
    },
    {
      category: "Raw Materials",
      amount: Math.floor(rawMaterialsCost),
      color: "bg-blue-500",
      percentage:
        totalExpenses > 0
          ? (Math.floor(rawMaterialsCost) / totalExpenses) * 100
          : 0,
    },
    {
      category: "Utilities",
      amount: 2500,
      color: "bg-yellow-500",
      percentage: totalExpenses > 0 ? (2500 / totalExpenses) * 100 : 0,
    },
    {
      category: "Equipment & Maintenance",
      amount: 2000,
      color: "bg-purple-500",
      percentage: totalExpenses > 0 ? (2000 / totalExpenses) * 100 : 0,
    },
    {
      category: "Miscellaneous",
      amount: 2500,
      color: "bg-red-500",
      percentage: totalExpenses > 0 ? (2500 / totalExpenses) * 100 : 0,
    },
  ];

  // Calculate outstanding payments
  const outstandingPayments = systemData.invoices.reduce((sum, invoice) => {
    return sum + invoice.amountRemaining;
  }, 0);

  // Calculate overdue invoices
  const overdueInvoices = systemData.invoices.filter(
    (invoice) => invoice.isOverdue,
  );
  const overdueAmount = overdueInvoices.reduce(
    (sum, invoice) => sum + invoice.amountRemaining,
    0,
  );

  return {
    totalRevenue,
    totalExpenses,
    netProfit,
    profitMargin,
    monthlyData,
    expenseBreakdown,
    outstandingPayments,
    overdueAmount,
    overdueCount: overdueInvoices.length,

    // Additional metrics
    totalInvoices: systemData.invoices.length,
    paidInvoices: systemData.invoices.filter(
      (inv) => inv.paymentStatus === "paid",
    ).length,
    unpaidInvoices: systemData.invoices.filter(
      (inv) => inv.paymentStatus === "unpaid",
    ).length,
    partiallyPaidInvoices: systemData.invoices.filter(
      (inv) => inv.paymentStatus === "partial",
    ).length,

    // Customer financial data
    topCustomersByRevenue: systemData.customers
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, 5)
      .map((customer) => ({
        name: customer.name,
        revenue: customer.totalRevenue,
        orders: customer.totalOrders,
      })),
  };
};

// Export the calculated data
export const realFinancialData = calculateFinancials();
