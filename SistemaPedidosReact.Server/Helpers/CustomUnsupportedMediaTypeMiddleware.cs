using System.Net;
using System.Text.Json;

namespace SistemaPedidosReact.Server.Helpers
{
    public class CustomUnsupportedMediaTypeMiddleware
    {
        private readonly RequestDelegate _next;

        public CustomUnsupportedMediaTypeMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);

                if (context.Response.StatusCode == StatusCodes.Status415UnsupportedMediaType)
                {
                    // Set a custom error message
                    var errorResponse = new { message = "The content type of your request is not supported. Please ensure you are sending data in a supported format (e.g., application/json)." };
                    await context.Response.WriteAsync(JsonSerializer.Serialize(errorResponse));
                }
            }
            catch (BadHttpRequestException ex) when (ex.StatusCode == (int)HttpStatusCode.UnsupportedMediaType)
            {
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.UnsupportedMediaType;
                var errorResponse = new { message = "The content type of your request is not supported. Please ensure you are sending data in a supported format (e.g., application/json)." };
                await context.Response.WriteAsync(JsonSerializer.Serialize(errorResponse));
            }
        }
    }
}
