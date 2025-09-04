using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockTracker.DTO;
using StockTracker.Models;
using StockTracker.Service;

namespace StockTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StocksController : ControllerBase
    {        

        public StocksController() { }

        [HttpPost]
        public IActionResult AddStock([FromBody] Stock stock)
        {
            if (StockRepository.Stocks.Any(s => s.Symbol.Equals(stock.Symbol, StringComparison.OrdinalIgnoreCase)))
            {
                return BadRequest($"Stock with symbol {stock.Symbol} already exists.");
            }

            StockRepository.Stocks.Add(stock);
            return Ok(stock);
        }

        // PUT /api/stocks/{symbol}
        [HttpPut("{symbol}")]
        public IActionResult UpdateQuantity(string symbol, [FromBody] int quantity)
        {
            var stock = StockRepository.Stocks.FirstOrDefault(s => s.Symbol == symbol);
            if (stock == null) return NotFound();

            stock.Quantity = quantity;
            return Ok(stock);
        }

        // GET /api/stocks
        [HttpGet]
        public IActionResult GetStocks()
        {
            var stocks = StockRepository.Stocks.Select(s => new
            {
                s.Symbol,
                s.Quantity,
                AverageBuyPrice = s.Quantity == 0 ? 0 : (s.TotalInvested / s.Quantity),
                TotalInvested = s.TotalInvested,
                CurrentPrice = StockRepository.GetMockMarketPrice(s.Symbol),
                MarketValue = s.Quantity * StockRepository.GetMockMarketPrice(s.Symbol)
            });

            return Ok(stocks);
        }

        // GET /api/portfolio/value
        [HttpGet("/api/portfolio/value")]
        public IActionResult GetPortfolioValue()
        {
            var totalValue = StockRepository.Stocks.Sum(s =>
                s.Quantity * StockRepository.GetMockMarketPrice(s.Symbol));

            return Ok(new { TotalPortfolioValue = totalValue });
        }
    }
}

