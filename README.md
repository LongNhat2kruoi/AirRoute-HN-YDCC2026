# AirRoute HN — YDCC 2026

AirRoute HN là một **concept prototype tương tác** cho chủ đề *Urban Air-chitects* của YDCC 2026. Dự án minh họa cách một hệ thống định tuyến có thể cân bằng thời gian di chuyển với mức phơi nhiễm PM2.5, từ đó gợi ý những hành trình dễ thở hơn cho người dân Hà Nội.

Đây là bản mẫu phục vụ trình diễn và thảo luận sản phẩm, chưa phải ứng dụng dẫn đường hoặc hệ thống dự báo không khí dùng trong thực tế.

## Mục đích

AirRoute HN biến chất lượng không khí từ một chỉ số khó hành động thành một yếu tố có thể dùng khi ra quyết định di chuyển. Prototype tập trung vào ba câu hỏi:

- Nếu đi một tuyến dài hơn một chút, người dùng có thể giảm bao nhiêu phơi nhiễm PM2.5?
- Thời điểm khởi hành và phương tiện ảnh hưởng thế nào đến hành trình?
- Có thể xây dựng một sản phẩm AI hướng đến sức khỏe, giao thông xanh và đô thị bền vững ra sao?

## Những gì có trong prototype

- So sánh **tuyến nhanh nhất** với **tuyến AirRoute AI ít phơi nhiễm hơn**.
- Mô phỏng các hành trình tại Hà Nội: Cầu Giấy, Thanh Xuân và Hà Đông.
- Chọn bốn thời điểm khởi hành: 07:00, 12:00, 17:30 và 22:00.
- Điều chỉnh phương tiện: xe máy xăng, xe máy điện, xe buýt và xe đạp.
- Bản đồ tuyến đường, điểm nóng AQI và biểu đồ dự báo PM2.5 trong sáu giờ.
- Gợi ý sức khỏe, ước tính CO₂ tránh được và chế độ dành cho nhóm nhạy cảm.
- Trang mô tả kiến trúc AI bốn lớp và lộ trình triển khai MVP trong 36 giờ.

## Công nghệ

- React 19 và React DOM
- Vite 6
- JavaScript/JSX, CSS và Tailwind CSS qua Vite plugin
- Lucide React cho biểu tượng
- Vitest cho unit test
- ESLint cho kiểm tra mã nguồn
- GitHub Actions và GitHub Pages cho CI/CD

## Yêu cầu môi trường

- Node.js 22 trở lên (workflow CI sử dụng Node.js 22)
- npm 10 trở lên

## Chạy dự án trên máy local

```bash
# 1. Tải mã nguồn
git clone https://github.com/LongNhat2kruoi/AirRoute-HN-YDCC2026.git
cd AirRoute-HN-YDCC2026

# 2. Cài dependency
npm ci

# 3. Khởi động development server
npm run dev
```

Sau đó mở địa chỉ được Vite in trong terminal, thường là `http://localhost:5173`.

Nếu chỉ cần cài dependency lần đầu mà chưa có `package-lock.json` tương ứng, có thể dùng `npm install`.

## Các lệnh thường dùng

```bash
npm run dev      # Chạy development server và hot reload
npm run build    # Build bản production vào thư mục dist/
npm run preview  # Xem thử bản build production trên local
npm run lint     # Kiểm tra lỗi ESLint
npm test         # Chạy unit test bằng Vitest
```

Trước khi tạo một bản build hoặc mở pull request, có thể chạy toàn bộ kiểm tra:

```bash
npm run lint
npm test
npm run build
```

## Cấu trúc chính

```text
.
├── public/                  # Tài nguyên tĩnh, gồm favicon
├── src/
│   ├── components/          # Bản đồ, demo tuyến, biểu đồ, kiến trúc và roadmap
│   ├── data/mockData.js     # Dữ liệu hành trình, thời điểm, phương tiện và dự báo mẫu
│   ├── lib/exposure.js      # Tính AQI, thời gian, phơi nhiễm và CO₂
│   ├── lib/exposure.test.js # Unit test cho các phép tính mô phỏng
│   ├── App.jsx              # Điều hướng và bố cục ứng dụng
│   └── main.jsx             # Điểm khởi động React
├── .github/workflows/
│   └── deploy.yml           # Lint, test, build và deploy GitHub Pages
├── index.html
├── package.json
└── vite.config.js
```

## Dữ liệu và phạm vi sử dụng

Toàn bộ AQI, PM2.5, thời gian di chuyển, thời tiết, liều phơi nhiễm và kết quả sức khỏe trong ứng dụng hiện là **dữ liệu mô phỏng được khai báo trong `src/data/mockData.js`**. Ứng dụng không gọi backend, không yêu cầu API key và không thu thập vị trí, tài khoản hay thông tin cá nhân.

Các chỉ số giảm phơi nhiễm và CO₂ chỉ nhằm minh họa cách sản phẩm có thể hoạt động; chúng không phải phép đo thực địa, dự báo vận hành hay tư vấn y khoa. Khi phát triển thành sản phẩm thật, cần thay thế dữ liệu mẫu bằng nguồn quan trắc đáng tin cậy, hiệu chuẩn mô hình và kiểm định với người dùng.

## Kiến trúc ý tưởng

Prototype trình bày hướng phát triển bốn lớp:

1. **Thu thập và chuẩn hóa dữ liệu:** chất lượng không khí, giao thông và khí tượng.
2. **Mô hình AI và dẫn đường:** dự báo PM2.5 theo không gian-thời gian và đề xuất tuyến.
3. **Công dân và hoạch định:** cảnh báo cá nhân, bản đồ điểm nóng và kịch bản can thiệp.
4. **Tác động và bền vững:** đo phơi nhiễm, đô thị bền vững và CO₂ tránh được, gắn với SDG 3, SDG 11 và SDG 13.

## Triển khai GitHub Pages

Workflow tại `.github/workflows/deploy.yml` được kích hoạt khi có push lên nhánh `main` hoặc chạy thủ công bằng `workflow_dispatch`. Workflow sẽ:

1. Cài dependency bằng `npm ci`.
2. Chạy `npm run lint`, `npm test` và `npm run build`.
3. Đóng gói thư mục `dist/` và deploy bằng GitHub Pages.

Để bật deploy cho một repository, vào **Settings → Pages**, chọn **GitHub Actions** làm source. Sau khi workflow chạy thành công, địa chỉ website sẽ xuất hiện trong job deploy của GitHub Actions.

## Bản quyền và ngữ cảnh dự án

AirRoute HN được xây dựng như một concept prototype/showcase cho YDCC 2026, với định hướng thiết kế những hành trình đô thị lành mạnh hơn tại Hà Nội.
