namespace SistemaPedidosReact.Server.Helpers
{
    public class KeepAliveService : BackgroundService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<KeepAliveService> _logger;

        public KeepAliveService(HttpClient httpClient, ILogger<KeepAliveService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    // Hacer una request a tu propia aplicación cada 5 minutos
                    var response = await _httpClient.GetAsync("https://elrefugioalmacen.com/api/health", stoppingToken);
                    Console.WriteLine("Keep-alive executed: " + response.StatusCode);
                    _logger.LogInformation("Keep-alive executed: {StatusCode}", response.StatusCode);
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Keep-alive failed. " + ex.Message);
                    _logger.LogWarning(ex, "Keep-alive failed");
                }

                // Esperar 5 minutos antes del próximo keep-alive
                await Task.Delay(TimeSpan.FromMinutes(3), stoppingToken);
            }
        }
    }
}
