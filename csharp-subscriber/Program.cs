using Dapr;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

// Dapr configurations
app.UseCloudEvents();

app.MapSubscribeHandler();

List<Order> orders = new();


app.MapGet("/pickup", () => {
    return Results.Ok(orders);
});

app.MapPost("/ready", [Topic("pubsub", "ready")] (ILogger<Program> logger, MessageEvent item) => {
    orders.Add(new Order { Id = orders.Count + 1, OrderItem = item.Message });
    Console.WriteLine($"{item.MessageType}: {item.Message}");
    return Results.Ok();
});

app.MapPost("/pickup/{id}", (int id) => {
    var order = orders.FirstOrDefault(o => o.Id == id);
    if (order is null)
    {
        return Results.NotFound();
    }

    orders.Remove(order);
    return Results.Ok();
});

// app.MapPost("/hurry", [Topic("pubsub", "hurry")] (ILogger<Program> logger, MessageEvent item) => {
//     Console.WriteLine($"{item.MessageType}: {item.Message}");
//     return Results.Ok();
// });

// app.MapPost("/hour", [Topic("pubsub", "hour")] (ILogger<Program> logger, Dictionary<string, string> item) => {
//     Console.WriteLine($"{item["messageType"]}: {item["message"]}");
//     return Results.Ok();
// });

app.Run();

internal record MessageEvent(string MessageType, string Message);

public class Order
{
    public int Id { get; set; }

    public string OrderItem { get; set; } = null!;
}