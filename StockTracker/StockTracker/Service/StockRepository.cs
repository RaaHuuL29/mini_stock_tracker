using StockTracker.Models;

namespace StockTracker.Service
{
    public class StockRepository
    {
        public static List<Stock> Stocks { get; } = new List<Stock>();

        public static decimal GetMockMarketPrice(string symbol)
        {
            return symbol switch
            {
                "AAPL" => 180,
                "MSFT" => 320,
                "GOOG" => 2700,
                _ => 100
            };
        }
    }
}
