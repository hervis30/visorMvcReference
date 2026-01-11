
using WebVisor.Models.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Configurar HttpClient para FHIR
builder.Services.AddHttpClient<IFhirService, FhirService>((serviceProvider, client) =>
{
    var configuration = serviceProvider.GetRequiredService<IConfiguration>();
    var fhirSettings = configuration.GetSection("FhirSettings");

    client.BaseAddress = new Uri(fhirSettings["BaseUrl"]);
    client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", fhirSettings["SubscriptionKey"]);

    // Configurar timeout
    client.Timeout = TimeSpan.FromSeconds(30);
});

// Configurar CORS si es necesario
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("AllowAll");
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapControllers(); // Para API endpoints

app.Run();