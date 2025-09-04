namespace StockTracker.Models
{
    public class Stock
    {
        public string Symbol { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal Price { get; set; } // Last buy price
        public decimal TotalInvested => Quantity * Price;
    }
}
