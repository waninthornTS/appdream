import { text, list, code, table, tip, warn, pairs, flow } from './_h.js'

export default [
  {
    id: 'big-picture',
    title: 'ภาพรวม Angular + .NET + SQL Server',
    emoji: '🗺️',
    summary: 'แต่ละชิ้นอยู่ตรงไหน ทำหน้าที่อะไร คุยกันยังไง',
    tags: ['overview', 'architecture', 'angular', 'dotnet', 'sql server', 'layer'],
    sections: [
      text(
        'งานแบบนี้มี 3 ส่วนหลักที่ต้องคุยกัน 🍃\n\n**Angular** = หน้าบ้าน (client) ที่ผู้ใช้กดเล่น\n**ASP.NET Core Web API (C#)** = หลังบ้าน (server) รับคำขอแล้วประมวลผล\n**SQL Server** = โกดังเก็บข้อมูล ซึ่งมี **Stored Procedure (SP)** เป็นสูตรสำเร็จที่เก็บไว้ในโกดัง\n\nAngular ไม่เคยแตะ database ตรงๆ เลยนะ! ทุกอย่างต้องผ่าน API เสมอ',
        'มีใครอยู่บ้าง',
      ),
      flow(
        [
          { icon: '🅰️', label: 'Angular', desc: 'Component + Service + HttpClient', side: 'client', arrow: 'HTTP + JSON' },
          { icon: '🎮', label: 'Controller', desc: 'รับ request ตรวจข้อมูล ส่งต่อ', side: 'server', arrow: 'เรียก method' },
          { icon: '🧠', label: 'Service', desc: 'business logic / กฎของระบบ', side: 'server', arrow: 'ขอข้อมูล' },
          { icon: '🗃️', label: 'EF Core (LINQ) หรือ Dapper (SP)', desc: 'แปลง C# ↔ SQL', side: 'server', arrow: 'SQL / EXEC sp_...' },
          { icon: '🛢️', label: 'SQL Server', desc: 'ตาราง + Stored Procedure', side: 'db' },
        ],
        'ภาพเดียวจบ',
      ),
      text(
        '👩‍🍳 **ลูกค้า (Angular)** สั่งอาหารผ่านแอป\n🧾 **พนักงานรับออร์เดอร์ (Controller)** เช็กว่าสั่งครบไหม แล้วส่งเข้าครัว\n🧑‍🍳 **เชฟ (Service)** รู้สูตร รู้กฎ เช่น "ห้ามขายของหมดสต็อก"\n🧺 **คนเดินไปคลัง (EF Core / Dapper)** ไปหยิบวัตถุดิบ\n🏬 **คลัง (SQL Server)** มีของเก็บอยู่ ส่วน **SP** คือสูตรที่แปะไว้ในคลัง สั่งชื่อสูตรแล้วได้ของเลย\n🍱 **จานที่เสิร์ฟ (DTO)** จัดเฉพาะสิ่งที่ลูกค้าควรเห็น ไม่ยกวัตถุดิบดิบๆ ไปทั้งกระสอบ',
        'เทียบกับร้านอาหาร',
      ),
      table(
        ['Layer', 'อยู่ที่', 'หน้าที่', 'ตัวอย่างไฟล์'],
        [
          ['Component', 'Angular', 'แสดงผล + รับ event จากผู้ใช้', '`product-list.component.ts`'],
          ['Service (ng)', 'Angular', 'เรียก API ด้วย `HttpClient`', '`product.service.ts`'],
          ['Model (ng)', 'Angular', 'interface บอกหน้าตา JSON', '`product.model.ts`'],
          ['Controller', '.NET', 'กำหนด URL + HTTP method, คืน status code', '`ProductsController.cs`'],
          ['DTO / Request', '.NET', 'รูปร่างข้อมูลเข้า-ออก API', '`ProductDto.cs`'],
          ['Service', '.NET', 'logic ของธุรกิจ', '`ProductService.cs`'],
          ['Repository / DbContext', '.NET', 'คุยกับ DB (LINQ หรือ SP)', '`AppDbContext.cs`'],
          ['Entity', '.NET', 'class ที่ตรงกับตาราง', '`Product.cs`'],
          ['Table / SP', 'SQL Server', 'เก็บข้อมูล / query สำเร็จรูป', '`dbo.sp_SearchProducts`'],
        ],
        'ใครทำอะไร',
      ),
      code(
        'text',
        `
ShopApi/                      ← .NET Web API
├─ Controllers/ProductsController.cs
├─ Services/IProductService.cs, ProductService.cs
├─ Data/AppDbContext.cs
├─ Models/Entities/Product.cs, Category.cs
├─ Models/Dtos/ProductDto.cs, CreateProductRequest.cs
├─ Program.cs                 ← ลงทะเบียน DI, CORS, DB
└─ appsettings.json           ← connection string

shop-web/                     ← Angular
└─ src/app/
   ├─ models/product.model.ts
   ├─ services/product.service.ts
   ├─ interceptors/auth.interceptor.ts
   ├─ pages/product-list/...component.ts|html
   └─ app.config.ts           ← provideHttpClient()`,
        'โครงโปรเจกต์ที่เจอบ่อย',
      ),
      tip('ทุกเรื่องในหมวดนี้ใช้ตัวอย่างเดียวกัน คือระบบ **สินค้า (Product)** ที่มีหมวดหมู่ (Category) จะได้เห็นว่าโค้ดแต่ละชั้นต่อกันยังไง ลองอ่านเรียงตามลำดับดูนะ 🌸'),
      pairs(['Angular 17+', 'ASP.NET Core 8', 'C# 12', 'EF Core', 'LINQ', 'Dapper', 'SQL Server', 'Stored Procedure', 'JWT', 'Swagger']),
    ],
  },

  {
    id: 'request-flow',
    title: 'เส้นทางของ 1 request (Client → Server → DB)',
    emoji: '🚂',
    summary: 'กดปุ่มค้นหาหนึ่งครั้ง ข้อมูลเดินทางผ่านอะไรบ้าง ทั้งขาไปและขากลับ',
    tags: ['flow', 'request', 'lifecycle', 'http', 'middleware', 'model binding', 'json'],
    sections: [
      text('สมมติผู้ใช้พิมพ์ว่า **"ชา"** ในช่องค้นหาสินค้าแล้วกดปุ่ม มาตามดูกันว่าเกิดอะไรขึ้นบ้าง 🔍'),
      flow(
        [
          { icon: '👆', label: 'ผู้ใช้กดปุ่ม "ค้นหา"', desc: '`(click)="load()"` ใน template', side: 'client', arrow: 'event binding' },
          { icon: '🧩', label: 'Component.load()', desc: 'เรียก `productService.search("ชา")`', side: 'client', arrow: 'เรียก method' },
          { icon: '📮', label: 'ProductService (Angular)', desc: '`http.get("/api/products", { params })`', side: 'client', arrow: 'interceptor แนบ `Authorization: Bearer ...`' },
          { icon: '🌐', label: 'HTTP Request', desc: '`GET /api/products?search=ชา&page=1`', side: 'net', arrow: 'วิ่งไปที่ server' },
          { icon: '🚪', label: 'Middleware ของ ASP.NET Core', desc: 'HTTPS → CORS → Authentication → Authorization', side: 'server', arrow: 'routing หา controller' },
          { icon: '🎮', label: 'ProductsController.Search()', desc: 'model binding: query string → `string search`, `int page`', side: 'server', arrow: 'เรียก service' },
          { icon: '🧠', label: 'ProductService.SearchAsync()', desc: 'ใส่กฎ เช่น เอาเฉพาะสินค้า `IsActive`', side: 'server', arrow: 'LINQ หรือ EXEC SP' },
          { icon: '🗃️', label: 'EF Core / Dapper', desc: 'แปลงเป็น SQL พร้อม parameter', side: 'server', arrow: '`SELECT ... WHERE Name LIKE @p0`' },
          { icon: '🛢️', label: 'SQL Server', desc: 'รัน query / SP แล้วคืนแถวข้อมูล', side: 'db' },
        ],
        'ขาไป ➡️',
      ),
      flow(
        [
          { icon: '🛢️', label: 'แถวข้อมูล (rows)', desc: 'Id, Name, CategoryName, Price, Stock', side: 'db', arrow: 'map คอลัมน์ → property' },
          { icon: '📦', label: 'C# object (DTO)', desc: '`List<ProductDto>`', side: 'server', arrow: '`return Ok(result)`' },
          { icon: '🔤', label: 'JSON serializer', desc: 'แปลงเป็น JSON และเปลี่ยนชื่อเป็น camelCase ให้อัตโนมัติ', side: 'server', arrow: 'HTTP 200 + JSON body' },
          { icon: '🌐', label: 'HTTP Response', desc: '`{ "items": [...], "total": 3 }`', side: 'net', arrow: 'Observable ส่งค่าออกมา' },
          { icon: '🧩', label: 'subscribe() ใน Component', desc: '`this.products.set(res.items)`', side: 'client', arrow: 'signal เปลี่ยน → render ใหม่' },
          { icon: '🖼️', label: 'หน้าจออัปเดต', desc: '`@for (p of products(); track p.id)`', side: 'client' },
        ],
        'ขากลับ ⬅️',
      ),
      code(
        'http',
        `
GET /api/products?search=%E0%B8%8A%E0%B8%B2&page=1 HTTP/1.1
Host: localhost:7001
Accept: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{"items":[{"id":7,"name":"ชาเขียว","categoryName":"เครื่องดื่ม","price":45.00,"stock":20}],"total":1}`,
        'หน้าตาจริงๆ ที่วิ่งบนสาย',
        'ภาษาไทยใน URL จะถูก encode เป็น `%E0%B8...` ให้อัตโนมัติ',
      ),
      list(
        [
          '**Model binding** = .NET อ่าน query string / route / body แล้วเติมให้ parameter ของ method เอง',
          '**Validation** = ถ้ามี `[ApiController]` แล้ว model ผิดกฎ จะตอบ **400** กลับไปเลย ไม่เข้า method',
          '**Serialization** = C# object → JSON (ขาออก) และ JSON → C# object (ขาเข้า) ใช้ `System.Text.Json`',
          '**Observable** = HttpClient ของ Angular จะ **ยังไม่ยิง request** จนกว่าจะมีคน `subscribe()` นะ!',
        ],
        'คำที่ควรรู้',
      ),
      warn('ลืม `subscribe()` (หรือไม่ได้ใช้ `async` pipe) = request ไม่ถูกส่งเลย เปิด Network tab ก็ไม่เห็นอะไร 😵 เป็นบั๊กที่มือใหม่เจอบ่อยที่สุด'),
      tip('อยากเห็นเส้นทางนี้ของจริงให้เปิด **DevTools → Network** ใน Chrome ดู request/response, ใช้ **Swagger** ยิง API ตรงๆ และเปิด **log SQL ของ EF Core** ดูว่าได้ query อะไรออกมา'),
    ],
  },

  {
    id: 'csharp-for-api',
    title: 'C# ที่ต้องใช้ทำ Web API',
    emoji: '🟣',
    summary: 'class, record, nullable, async/await, lambda, DI ฯลฯ เฉพาะที่ใช้จริงในงาน',
    tags: ['c#', 'csharp', 'async', 'await', 'task', 'lambda', 'nullable', 'record', 'extension method'],
    sections: [
      text('ไม่ต้องรู้ C# ครบทุกเรื่องก็ทำ API ได้ เน้นตามนี้ก่อนเลย ✨'),
      code(
        'csharp',
        `
public class Product                 // class = แม่พิมพ์ object
{
    public int Id { get; set; }      // property (get/set)
    public string Name { get; set; } = "";   // ค่าเริ่มต้น
    public string? Note { get; set; }        // ? = เป็น null ได้
    public decimal Price { get; set; }       // เงินใช้ decimal เสมอ
}

// record = class สำหรับเก็บข้อมูล เขียนสั้น เทียบค่ากันได้
public record CategoryDto(int Id, string Name);

var p = new Product { Id = 1, Name = "ชาเขียว", Price = 45m };
var c = new CategoryDto(1, "เครื่องดื่ม");`,
        'class / property / record',
      ),
      code(
        'csharp',
        `
string? note = product.Note;
int len = note?.Length ?? 0;      // ?.  ถ้า null ไม่ error   ?? ค่าสำรอง
if (product is null) return NotFound();
string name = product.Category!.Name;   // ! = "เชื่อเถอะว่าไม่ null"

var msg = $"สินค้า {p.Name} ราคา {p.Price:N2} บาท";   // string interpolation`,
        'จัดการ null',
      ),
      code(
        'csharp',
        `
// งานที่ต้องรอ (DB, HTTP) ใช้ async/await เสมอ
public async Task<ProductDto?> GetByIdAsync(int id)
{
    var entity = await _db.Products.FindAsync(id);  // รอ DB แต่ไม่บล็อก thread
    return entity is null ? null : ToDto(entity);
}
// Task      = งานที่ยังไม่คืนค่า (เหมือน void)
// Task<T>   = งานที่จะได้ T ในอนาคต (เหมือน Promise<T> ของ JS)`,
        'async / await / Task',
      ),
      code(
        'csharp',
        `
// lambda: p => p.Price > 100  คือ function สั้นๆ ที่รับ p คืน bool
Func<Product, bool> isExpensive = p => p.Price > 100;

// extension method: เพิ่ม method ให้ type อื่น (LINQ ก็ทำแบบนี้!)
public static class ProductExtensions
{
    public static ProductDto ToDto(this Product p) =>
        new() { Id = p.Id, Name = p.Name, Price = p.Price };
}
var dto = product.ToDto();   // เรียกเหมือนเป็น method ของ Product เอง`,
        'lambda + extension method',
      ),
      code(
        'csharp',
        `
public interface IProductService            // สัญญา: ต้องมี method อะไรบ้าง
{
    Task<ProductDto?> GetByIdAsync(int id);
}

public class ProductsController : ControllerBase
{
    private readonly IProductService _service;
    // DI: .NET ส่ง ProductService เข้ามาให้เองทาง constructor
    public ProductsController(IProductService service) => _service = service;
}`,
        'interface + Dependency Injection',
      ),
      table(
        ['C#', 'TypeScript (Angular)', 'ความหมาย'],
        [
          ['`Task<T>`', '`Promise<T>` / `Observable<T>`', 'ค่าในอนาคต'],
          ['`List<T>`', '`T[]`', 'ลิสต์'],
          ['`Dictionary<K,V>`', '`Record<K,V>` / `Map`', 'key-value'],
          ['`string?`', '`string | null`', 'เป็น null ได้'],
          ['`p => p.Id`', '`p => p.id`', 'lambda / arrow function'],
          ['`[HttpGet]`', '`@Component()`', 'attribute / decorator'],
          ['`interface`', '`interface`', 'สัญญา (ใน TS ใช้บอกหน้าตาข้อมูลด้วย)'],
        ],
        'เทียบกับ TypeScript',
      ),
      tip('ชื่อ method ที่เป็น async ให้ลงท้ายด้วย `Async` เช่น `GetByIdAsync` และใช้ `await` ตลอดสาย อย่าใช้ `.Result` หรือ `.Wait()` เพราะอาจ deadlock หรือทำให้ thread ค้างได้'),
    ],
  },

  {
    id: 'model-dto',
    title: 'Model, Entity, DTO ต่างกันยังไง',
    emoji: '📦',
    summary: 'Entity = หน้าตาตาราง, DTO = หน้าตาข้อมูลที่ส่งเข้า-ออก API',
    tags: ['model', 'entity', 'dto', 'viewmodel', 'request', 'response', 'mapping', 'automapper', 'interface'],
    sections: [
      text(
        'คำว่า "model" ในงานจริงมีหลายแบบ แยกให้ออกก่อนนะ 🧺\n\n**Entity** = class ที่หน้าตาตรงกับ **ตารางใน DB** (EF Core ใช้ตัวนี้)\n**DTO (Data Transfer Object)** = class สำหรับ **ส่งข้อมูลผ่าน API** มีเฉพาะ field ที่จำเป็น\n**Request model** = DTO ขาเข้า (ข้อมูลที่ client ส่งมา) ใส่กฎ validation ไว้ด้วย\n**Angular interface** = หน้าตา JSON ฝั่ง client ต้องตรงกับ DTO',
      ),
      flow(
        [
          { icon: '🛢️', label: 'ตาราง dbo.Products', desc: 'Id, Name, CategoryId, Price, Stock, IsActive, CreatedAt', side: 'db', arrow: 'EF Core map' },
          { icon: '🧱', label: 'Entity: Product', desc: 'ทุกคอลัมน์ + navigation `Category`', side: 'server', arrow: 'เลือก field ที่ต้องการ (Select)' },
          { icon: '📦', label: 'DTO: ProductDto', desc: 'Id, Name, CategoryName, Price, Stock', side: 'server', arrow: 'JSON (camelCase)' },
          { icon: '🅰️', label: 'Angular: interface Product', desc: 'id, name, categoryName, price, stock', side: 'client' },
        ],
        'ข้อมูลเปลี่ยนรูปไปตามชั้น',
      ),
      code(
        'csharp',
        `
// Models/Entities/Product.cs  ← ตรงกับตาราง
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public int CategoryId { get; set; }
    public Category? Category { get; set; }   // navigation property
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; }
}

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public List<Product> Products { get; set; } = [];
}`,
        'Entity',
      ),
      code(
        'csharp',
        `
// Models/Dtos/ProductDto.cs  ← ส่งออกไปให้ Angular
public class ProductDto
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string CategoryName { get; set; } = "";
    public decimal Price { get; set; }
    public int Stock { get; set; }
}

public record PagedResult<T>(IReadOnlyList<T> Items, int Total);`,
        'DTO ขาออก (Response)',
      ),
      code(
        'csharp',
        `
using System.ComponentModel.DataAnnotations;

// รับเข้ามาจาก Angular ตอนสร้างสินค้า
public class CreateProductRequest
{
    [Required(ErrorMessage = "กรุณาใส่ชื่อสินค้า")]
    [StringLength(100)]
    public string Name { get; set; } = "";

    [Range(1, int.MaxValue, ErrorMessage = "กรุณาเลือกหมวดหมู่")]
    public int CategoryId { get; set; }

    [Range(0.01, 1000000)]
    public decimal Price { get; set; }

    [Range(0, int.MaxValue)]
    public int Stock { get; set; }
}`,
        'DTO ขาเข้า (Request) + validation',
      ),
      code(
        'typescript',
        `
// src/app/models/product.model.ts
export interface Product {
  id: number;
  name: string;
  categoryName: string;
  price: number;
  stock: number;
}

export interface PagedResult<T> {
  items: T[];
  total: number;
}

export interface CreateProductRequest {
  name: string;
  categoryId: number;
  price: number;
  stock: number;
}`,
        'ฝั่ง Angular ต้องหน้าตาตรงกัน',
        '.NET แปลง `CategoryName` → `categoryName` ให้เอง ฝั่ง Angular จึงใช้ camelCase',
      ),
      code(
        'csharp',
        `
// แบบเขียนเอง (ง่าย ชัด debug ง่าย)
public static ProductDto ToDto(this Product p) => new()
{
    Id = p.Id,
    Name = p.Name,
    CategoryName = p.Category?.Name ?? "",
    Price = p.Price,
    Stock = p.Stock,
};

// หรือใช้ library เช่น AutoMapper / Mapster
// var dto = _mapper.Map<ProductDto>(entity);`,
        'แปลง Entity → DTO (mapping)',
      ),
      table(
        ['', 'Entity', 'DTO'],
        [
          ['หน้าตาตาม', 'ตารางใน DB', 'สิ่งที่หน้าจอต้องใช้'],
          ['ใช้กับ', 'EF Core / DbContext', 'Controller ↔ Angular'],
          ['มี field ลับไหม', 'มี (เช่น `PasswordHash`)', 'ไม่มี เลือกเฉพาะที่ส่งได้'],
          ['validation', 'กฎของ DB', '`[Required]`, `[Range]` ฯลฯ'],
        ],
        'สรุปความต่าง',
      ),
      warn('อย่า return Entity ออกไปตรงๆ จาก API! อาจหลุด field ลับ, เจอปัญหา JSON วนลูป (Product → Category → Products → ...) และถ้าแก้ตาราง API จะพังตามไปด้วย'),
      tip('ถ้าผลลัพธ์มาจาก SP ให้ทำ DTO ที่ชื่อ property **ตรงกับชื่อคอลัมน์** ที่ SP SELECT ออกมา แล้ว Dapper / EF จะ map ให้เอง'),
    ],
  },
]
