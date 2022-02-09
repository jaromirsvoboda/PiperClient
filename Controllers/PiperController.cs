using Microsoft.AspNetCore.Mvc;

namespace Piper.Controllers;

[ApiController]
[Route("[controller]")]
public class PiperController : ControllerBase
{
    private readonly ILogger<PiperController> _logger;

    public PiperController(ILogger<PiperController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public void Get()
    {
        var a = 14;
        // return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        // {
        //     Date = DateTime.Now.AddDays(index),
        //     TemperatureC = Random.Shared.Next(-20, 55),
        //     Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        // })
        // .ToArray();
    }

    [HttpPost]
    public void Post(IFormFile file) {
        var a = 14;
    }
}
