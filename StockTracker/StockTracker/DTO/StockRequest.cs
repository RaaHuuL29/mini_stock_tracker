namespace StockTracker.DTO
{
    public class StockRequest
    {
        public string Symbol { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
