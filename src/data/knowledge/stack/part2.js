import { text, list, code, table, tip, warn, flow } from './_h.js'

export default [
  {
    id: 'web-api',
    title: 'ASP.NET Core Web API (Controller)',
    emoji: '🎮',
    summary: 'สร้าง endpoint GET/POST/PUT/DELETE ให้ Angular เรียก',
    tags: ['controller', 'web api', 'asp.net core', 'route', 'httpget', 'httppost', 'program.cs', 'cors', 'swagger'],
    sections: [
      text(
        '**Controller** คือประตูหน้าบ้านของ API แต่ละ method = 1 endpoint 🚪\n\nหน้าที่ของ controller มีแค่ **รับ → ส่งต่อให้ service → ตอบกลับพร้อม status code** ส่วน logic ยาวๆ ไม่ควรอยู่ที่นี่',
      ),
      code(
        'csharp',
        `
[ApiController]                       // เปิด auto validation + binding ฉลาดขึ้น
[Route("api/[controller]")]           // → /api/products
public class ProductsController : ControllerBase
{
    private readonly IProductService _service;
    public ProductsController(IProductService service) => _service = service;

    // GET /api/products?search=ชา&page=1&pageSize=20
    [HttpGet]
    public async Task<ActionResult<PagedResult<ProductDto>>> Search(
        [FromQuery] string? search, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        => Ok(await _service.SearchAsync(search, page, pageSize));

    // GET /api/products/7
    [HttpGet("{id:int}")]
    public async Task<ActionResult<ProductDto>> GetById(int id)
    {
        var product = await _service.GetByIdAsync(id);
        return product is null ? NotFound() : Ok(product);
    }`,
        'ProductsController.cs (อ่าน)',
      ),
      code(
        'csharp',
        `
    // POST /api/products   body: { "name": "...", "categoryId": 1, ... }
    [HttpPost]
    public async Task<ActionResult<ProductDto>> Create(CreateProductRequest req)
    {
        var created = await _service.CreateAsync(req);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created); // 201
    }

    // PUT /api/products/7
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, CreateProductRequest req)
        => await _service.UpdateAsync(id, req) ? NoContent() : NotFound();

    // DELETE /api/products/7
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
        => await _service.DeleteAsync(id) ? NoContent() : NotFound();
}`,
        'ProductsController.cs (เขียน)',
      ),
      table(
        ['Attribute', 'ดึงค่าจาก', 'ตัวอย่าง'],
        [
          ['`[FromRoute]`', 'path ใน URL', '`/api/products/{id}`'],
          ['`[FromQuery]`', 'query string', '`?search=ชา&page=2`'],
          ['`[FromBody]`', 'JSON body', 'POST / PUT (class ซับซ้อนจะเดาเป็น body ให้เอง)'],
          ['`[FromHeader]`', 'HTTP header', '`X-Tenant-Id`'],
        ],
        'ข้อมูลเข้ามาทางไหน',
      ),
      table(
        ['คืนค่า', 'Status', 'ใช้เมื่อ'],
        [
          ['`Ok(data)`', '200', 'สำเร็จ มีข้อมูลส่งกลับ'],
          ['`CreatedAtAction(...)`', '201', 'สร้างใหม่สำเร็จ'],
          ['`NoContent()`', '204', 'สำเร็จแต่ไม่มีอะไรส่งกลับ (update/delete)'],
          ['`BadRequest(...)`', '400', 'ข้อมูลที่ส่งมาผิด'],
          ['`Unauthorized()`', '401', 'ยังไม่ login'],
          ['`Forbid()`', '403', 'login แล้วแต่ไม่มีสิทธิ์'],
          ['`NotFound()`', '404', 'หาไม่เจอ'],
        ],
        'ตอบกลับด้วยอะไรดี',
      ),
      code(
        'csharp',
        `
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();                       // หน้าเทส API
builder.Services.AddDbContext<AppDbContext>(o =>
    o.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddCors(o => o.AddPolicy("ng", p =>
    p.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();
if (app.Environment.IsDevelopment()) { app.UseSwagger(); app.UseSwaggerUI(); }
app.UseHttpsRedirection();
app.UseCors("ng");          // ต้องอยู่ก่อน auth และ MapControllers
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();`,
        'Program.cs — จุดเริ่มต้นของ API',
        'Swagger ต้องลง package `Swashbuckle.AspNetCore` (template .NET 9 ใช้ `AddOpenApi()` แทน)',
      ),
      code(
        'json',
        `
{
  "ConnectionStrings": {
    "Default": "Server=localhost;Database=ShopDb;Trusted_Connection=True;TrustServerCertificate=True"
  },
  "Logging": { "LogLevel": { "Default": "Information" } }
}`,
        'appsettings.json',
      ),
      code(
        'bash',
        `
dotnet new webapi -n ShopApi --use-controllers
cd ShopApi
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Swashbuckle.AspNetCore
dotnet run            # แล้วเปิด https://localhost:<port>/swagger`,
        'สร้างโปรเจกต์',
      ),
      tip('ทดสอบ API ใน **Swagger** ให้ผ่านก่อน แล้วค่อยต่อกับ Angular ถ้าพังจะได้รู้ว่าพังที่ฝั่งไหน 🕵️‍♀️'),
    ],
  },

  {
    id: 'service-di',
    title: 'Service Layer + Dependency Injection',
    emoji: '🧠',
    summary: 'แยก logic ออกจาก controller แล้วให้ .NET ฉีด (inject) ให้เอง',
    tags: ['service', 'di', 'dependency injection', 'scoped', 'transient', 'singleton', 'repository', 'interface'],
    sections: [
      text(
        '**Service** = ที่อยู่ของ business logic เช่น "ห้ามตั้งราคาติดลบ", "ลบแบบ soft delete"\n\n**Dependency Injection (DI)** = เราไม่ต้อง `new ProductService(...)` เอง แค่ประกาศใน constructor ว่าต้องใช้ แล้ว .NET จะสร้างและส่งเข้ามาให้ 💉',
      ),
      flow(
        [
          { icon: '📝', label: 'ลงทะเบียนใน Program.cs', desc: '`AddScoped<IProductService, ProductService>()`', side: 'server', arrow: 'มี request เข้ามา' },
          { icon: '🏭', label: 'DI Container สร้าง object', desc: 'สร้าง `AppDbContext` → `ProductService` → `ProductsController`', side: 'server', arrow: 'ส่งเข้า constructor' },
          { icon: '🎮', label: 'Controller ได้ service ไปใช้เลย', desc: 'จบ request ก็ทิ้ง (Scoped)', side: 'server' },
        ],
        'DI ทำงานยังไง',
      ),
      code(
        'csharp',
        `
public interface IProductService
{
    Task<PagedResult<ProductDto>> SearchAsync(string? search, int page, int pageSize);
    Task<ProductDto?> GetByIdAsync(int id);
    Task<ProductDto> CreateAsync(CreateProductRequest req);
    Task<bool> UpdateAsync(int id, CreateProductRequest req);
    Task<bool> DeleteAsync(int id);
}`,
        'IProductService.cs',
      ),
      code(
        'csharp',
        `
public class ProductService : IProductService
{
    private readonly AppDbContext _db;
    public ProductService(AppDbContext db) => _db = db;   // DI ส่ง DbContext มาให้

    public Task<ProductDto?> GetByIdAsync(int id) =>
        _db.Products.AsNoTracking()
            .Where(p => p.Id == id && p.IsActive)
            .Select(p => new ProductDto
            {
                Id = p.Id, Name = p.Name, CategoryName = p.Category!.Name,
                Price = p.Price, Stock = p.Stock,
            })
            .FirstOrDefaultAsync();

    public async Task<bool> DeleteAsync(int id)
    {
        var p = await _db.Products.FindAsync(id);
        if (p is null || !p.IsActive) return false;
        p.IsActive = false;                // soft delete = กฎของธุรกิจ
        await _db.SaveChangesAsync();
        return true;
    }
}`,
        'ProductService.cs (บางส่วน)',
      ),
      table(
        ['Lifetime', 'สร้างใหม่เมื่อ', 'เหมาะกับ'],
        [
          ['`AddTransient`', 'ทุกครั้งที่มีคนขอ', 'ของเล็กๆ ไม่มี state'],
          ['`AddScoped`', '1 ครั้งต่อ 1 request', '**DbContext, Service, Repository** (ใช้บ่อยสุด)'],
          ['`AddSingleton`', 'ครั้งเดียวตลอดอายุแอป', 'cache, config, `HttpClient` factory'],
        ],
        'อายุของ service',
      ),
      text(
        'บางทีมจะมีอีกชั้นคือ **Repository** ทำหน้าที่คุยกับ DB อย่างเดียว (เรียก SP, LINQ) แล้วให้ Service เรียก Repository อีกที\n\n`Controller → Service (logic) → Repository (data) → DB`\n\nข้อดีคือ ถ้าเปลี่ยนจาก LINQ เป็น SP ก็แก้แค่ Repository ส่วน Service ไม่ต้องแตะ',
        'แล้ว Repository ล่ะ?',
      ),
      warn('อย่าลงทะเบียน service ที่ใช้ `DbContext` เป็น **Singleton** เพราะ DbContext เป็น Scoped จะเจอ error ตอนสร้าง service หรือข้อมูลปนกันข้าม request'),
      tip('Angular ก็มี DI เหมือนกัน! `@Injectable({ providedIn: "root" })` + `inject(HttpClient)` เป็นแนวคิดเดียวกันเลย'),
    ],
  },

  {
    id: 'ef-core',
    title: 'Entity Framework Core (ORM)',
    emoji: '🗃️',
    summary: 'DbContext, migration, tracking: ให้ C# คุยกับ SQL Server แทนการเขียน SQL เอง',
    tags: ['ef core', 'entity framework', 'orm', 'dbcontext', 'migration', 'scaffold', 'database first', 'savechanges', 'include'],
    sections: [
      text(
        '**EF Core** คือ ORM (Object-Relational Mapper) ที่แปลง **class C# ↔ ตาราง** และ **LINQ ↔ SQL** ให้อัตโนมัติ 🪄\n\nตัวหลักคือ **DbContext** แทน "การเชื่อมต่อกับ DB 1 ครั้ง" และ **DbSet<T>** แทน "ตาราง 1 ตาราง"',
      ),
      code(
        'csharp',
        `
public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Category> Categories => Set<Category>();

    protected override void OnModelCreating(ModelBuilder b)
    {
        b.Entity<Product>(e =>
        {
            e.ToTable("Products");
            e.Property(p => p.Name).HasMaxLength(100).IsRequired();
            e.Property(p => p.Price).HasPrecision(10, 2);
            e.HasOne(p => p.Category)
             .WithMany(c => c.Products)
             .HasForeignKey(p => p.CategoryId);
        });
    }
}`,
        'AppDbContext.cs',
      ),
      table(
        ['', 'Code-first', 'Database-first'],
        [
          ['เริ่มจาก', 'เขียน class C# ก่อน', 'มี DB + ตาราง + SP อยู่แล้ว'],
          ['สร้าง/อัปเดต DB', '`dotnet ef migrations add` + `database update`', 'DBA / script SQL'],
          ['ได้ class มาจาก', 'เขียนเอง', '`dotnet ef dbcontext scaffold`'],
          ['เจอบ่อยใน', 'โปรเจกต์ใหม่', 'องค์กรที่ใช้ SP เยอะ'],
        ],
        '2 แนวทาง',
      ),
      code(
        'bash',
        `
dotnet tool install --global dotnet-ef
dotnet add package Microsoft.EntityFrameworkCore.Design

# Code-first
dotnet ef migrations add AddProductStock
dotnet ef database update

# Database-first: ดึงตารางที่มีอยู่มาเป็น class
dotnet ef dbcontext scaffold "Name=ConnectionStrings:Default" \\
  Microsoft.EntityFrameworkCore.SqlServer -o Models/Entities --context AppDbContext`,
        'คำสั่งที่ใช้บ่อย',
      ),
      code(
        'csharp',
        `
// INSERT
var p = new Product { Name = "ชาเขียว", CategoryId = 1, Price = 45m };
_db.Products.Add(p);
await _db.SaveChangesAsync();          // ได้ p.Id กลับมาเลย

// UPDATE (EF จำว่า property ไหนเปลี่ยน = change tracking)
var item = await _db.Products.FindAsync(7);
if (item is not null)
{
    item.Price = 49m;
    await _db.SaveChangesAsync();      // UPDATE Products SET Price=@p0 WHERE Id=@p1
}

// UPDATE ทีละหลายแถวโดยไม่ต้องโหลดมา (EF Core 7+)
await _db.Products.Where(x => x.Stock == 0)
    .ExecuteUpdateAsync(s => s.SetProperty(x => x.IsActive, false));`,
        'เพิ่ม / แก้ไข',
      ),
      list(
        [
          '`AsNoTracking()` ใส่ทุกครั้งที่ **อ่านอย่างเดียว** จะเร็วขึ้นและกิน memory น้อยลง',
          '`Include(p => p.Category)` = JOIN ดึงข้อมูลที่เกี่ยวข้องมาด้วย',
          '`Select(...)` ไปเป็น DTO ตรงๆ = ดึงเฉพาะคอลัมน์ที่ใช้ (ดีที่สุด)',
          '`SaveChangesAsync()` 1 ครั้ง = 1 transaction ครอบทุกการเปลี่ยนแปลง',
        ],
        'ท่าที่ควรจำ',
      ),
      code(
        'csharp',
        `
builder.Services.AddDbContext<AppDbContext>(o => o
    .UseSqlServer(builder.Configuration.GetConnectionString("Default"))
    .LogTo(Console.WriteLine, LogLevel.Information)   // พิมพ์ SQL ออก console
    .EnableSensitiveDataLogging());                    // โชว์ค่า parameter (dev เท่านั้น!)`,
        'อยากเห็น SQL ที่ EF สร้าง',
      ),
      warn('`EnableSensitiveDataLogging()` จะพิมพ์ค่าจริงของ parameter (อาจมีข้อมูลส่วนตัว) ใช้ตอน dev เท่านั้น ห้ามเปิดบน production'),
    ],
  },

  {
    id: 'linq-basics',
    title: 'LINQ พื้นฐาน',
    emoji: '🔗',
    summary: 'Where, Select, OrderBy, GroupBy... query ข้อมูลใน C# แบบ SQL',
    tags: ['linq', 'where', 'select', 'orderby', 'groupby', 'join', 'first', 'any', 'sum', 'ienumerable'],
    sections: [
      text(
        '**LINQ (Language Integrated Query)** คือชุดคำสั่ง query ที่อยู่ในภาษา C# เลย ใช้ได้กับ **List ในหน่วยความจำ**, **DB ผ่าน EF Core**, XML ฯลฯ ด้วย syntax เดียวกัน 🔗\n\nเบื้องหลังมันคือ **extension method** บน `IEnumerable<T>` ที่รับ **lambda** เข้าไป',
      ),
      code(
        'csharp',
        `
var products = new List<Product>
{
    new() { Id = 1, Name = "ชาเขียว",  CategoryId = 1, Price = 45,  Stock = 20 },
    new() { Id = 2, Name = "กาแฟเย็น", CategoryId = 1, Price = 55,  Stock = 0 },
    new() { Id = 3, Name = "คุกกี้",    CategoryId = 2, Price = 120, Stock = 8 },
};

// Method syntax (นิยมสุด)
var names = products
    .Where(p => p.Price < 100)        // กรอง
    .OrderBy(p => p.Price)            // เรียง
    .Select(p => p.Name)              // เลือก field
    .ToList();                        // → ["ชาเขียว", "กาแฟเย็น"]

// Query syntax (หน้าตาคล้าย SQL) ได้ผลเหมือนกัน
var names2 = (from p in products
              where p.Price < 100
              orderby p.Price
              select p.Name).ToList();`,
        'หน้าตาของ LINQ',
      ),
      table(
        ['LINQ', 'SQL', 'ทำอะไร'],
        [
          ['`Where(p => ...)`', '`WHERE`', 'กรองแถว'],
          ['`Select(p => ...)`', '`SELECT col`', 'เลือก/แปลงร่าง'],
          ['`OrderBy` / `OrderByDescending`', '`ORDER BY ... ASC/DESC`', 'เรียง'],
          ['`ThenBy`', '`ORDER BY a, b`', 'เรียงลำดับถัดไป'],
          ['`Skip(n).Take(m)`', '`OFFSET n ROWS FETCH NEXT m`', 'แบ่งหน้า'],
          ['`First` / `FirstOrDefault`', '`TOP 1`', 'เอาตัวแรก (ไม่เจอ: error / null)'],
          ['`Single` / `SingleOrDefault`', '`TOP 2` + เช็ก', 'ต้องเจอแค่ 1 ตัว'],
          ['`Any(p => ...)`', '`EXISTS`', 'มีสักตัวไหม'],
          ['`All(p => ...)`', '`NOT EXISTS (NOT ...)`', 'ทุกตัวผ่านเงื่อนไขไหม'],
          ['`Count` / `Sum` / `Average` / `Min` / `Max`', '`COUNT` / `SUM` / `AVG` / `MIN` / `MAX`', 'aggregate'],
          ['`GroupBy(p => p.CategoryId)`', '`GROUP BY`', 'จับกลุ่ม'],
          ['`Join(...)`', '`INNER JOIN`', 'รวม 2 ชุดข้อมูล'],
          ['`Distinct()`', '`SELECT DISTINCT`', 'ตัดซ้ำ'],
          ['`ToList` / `ToDictionary` / `ToArray`', '-', 'สั่งให้รันแล้วเก็บผล'],
        ],
        'LINQ ↔ SQL เทียบกันชัดๆ',
      ),
      code(
        'csharp',
        `
bool hasOutOfStock = products.Any(p => p.Stock == 0);          // true
decimal stockValue  = products.Sum(p => p.Price * p.Stock);     // 1860
var cookie = products.FirstOrDefault(p => p.Name == "คุกกี้");  // ไม่เจอ = null
var byId   = products.ToDictionary(p => p.Id);                  // byId[3].Name

var summary = products
    .GroupBy(p => p.CategoryId)
    .Select(g => new
    {
        CategoryId = g.Key,
        Count = g.Count(),
        AvgPrice = g.Average(p => p.Price),
    })
    .ToList();   // [{1, 2, 50}, {2, 1, 120}]`,
        'aggregate + GroupBy',
      ),
      code(
        'csharp',
        `
var categories = new List<Category>
{
    new() { Id = 1, Name = "เครื่องดื่ม" },
    new() { Id = 2, Name = "ขนม" },
};

var rows = products.Join(categories,
        p => p.CategoryId,          // key ฝั่ง products
        c => c.Id,                  // key ฝั่ง categories
        (p, c) => new { p.Name, Category = c.Name })
    .ToList();
// [{ ชาเขียว, เครื่องดื่ม }, { กาแฟเย็น, เครื่องดื่ม }, { คุกกี้, ขนม }]`,
        'Join',
      ),
      text(
        'LINQ **ยังไม่รันทันที** ตอนเขียน `.Where(...)` มันแค่ "จดสูตรไว้" จะรันจริงก็ต่อเมื่อเรียก `ToList()`, `First()`, `Count()`, `Sum()` หรือวน `foreach`\n\nข้อดีคือเราต่อเงื่อนไขทีละขั้นได้ แล้วค่อยรันทีเดียวตอนท้าย',
        'Deferred execution (รันทีหลัง)',
      ),
      tip('`First()` ไม่เจอจะ **throw exception** ส่วน `FirstOrDefault()` ไม่เจอจะได้ **null** ใน API ส่วนใหญ่ใช้ `FirstOrDefault` แล้วเช็ก null → `NotFound()`'),
    ],
  },

  {
    id: 'linq-ef',
    title: 'LINQ + EF Core → SQL',
    emoji: '🪄',
    summary: 'LINQ บน DbSet ถูกแปลงเป็น SQL ยังไง ค้นหา + แบ่งหน้า + ข้อควรระวัง',
    tags: ['linq', 'ef core', 'iqueryable', 'paging', 'search', 'n+1', 'tolistasync', 'projection'],
    sections: [
      text(
        'เวลาใช้ LINQ กับ `_db.Products` มันไม่ได้วนลูปใน C# นะ EF Core จะ **แปลงทั้งก้อนเป็น SQL** แล้วส่งให้ SQL Server รัน 🪄\n\nตัวที่ทำแบบนี้ได้คือ `IQueryable<T>` (ส่วน List ธรรมดาเป็น `IEnumerable<T>` จะรันใน memory)',
      ),
      flow(
        [
          { icon: '✍️', label: 'เขียน LINQ', desc: '`_db.Products.Where(p => p.Name.Contains(s))`', side: 'server', arrow: 'EF อ่าน expression tree' },
          { icon: '🔄', label: 'EF Core แปลงเป็น SQL', desc: 'ใส่ parameter ให้ (กัน SQL injection)', side: 'server', arrow: 'ตอนเรียก `ToListAsync()`' },
          { icon: '🛢️', label: 'SQL Server รัน', desc: "`WHERE [p].[Name] LIKE N'%' + @s + N'%'`", side: 'db', arrow: 'ส่ง rows กลับ' },
          { icon: '📦', label: 'ได้ List<ProductDto>', desc: 'map ให้อัตโนมัติ', side: 'server' },
        ],
      ),
      code(
        'csharp',
        `
public async Task<PagedResult<ProductDto>> SearchAsync(string? search, int page, int pageSize)
{
    IQueryable<Product> q = _db.Products.AsNoTracking().Where(p => p.IsActive);

    if (!string.IsNullOrWhiteSpace(search))
        q = q.Where(p => p.Name.Contains(search));     // ต่อเงื่อนไขได้เรื่อยๆ

    var total = await q.CountAsync();                   // SQL #1: SELECT COUNT(*)

    var items = await q
        .OrderBy(p => p.Name)
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .Select(p => new ProductDto
        {
            Id = p.Id, Name = p.Name, CategoryName = p.Category!.Name,
            Price = p.Price, Stock = p.Stock,
        })
        .ToListAsync();                                 // SQL #2: SELECT ... OFFSET/FETCH

    return new PagedResult<ProductDto>(items, total);
}`,
        'ค้นหา + แบ่งหน้า (ใช้จริงใน ProductService)',
        'ต้องมี `using Microsoft.EntityFrameworkCore;` ถึงจะมี `ToListAsync` / `CountAsync`',
      ),
      code(
        'sql',
        `
SELECT [p].[Id], [p].[Name], [c].[Name] AS [CategoryName], [p].[Price], [p].[Stock]
FROM [Products] AS [p]
INNER JOIN [Categories] AS [c] ON [p].[CategoryId] = [c].[Id]
WHERE [p].[IsActive] = CAST(1 AS bit)
  AND [p].[Name] LIKE N'%' + @search + N'%'
ORDER BY [p].[Name]
OFFSET @skip ROWS FETCH NEXT @take ROWS ONLY`,
        'SQL ที่ EF Core สร้างให้ (โดยประมาณ)',
        'เรียก `q.ToQueryString()` เพื่อดู SQL จริงตอน debug ได้',
      ),
      code(
        'csharp',
        `
// ❌ โหลดทั้งตารางมาก่อน แล้วค่อยกรองใน memory
var bad = _db.Products.ToList().Where(p => p.Price > 100);

// ✅ กรองใน DB ก่อน แล้วค่อยดึงมา
var good = await _db.Products.Where(p => p.Price > 100).ToListAsync();

// ❌ N+1: query 1 ครั้ง + อีก N ครั้งในลูป
foreach (var p in await _db.Products.ToListAsync())
    p.Category = await _db.Categories.FindAsync(p.CategoryId);

// ✅ JOIN ทีเดียว
var list = await _db.Products.Include(p => p.Category).ToListAsync();`,
        'กับดักที่เจอบ่อย',
      ),
      table(
        ['สถานการณ์', 'LINQ (EF Core)', 'Stored Procedure'],
        [
          ['CRUD ธรรมดา', '✅ เร็ว เขียนง่าย type-safe', 'ได้ แต่เขียนเยอะ'],
          ['ค้นหาหลายเงื่อนไขแบบ optional', '✅ ต่อ `Where` ได้สวย', 'ต้องเขียน `@x IS NULL OR ...`'],
          ['รายงานซับซ้อน / query หนักมาก', 'อาจได้ SQL ไม่ดี', '✅ จูน query เองได้'],
          ['logic ที่ DBA ดูแล / ระบบเก่า', '-', '✅ ใช้ของที่มีอยู่'],
          ['ทำหลายตารางใน transaction เดียว', '✅ `SaveChanges` ครั้งเดียว', '✅ `BEGIN TRAN` ใน SP'],
        ],
        'ใช้ LINQ หรือ SP ดี?',
      ),
      warn('method ของ C# บางตัว EF แปลงเป็น SQL ไม่ได้ (เช่น function ที่เราเขียนเอง) จะเจอ error "could not be translated" ให้ย้าย logic ไปไว้หลัง `ToListAsync()` หรือเขียนใหม่ด้วยของที่ EF รู้จัก'),
      tip('ใช้ `Select()` เป็น DTO ตรงๆ ดีกว่า `Include()` แล้วค่อย map เพราะ SQL จะดึงเฉพาะคอลัมน์ที่ใช้จริง'),
    ],
  },
]
