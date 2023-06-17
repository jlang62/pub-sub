using Dapr;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

// Dapr configurations
app.UseCloudEvents();

app.MapSubscribeHandler();

app.MapPost("/ready", [Topic("pubsub", "ready")] (ILogger<Program> logger, MessageEvent item) => {
    Console.WriteLine($"{item.MessageType}: {item.Message}");
    return Results.Ok();
});

app.MapPost("/outofstock", [Topic("pubsub", "outofstock")] (ILogger<Program> logger, MessageEvent item) => {
    Console.WriteLine($"{item.MessageType}: {item.Message}");
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