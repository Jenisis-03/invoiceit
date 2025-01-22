interface iAppProps {
    amount: number;
    currency: "INR" | "USD"; // Use "EUR" instead of "EURO" (ISO code for Euro)
  }
  
  export function formatCurrency({ amount, currency }: iAppProps) {
    return new Intl.NumberFormat("en-US", { // Specify a valid locale, like "en-US"
      style: "currency",
      currency: currency, // Use the valid ISO currency code
    }).format(amount);
  }
  