import { text, list, steps, code, table, tip, warn, pairs, flow } from './_h.js'

export default [
  {
    id: 'stored-procedure',
    title: 'Stored Procedure (SQL Server)',
    emoji: '📜',
    summary: 'สูตร SQL ที่เก็บไว้ใน DB: สร้าง, ส่ง parameter, OUTPUT, transaction',
    tags: ['sp', 'stored procedure', 'sql server', 't-sql', 'exec', 'output', 'transaction', 'try catch', 'throw'],
    sections: [
      text(
        '**Stored Procedure (SP)** = ชุดคำสั่ง SQL ที่ตั้งชื่อแล้วเก็บไว้ใน SQL Server 📜 เวลาใช้แค่ `EXEC ชื่อ SP` พร้อม parameter\n\nทำไมองค์กรชอบใช้:\n🚀 SQL Server จำ execution plan ไว้ใช้ซ้ำได้\n🔒 ให้สิทธิ์แค่ EXEC SP ได้ โดยไม่ต้องให้สิทธิ์แตะตารางตรงๆ\n🧩 logic ซับซ้อนหลายตารางรวมไว้ที่เดียว\n🏛️ ระบบเก่ามี SP เยอะอยู่แล้ว แอปใหม่ก็เรียกใช้ต่อได้เลย',
      ),
      code(
        'sql',
        `
CREATE TABLE dbo.Categories (
    Id   INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL
);

CREATE TABLE dbo.Products (
    Id         INT IDENTITY(1,1) PRIMARY KEY,
    Name       NVARCHAR(100) NOT NULL,
    CategoryId INT NOT NULL REFERENCES dbo.Categories(Id),
    Price      DECIMAL(10,2) NOT NULL,
    Stock      INT NOT NULL DEFAULT 0,
    IsActive   BIT NOT NULL DEFAULT 1,
    CreatedAt  DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);`,
        'ตารางที่ใช้ในตัวอย่าง',
      ),
      code(
        'sql',
        `
CREATE OR ALTER PROCEDURE dbo.sp_SearchProducts
    @Search   NVARCHAR(100) = NULL,   -- = NULL คือ optional
    @Page     INT = 1,
    @PageSize INT = 20
AS
BEGIN
    SET NOCOUNT ON;   -- ไม่ต้องส่งข้อความ "(n rows affected)"

    SELECT p.Id, p.Name, c.Name AS CategoryName, p.Price, p.Stock
    FROM dbo.Products p
    JOIN dbo.Categories c ON c.Id = p.CategoryId
    WHERE p.IsActive = 1
      AND (@Search IS NULL OR p.Name LIKE N'%' + @Search + N'%')
    ORDER BY p.Name
    OFFSET (@Page - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;
END`,
        'SP อ่านข้อมูล: ค้นหา + แบ่งหน้า',
        'ชื่อคอลัมน์ที่ SELECT ออกมา (`Id`, `Name`, `CategoryName`...) ตรงกับ property ของ `ProductDto` พอดี',
      ),
      code(
        'sql',
        `
CREATE OR ALTER PROCEDURE dbo.sp_CreateProduct
    @Name       NVARCHAR(100),
    @CategoryId INT,
    @Price      DECIMAL(10,2),
    @Stock      INT = 0,
    @NewId      INT OUTPUT            -- ส่งค่ากลับออกไป
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;                -- error แล้ว rollback ให้อัตโนมัติ
    BEGIN TRY
        BEGIN TRAN;
        IF NOT EXISTS (SELECT 1 FROM dbo.Categories WHERE Id = @CategoryId)
            THROW 50001, N'ไม่พบหมวดหมู่นี้', 1;

        INSERT INTO dbo.Products (Name, CategoryId, Price, Stock)
        VALUES (@Name, @CategoryId, @Price, @Stock);

        SET @NewId = SCOPE_IDENTITY();
        COMMIT;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK;
        THROW;                        -- โยน error ต่อให้ .NET รู้
    END CATCH
END`,
        'SP เขียนข้อมูล: OUTPUT + transaction + error',
      ),
      code(
        'sql',
        `
EXEC dbo.sp_SearchProducts @Search = N'ชา', @Page = 1, @PageSize = 10;

DECLARE @id INT;
EXEC dbo.sp_CreateProduct
     @Name = N'ชาไทย', @CategoryId = 1, @Price = 40, @NewId = @id OUTPUT;
SELECT @id AS NewProductId;`,
        'ลองรันใน SSMS / Azure Data Studio',
      ),
      list(
        [
          'ใช้ `NVARCHAR` และใส่ `N\'...\'` หน้า string ภาษาไทยเสมอ ไม่งั้นจะกลายเป็น `???`',
          '`SET NOCOUNT ON` ทุก SP ช่วยลด traffic และกันบาง library สับสน',
          'ตั้งชื่อเป็นระบบ เช่น `sp_Get...`, `sp_Search...`, `sp_Create...` หรือตามมาตรฐานของทีม',
          '`THROW 50001, ...` ใช้เลข 50000 ขึ้นไปสำหรับ error ของเราเอง แล้วฝั่ง .NET จะจับได้จาก `SqlException.Number`',
        ],
        'นิสัยดีๆ',
      ),
      warn('ห้ามต่อ string เป็น SQL แล้ว `EXEC(@sql)` ด้วยค่าที่ผู้ใช้ส่งมา = เปิดประตูให้ **SQL injection** ถ้าจำเป็นต้องทำ dynamic SQL ให้ใช้ `sp_executesql` พร้อม parameter'),
    ],
  },

  {
    id: 'sp-from-dotnet',
    title: 'เรียก SP จาก .NET (EF Core / Dapper)',
    emoji: '📞',
    summary: 'ส่ง parameter เข้า SP แล้วได้ List<DTO> กลับมา 3 วิธี',
    tags: ['sp', 'stored procedure', 'dapper', 'ef core', 'fromsql', 'sqlquery', 'output parameter', 'repository', 'ado.net'],
    sections: [
      flow(
        [
          { icon: '🧠', label: 'Service / Repository', desc: '`SearchAsync("ชา", 1, 20)`', side: 'server', arrow: 'ส่ง parameter (ไม่ต่อ string!)' },
          { icon: '🔌', label: 'Dapper / EF Core', desc: 'สร้าง `SqlCommand` + `SqlParameter`', side: 'server', arrow: '`EXEC dbo.sp_SearchProducts @Search, @Page, @PageSize`' },
          { icon: '📜', label: 'Stored Procedure', desc: 'SQL Server รันสูตรที่เก็บไว้', side: 'db', arrow: 'คืน rows' },
          { icon: '📦', label: 'List<ProductDto>', desc: 'map ชื่อคอลัมน์ → ชื่อ property', side: 'server' },
        ],
      ),
      code(
        'csharp',
        `
// dotnet add package Dapper
// dotnet add package Microsoft.Data.SqlClient
using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;

public class ProductRepository(IConfiguration config) : IProductRepository
{
    private readonly string _cs = config.GetConnectionString("Default")!;

    public async Task<List<ProductDto>> SearchAsync(string? search, int page, int pageSize)
    {
        await using var conn = new SqlConnection(_cs);
        var rows = await conn.QueryAsync<ProductDto>(
            "dbo.sp_SearchProducts",
            new { Search = search, Page = page, PageSize = pageSize },
            commandType: CommandType.StoredProcedure);
        return rows.ToList();
    }
}`,
        'วิธีที่ 1: Dapper (นิยมสุดกับงาน SP)',
        'Dapper จับคู่ property ของ anonymous object `{ Search, Page, PageSize }` กับ `@Search`, `@Page`, `@PageSize` ให้เอง',
      ),
      code(
        'csharp',
        `
public async Task<int> CreateAsync(CreateProductRequest req)
{
    await using var conn = new SqlConnection(_cs);
    var p = new DynamicParameters(new
    {
        req.Name, req.CategoryId, req.Price, req.Stock,
    });
    p.Add("NewId", dbType: DbType.Int32, direction: ParameterDirection.Output);

    await conn.ExecuteAsync("dbo.sp_CreateProduct", p,
        commandType: CommandType.StoredProcedure);

    return p.Get<int>("NewId");      // ค่า OUTPUT จาก SP
}`,
        'Dapper + OUTPUT parameter',
      ),
      code(
        'csharp',
        `
// EF Core 8+: map ผลลัพธ์ SP เข้า DTO ที่ไม่ใช่ entity ได้เลย
var items = await _db.Database
    .SqlQuery<ProductDto>(
        $"EXEC dbo.sp_SearchProducts @Search = {search}, @Page = {page}, @PageSize = {pageSize}")
    .ToListAsync();

// SP ที่ไม่ได้คืนข้อมูล (INSERT/UPDATE/DELETE)
await _db.Database.ExecuteSqlAsync(
    $"EXEC dbo.sp_DeactivateProduct @Id = {id}");`,
        'วิธีที่ 2: EF Core',
        'ถึงจะเขียน `{search}` ใน `$"..."` แต่ EF แปลงเป็น `SqlParameter` ให้ ปลอดภัยจาก SQL injection',
      ),
      code(
        'csharp',
        `
await using var conn = new SqlConnection(_cs);
await using var cmd = new SqlCommand("dbo.sp_SearchProducts", conn)
{
    CommandType = CommandType.StoredProcedure,
};
cmd.Parameters.AddWithValue("@Search", (object?)search ?? DBNull.Value);
cmd.Parameters.AddWithValue("@Page", page);
cmd.Parameters.AddWithValue("@PageSize", pageSize);

await conn.OpenAsync();
await using var reader = await cmd.ExecuteReaderAsync();
var list = new List<ProductDto>();
while (await reader.ReadAsync())
    list.Add(new ProductDto
    {
        Id = reader.GetInt32(0), Name = reader.GetString(1),
        CategoryName = reader.GetString(2), Price = reader.GetDecimal(3), Stock = reader.GetInt32(4),
    });`,
        'วิธีที่ 3: ADO.NET (ดั้งเดิม เห็นทุกอย่าง)',
        'ค่า null ต้องส่งเป็น `DBNull.Value` ไม่ใช่ `null`',
      ),
      table(
        ['', 'Dapper', 'EF Core', 'ADO.NET'],
        [
          ['โค้ด', 'สั้น', 'สั้น', 'ยาว'],
          ['map ผลลัพธ์', 'อัตโนมัติ', 'อัตโนมัติ', 'เขียนเอง'],
          ['OUTPUT param', 'ง่าย (`DynamicParameters`)', 'ได้ (ใช้ `SqlParameter`)', 'ได้'],
          ['หลาย result set', '`QueryMultipleAsync`', 'ไม่ถนัด', '`NextResultAsync`'],
          ['เหมาะกับ', 'ทีมที่ใช้ SP เป็นหลัก', 'ทีมที่ใช้ EF อยู่แล้ว', 'งานพิเศษ / ต้องการคุมทุกอย่าง'],
        ],
        'เลือกแบบไหนดี',
      ),
      code(
        'csharp',
        `
// ใช้ LINQ กับงานง่าย และใช้ SP กับงานหนักในโปรเจกต์เดียวกันได้
builder.Services.AddDbContext<AppDbContext>(...);
builder.Services.AddScoped<IProductRepository, ProductRepository>();   // Dapper + SP
builder.Services.AddScoped<IProductService, ProductService>();         // เรียกทั้งสองแบบ`,
        'ใช้ร่วมกันได้นะ',
      ),
      warn('ชื่อคอลัมน์ที่ SP SELECT ออกมาต้อง **ตรงกับชื่อ property** ของ DTO (ไม่สนตัวพิมพ์เล็ก-ใหญ่) ถ้าไม่ตรงจะไม่ error แต่ค่าจะเป็น 0 / null เงียบๆ 😶 ให้ใช้ `AS CategoryName` ใน SP ช่วย'),
    ],
  },

  {
    id: 'angular-http',
    title: 'Angular เรียก API (HttpClient)',
    emoji: '🅰️',
    summary: 'Service + HttpClient + Component + template ฝั่ง client ครบวง',
    tags: ['angular', 'httpclient', 'service', 'observable', 'subscribe', 'signal', 'component', 'proxy', 'environment'],
    sections: [
      text(
        'ฝั่ง Angular แบ่งงานแบบเดียวกับ .NET เลย 🅰️\n\n**interface** = หน้าตาข้อมูล (คู่กับ DTO)\n**Service** = คุยกับ API ด้วย `HttpClient` (คู่กับ Controller)\n**Component** = เอาข้อมูลมาแสดงและรับ event จากผู้ใช้',
      ),
      code(
        'typescript',
        `
// src/app/app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};

// src/environments/environment.ts
export const environment = {
  apiUrl: '/api',   // ใช้คู่กับ proxy ตอน dev
};`,
        'ตั้งค่า HttpClient',
      ),
      code(
        'typescript',
        `
@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private api = environment.apiUrl + '/products';

  search(search = '', page = 1, pageSize = 20): Observable<PagedResult<Product>> {
    const params = new HttpParams()
      .set('search', search).set('page', page).set('pageSize', pageSize);
    return this.http.get<PagedResult<Product>>(this.api, { params });
  }

  getById(id: number) {
    return this.http.get<Product>(\`\${this.api}/\${id}\`);
  }

  create(body: CreateProductRequest) {
    return this.http.post<Product>(this.api, body);   // ส่งเป็น JSON ให้เอง
  }

  update(id: number, body: CreateProductRequest) {
    return this.http.put<void>(\`\${this.api}/\${id}\`, body);
  }

  remove(id: number) {
    return this.http.delete<void>(\`\${this.api}/\${id}\`);
  }
}`,
        'product.service.ts',
      ),
      table(
        ['Angular (ProductService)', 'HTTP', '.NET (ProductsController)'],
        [
          ['`search()`', '`GET /api/products?search=`', '`[HttpGet] Search()`'],
          ['`getById(7)`', '`GET /api/products/7`', '`[HttpGet("{id:int}")] GetById()`'],
          ['`create(body)`', '`POST /api/products`', '`[HttpPost] Create()`'],
          ['`update(7, body)`', '`PUT /api/products/7`', '`[HttpPut("{id:int}")] Update()`'],
          ['`remove(7)`', '`DELETE /api/products/7`', '`[HttpDelete("{id:int}")] Delete()`'],
        ],
        'จับคู่ 1:1 กับ Controller',
      ),
      code(
        'typescript',
        `
@Component({
  selector: 'app-product-list',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);

  products = signal<Product[]>([]);
  total = signal(0);
  loading = signal(false);
  search = '';

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.productService.search(this.search)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res) => { this.products.set(res.items); this.total.set(res.total); },
        error: (err) => console.error('โหลดสินค้าไม่สำเร็จ', err),
      });
  }
}`,
        'product-list.component.ts',
      ),
      code(
        'html',
        `
<input [(ngModel)]="search" (keyup.enter)="load()" placeholder="ค้นหาสินค้า" />
<button (click)="load()">ค้นหา</button>

@if (loading()) {
  <p>กำลังโหลด...</p>
}
<p>ทั้งหมด {{ total() }} รายการ</p>

<ul>
  @for (p of products(); track p.id) {
    <li>{{ p.name }} ({{ p.categoryName }}) — {{ p.price | number:'1.2-2' }} บาท</li>
  } @empty {
    <li>ไม่พบสินค้า 🥲</li>
  }
</ul>`,
        'product-list.component.html',
      ),
      code(
        'json',
        `
{
  "/api": {
    "target": "https://localhost:7001",
    "secure": false,
    "changeOrigin": true
  }
}`,
        'proxy.conf.json — ให้ ng serve ส่งต่อ /api ไป .NET (ไม่ต้องห่วง CORS ตอน dev)',
        'รันด้วย `ng serve --proxy-config proxy.conf.json` หรือใส่ `"proxyConfig"` ใน `angular.json`',
      ),
      tip('ถ้าโปรเจกต์ที่ทำงานเป็น Angular รุ่นเก่า (ใช้ NgModule) ก็แค่เปลี่ยนจาก `provideHttpClient()` เป็น `HttpClientModule` ใน `imports` ของ module, ใช้ `constructor(private http: HttpClient)` แทน `inject()` และใช้ `*ngFor` / `*ngIf` แทน `@for` / `@if` หลักการเหมือนเดิมทุกอย่าง'),
      warn('Observable จาก HttpClient **ไม่ยิง request จนกว่าจะ subscribe** และถ้า subscribe 2 ครั้งก็จะยิง 2 ครั้ง! ใน template ใช้ `async` pipe ได้ เพราะมันจะ subscribe / unsubscribe ให้เอง'),
    ],
  },

  {
    id: 'auth-jwt',
    title: 'Login + JWT (Angular ↔ .NET)',
    emoji: '🔐',
    summary: 'login ได้ token → interceptor แนบทุก request → .NET ตรวจด้วย [Authorize]',
    tags: ['jwt', 'auth', 'login', 'interceptor', 'authorize', 'token', 'bearer', 'role'],
    sections: [
      flow(
        [
          { icon: '🙋‍♀️', label: 'Login form', desc: 'ส่ง username + password', side: 'client', arrow: '`POST /api/auth/login`' },
          { icon: '🔑', label: 'AuthController', desc: 'ตรวจรหัสผ่าน แล้วสร้าง JWT ที่มี claims (id, role)', side: 'server', arrow: '`{ token: "eyJ..." }`' },
          { icon: '💾', label: 'Angular เก็บ token', desc: 'เช่นใน memory / localStorage', side: 'client', arrow: 'request ถัดๆ ไป' },
          { icon: '🧷', label: 'authInterceptor', desc: 'แนบ `Authorization: Bearer <token>` ให้ทุก request', side: 'client', arrow: 'HTTP' },
          { icon: '🛡️', label: 'JwtBearer middleware', desc: 'ตรวจลายเซ็น + วันหมดอายุ', side: 'server', arrow: 'ผ่าน → เข้า controller' },
          { icon: '🎮', label: '[Authorize] Controller', desc: 'อ่าน `User` (claims) ได้เลย', side: 'server' },
        ],
        'ทั้งวงจร',
      ),
      code(
        'csharp',
        `
// dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(o => o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)),
    });
builder.Services.AddAuthorization();`,
        'Program.cs: เปิดใช้ JWT',
      ),
      code(
        'csharp',
        `
private string CreateToken(User user)
{
    var claims = new[]
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Name, user.Username),
        new Claim(ClaimTypes.Role, user.Role),
    };
    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
    var token = new JwtSecurityToken(
        issuer: _config["Jwt:Issuer"],
        audience: _config["Jwt:Audience"],
        claims: claims,
        expires: DateTime.UtcNow.AddHours(8),
        signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256));
    return new JwtSecurityTokenHandler().WriteToken(token);
}`,
        'สร้าง token ตอน login สำเร็จ',
      ),
      code(
        'csharp',
        `
[Authorize]                                  // ทุก action ต้อง login
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [AllowAnonymous]                         // อันนี้ไม่ต้อง login
    [HttpGet]
    public async Task<IActionResult> Search(string? search) { /* ... */ }

    [Authorize(Roles = "Admin")]             // ต้องเป็น Admin
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);  // ใครลบ
        /* ... */
    }
}`,
        'ล็อก endpoint',
      ),
      code(
        'typescript',
        `
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (!token) return next(req);
  return next(req.clone({ setHeaders: { Authorization: \`Bearer \${token}\` } }));
};

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) router.navigate(['/login']);   // token หมดอายุ
      return throwError(() => err);
    }),
  );
};`,
        'Angular interceptor',
        'อย่าลืมใส่ทั้งสองตัวใน `withInterceptors([authInterceptor, errorInterceptor])`',
      ),
      warn('`Jwt:Key` ต้องยาวพอ (HS256 อย่างน้อย 32 ตัวอักษร) และห้าม commit ลง git ให้เก็บใน **User Secrets** ตอน dev หรือใน environment variable / Key Vault บน server'),
      tip('401 = "เธอเป็นใคร? ยังไม่ login" ส่วน 403 = "รู้ว่าเป็นใคร แต่ไม่มีสิทธิ์" 🙅‍♀️'),
    ],
  },

  {
    id: 'validation-errors',
    title: 'Validation & Error ทั้งสองฝั่ง',
    emoji: '🚨',
    summary: 'ตรวจข้อมูลที่ Angular + .NET + SP แล้วส่ง error กลับไปแสดงสวยๆ',
    tags: ['validation', 'error', 'problemdetails', 'reactive form', 'exception', 'sqlexception', '400', '500'],
    sections: [
      text('ตรวจ **3 ชั้น** ปลอดภัยสุด 🛡️ ฝั่ง Angular ตรวจเพื่อให้ผู้ใช้เห็น error ทันที, ฝั่ง .NET ตรวจเพราะ request อาจไม่ได้มาจากหน้าเว็บเราเสมอไป และ DB / SP ตรวจกฎที่ต้องดูข้อมูลจริงในตาราง'),
      flow(
        [
          { icon: '📝', label: 'Angular Reactive Form', desc: '`Validators.required`, `min`, `maxLength`', side: 'client', arrow: 'ผ่าน → ส่ง POST' },
          { icon: '🏷️', label: '.NET DataAnnotations', desc: '`[Required]`, `[Range]` → ไม่ผ่านตอบ **400** อัตโนมัติ', side: 'server', arrow: 'ผ่าน → service' },
          { icon: '📜', label: 'SP / DB constraint', desc: '`THROW 50001` หรือ FK / UNIQUE ไม่ผ่าน', side: 'db', arrow: '`SqlException`' },
          { icon: '🧯', label: 'Exception handler', desc: 'แปลงเป็น JSON error ที่อ่านง่าย', side: 'server', arrow: 'HTTP 400 / 404 / 500' },
          { icon: '💬', label: 'Angular แสดงข้อความ', desc: 'อ่านจาก `err.error`', side: 'client' },
        ],
      ),
      code(
        'json',
        `
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "Name": ["กรุณาใส่ชื่อสินค้า"],
    "CategoryId": ["กรุณาเลือกหมวดหมู่"]
  }
}`,
        '400 ที่ [ApiController] ตอบให้อัตโนมัติ (ProblemDetails)',
      ),
      code(
        'csharp',
        `
// Program.cs — จับ exception ทุกตัวไว้ที่เดียว
app.UseExceptionHandler(errApp => errApp.Run(async ctx =>
{
    var ex = ctx.Features.Get<IExceptionHandlerFeature>()?.Error;
    var (status, title) = ex switch
    {
        SqlException { Number: 50001 } s => (400, s.Message),   // THROW จาก SP
        KeyNotFoundException => (404, "ไม่พบข้อมูล"),
        _ => (500, "ระบบขัดข้อง ลองใหม่อีกครั้งนะ"),
    };
    ctx.Response.StatusCode = status;
    await ctx.Response.WriteAsJsonAsync(new { status, title });
}));`,
        '.NET: จัดการ error กลาง',
        'ข้อความจาก `THROW 50001, N\'ไม่พบหมวดหมู่นี้\', 1` ใน SP จะไปโผล่ที่ `s.Message`',
      ),
      code(
        'typescript',
        `
private fb = inject(FormBuilder);
form = this.fb.nonNullable.group({
  name: ['', [Validators.required, Validators.maxLength(100)]],
  categoryId: [0, [Validators.min(1)]],
  price: [0, [Validators.min(0.01)]],
  stock: [0, [Validators.min(0)]],
});
serverErrors: Record<string, string[]> = {};
errorMessage = '';

save() {
  if (this.form.invalid) { this.form.markAllAsTouched(); return; }
  this.productService.create(this.form.getRawValue()).subscribe({
    next: (p) => this.router.navigate(['/products', p.id]),
    error: (err: HttpErrorResponse) => {
      this.serverErrors = err.error?.errors ?? {};          // 400 validation
      this.errorMessage = err.error?.title ?? 'เกิดข้อผิดพลาด';
    },
  });
}`,
        'Angular: form + แสดง error จาก server',
      ),
      code(
        'html',
        `
<form [formGroup]="form" (ngSubmit)="save()">
  <input formControlName="name" placeholder="ชื่อสินค้า" />
  @if (form.controls.name.touched && form.controls.name.hasError('required')) {
    <small class="error">กรุณาใส่ชื่อสินค้า</small>
  }
  @for (msg of serverErrors['Name'] ?? []; track msg) {
    <small class="error">{{ msg }}</small>
  }
  <button type="submit">บันทึก</button>
  @if (errorMessage) { <p class="error">{{ errorMessage }}</p> }
</form>`,
        'template',
      ),
      warn('อย่าส่ง `ex.Message` / stack trace ของ error 500 กลับไปให้ client เพราะอาจเผยชื่อตาราง, SQL หรือ path ของ server ให้ log ไว้ฝั่ง server แทน'),
    ],
  },

  {
    id: 'build-feature',
    title: 'ลงมือทำ 1 ฟีเจอร์ตั้งแต่ DB ถึงหน้าจอ',
    emoji: '🛠️',
    summary: 'checklist ทีละขั้น: SP → DTO → Repository → Controller → Angular',
    tags: ['checklist', 'end to end', 'feature', 'workflow', 'step by step'],
    sections: [
      text('ได้งานใหม่มาว่า "ทำหน้าค้นหาสินค้า" ให้ทำตามลำดับนี้ จะไม่หลงและ debug ง่าย ✅ (โค้ดของแต่ละขั้นอยู่ในเรื่องก่อนๆ ของหมวดนี้)'),
      steps(
        [
          '**SQL**: สร้าง/เช็กตาราง แล้วเขียน `dbo.sp_SearchProducts` (ดูเรื่อง Stored Procedure)',
          '**ลองรัน SP** ใน SSMS ด้วย `EXEC ...` ให้ได้ผลถูกต้องก่อน',
          '**DTO**: สร้าง `ProductDto` ให้ property ตรงกับคอลัมน์ที่ SP คืนมา',
          '**Repository**: เรียก SP ด้วย Dapper / EF Core → `List<ProductDto>`',
          '**Service**: เพิ่ม logic เช่น จำกัด `pageSize` ไม่เกิน 100',
          '**Controller**: เพิ่ม `[HttpGet]` endpoint แล้วลงทะเบียน DI ใน `Program.cs`',
          '**เทสใน Swagger** ให้ได้ 200 + JSON ถูกต้อง',
          '**Angular model**: เขียน `interface Product` ให้ตรงกับ JSON (camelCase)',
          '**Angular service**: เพิ่ม method `search()` ด้วย `HttpClient`',
          '**Component + template**: เรียก service, เก็บผลลัพธ์ใน signal, แสดงด้วย `@for`',
          '**เทสในเบราว์เซอร์**: เปิด DevTools → Network ดู request/response จริง',
        ],
        'ทีละขั้น',
      ),
      code(
        'text',
        `
[SSMS]     EXEC dbo.sp_SearchProducts @Search = N'ชา'      ✔ ได้ 3 แถว
[Swagger]  GET /api/products?search=ชา                     ✔ 200 {"items":[...],"total":3}
[Browser]  Network → products?search=... → Preview         ✔ เห็น 3 รายการ
[หน้าจอ]   ชาเขียว, ชาไทย, ชามะนาว                          ✔ 🎉`,
        'เทสทีละชั้น ถ้าพังจะรู้ทันทีว่าพังที่ไหน',
      ),
      table(
        ['สิ่งที่ต้องตรงกัน', 'ฝั่ง A', 'ฝั่ง B'],
        [
          ['ชื่อคอลัมน์', 'SP: `c.Name AS CategoryName`', 'DTO: `CategoryName`'],
          ['ชื่อ field ใน JSON', 'DTO: `CategoryName`', 'Angular: `categoryName`'],
          ['URL', 'Controller: `api/products`', 'Angular: `/api/products`'],
          ['HTTP method', '`[HttpPost]`', '`http.post()`'],
          ['ชื่อ query param', '`[FromQuery] string? search`', '`HttpParams().set("search", ...)`'],
          ['type', '`decimal` / `int` / `DateTime`', '`number` / `number` / `string` (ISO)'],
        ],
        'จุดที่ต้องตรงกันทั้งสาย',
      ),
      tip('`DateTime` จาก .NET จะมาถึง Angular เป็น **string** เช่น `"2026-10-07T09:30:00Z"` ไม่ใช่ `Date` ถ้าจะคำนวณให้ `new Date(value)` ก่อน หรือแสดงผลด้วย `date` pipe'),
    ],
  },

  {
    id: 'debug-stack',
    title: 'Debug: error ที่เจอบ่อยทั้งสาย',
    emoji: '🐞',
    summary: 'CORS, 404, 415, 401, ค่า undefined... เห็นอาการแล้วรู้เลยว่าแก้ตรงไหน',
    tags: ['debug', 'cors', 'error', '404', '415', '401', '500', 'swagger', 'network', 'breakpoint'],
    sections: [
      table(
        ['อาการ', 'สาเหตุที่เป็นไปได้', 'แก้ที่'],
        [
          ['Console ขึ้น **CORS error**', '.NET ไม่ได้ `AddCors`/`UseCors`, origin ไม่ตรง port 4200, หรือ `UseCors` อยู่ผิดลำดับ', '.NET `Program.cs` (หรือใช้ proxy)'],
          ['**404 Not Found**', 'URL / route ไม่ตรง เช่น `api/product` vs `api/products`, ลืม `{id:int}`', 'Controller route / Angular URL'],
          ['**405 Method Not Allowed**', 'ใช้ `post` แต่ endpoint เป็น `[HttpPut]`', 'ให้ method ตรงกัน'],
          ['**415 Unsupported Media Type**', 'ส่ง body ที่ไม่ใช่ JSON / Content-Type ผิด', 'ส่ง object ให้ `HttpClient` (มันใส่ JSON ให้เอง)'],
          ['**400 Bad Request**', 'validation ไม่ผ่าน หรือ JSON field ผิด type', 'อ่าน `errors` ใน response'],
          ['**401 / 403**', 'ไม่มี token, token หมดอายุ, role ไม่พอ', 'interceptor / `[Authorize]`'],
          ['**500**', 'exception ฝั่ง server (null, SQL error)', 'ดู log + ตั้ง breakpoint ใน VS'],
          ['`ERR_CONNECTION_REFUSED`', 'API ไม่ได้รัน หรือ port ผิด', 'รัน API + เช็ก `launchSettings.json`'],
          ['ค่าใน Angular เป็น `undefined`', 'ชื่อ field ไม่ตรง (PascalCase vs camelCase)', 'interface ↔ DTO'],
          ['ค่าจาก SP เป็น 0 / null หมด', 'ชื่อคอลัมน์ SP ไม่ตรงชื่อ property', 'ใช้ `AS` ใน SP'],
          ['ภาษาไทยเป็น `???`', 'คอลัมน์เป็น `VARCHAR` หรือลืม `N\'...\'`', 'ใช้ `NVARCHAR` + `N` prefix'],
          ['เวลาเพี้ยน 7 ชั่วโมง', 'ปน UTC กับเวลาไทย', 'เก็บเป็น UTC แล้วแปลงตอนแสดง'],
        ],
        'อาการ → สาเหตุ → แก้ตรงไหน',
      ),
      steps(
        [
          '**Network tab**: request ออกไปไหม? URL, method, body, status ถูกไหม',
          'ถ้า request ไม่ออกเลย → ปัญหาฝั่ง Angular (ลืม subscribe? error ก่อนยิง?)',
          'ถ้าได้ status ผิด → ลองยิง endpoint เดียวกันใน **Swagger**',
          'ถ้า Swagger ก็พัง → ตั้ง **breakpoint** ใน Controller / Service แล้วกด F5 ใน Visual Studio',
          'ถ้าโค้ด .NET ดูถูกแต่ข้อมูลผิด → ดู SQL ที่รันจริง (EF log / SQL Profiler) แล้วลองรันใน SSMS',
        ],
        'ลำดับการไล่หาบั๊ก (จากหน้าบ้านเข้าหลังบ้าน)',
      ),
      code(
        'bash',
        `
dotnet dev-certs https --trust     # แก้ปัญหา https cert ตอน dev
dotnet watch run                   # แก้โค้ดแล้ว API reload เอง
ng serve --proxy-config proxy.conf.json`,
        'คำสั่งช่วยชีวิต',
      ),
      tip('เวลาถามเพื่อนหรือ AI ให้แนบ **status code + response body + โค้ดของทั้งสองฝั่ง** จะช่วยให้หาเจอเร็วขึ้นเยอะเลย 💡'),
    ],
  },

  {
    id: 'other-stacks',
    title: 'Stack อื่นๆ ใช้อะไรคู่กับอะไร',
    emoji: '🧭',
    summary: 'MEAN, MERN, Next.js, Django, Spring... และเทียบ concept กับ .NET',
    tags: ['stack', 'mean', 'mern', 'nextjs', 'django', 'spring', 'laravel', 'compare', 'nestjs'],
    sections: [
      text('พอเข้าใจ Angular + .NET แล้ว stack อื่นก็คือ **โครงเดิม แค่เปลี่ยนเครื่องมือ** 🧭 ทุกตัวยังเป็น `Client → API → Logic → ORM/Query → DB` เหมือนเดิม'),
      table(
        ['Stack', 'Frontend', 'Backend', 'ORM / Query', 'Database'],
        [
          ['**.NET + Angular** (ของเรา)', 'Angular', 'ASP.NET Core', 'EF Core / Dapper / SP', 'SQL Server'],
          ['MEAN', 'Angular', 'Express (Node.js)', 'Mongoose', 'MongoDB'],
          ['MERN', 'React', 'Express (Node.js)', 'Mongoose', 'MongoDB'],
          ['Next.js full-stack', 'React (Next.js)', 'Next.js API / Server Actions', 'Prisma / Drizzle', 'PostgreSQL'],
          ['NestJS + Angular', 'Angular', 'NestJS', 'TypeORM / Prisma', 'PostgreSQL / MySQL'],
          ['Spring + React', 'React / Angular', 'Spring Boot (Java)', 'JPA / Hibernate', 'Oracle / PostgreSQL'],
          ['Django + React', 'React', 'Django REST Framework', 'Django ORM', 'PostgreSQL'],
          ['Laravel + Vue', 'Vue', 'Laravel (PHP)', 'Eloquent', 'MySQL'],
          ['Flutter + Firebase', 'Flutter (มือถือ)', 'Firebase (serverless)', 'Firestore SDK', 'Firestore'],
        ],
        'Stack ยอดนิยม',
      ),
      table(
        ['Concept', '.NET', 'Node (NestJS)', 'Java (Spring)', 'Python (Django/FastAPI)'],
        [
          ['Controller', '`ControllerBase` + `[HttpGet]`', '`@Controller` + `@Get()`', '`@RestController` + `@GetMapping`', '`APIView` / `@app.get()`'],
          ['DI', 'built-in `AddScoped`', 'built-in `@Injectable`', '`@Autowired` / constructor', 'FastAPI `Depends()`'],
          ['ORM', 'EF Core', 'TypeORM / Prisma', 'JPA / Hibernate', 'Django ORM / SQLAlchemy'],
          ['Query แบบ LINQ', 'LINQ', 'Prisma query / QueryBuilder', 'JPQL / Criteria / Stream API', 'QuerySet (`filter()`)'],
          ['DTO validation', 'DataAnnotations', 'class-validator', 'Bean Validation (`@NotNull`)', 'Pydantic'],
          ['Migration', '`dotnet ef`', '`prisma migrate`', 'Flyway / Liquibase', '`manage.py migrate` / Alembic'],
          ['Package manager', 'NuGet', 'npm', 'Maven / Gradle', 'pip / poetry'],
        ],
        'เทียบ concept ข้ามภาษา',
      ),
      tip('ถ้าวันหนึ่งต้องย้ายไปทำ stack อื่น ให้หาว่า "**Controller / DI / ORM / DTO validation** ของมันชื่ออะไร" แล้วจะเรียนได้เร็วมากเพราะหลักการเหมือนกันหมด 🌱'),
      pairs(['REST', 'JSON', 'JWT', 'Docker', 'CI/CD', 'Swagger / OpenAPI', 'Git']),
    ],
  },
]
