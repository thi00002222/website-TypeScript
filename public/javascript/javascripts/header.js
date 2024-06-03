const header = `<header class="d-grid gap-2">
  <div
    id="r1"
    class="text-white bg-primary d-flex justify-content-between gap-5 align-items-center"
  >
    <div class="flex-grow-1 text-end fs-5">
      Nhập APPXIN giảm 40% cho đơn hàng từ 250K tại App
    </div>
    <div class="px-5 fs-6">
      <a class="text-decoration-none" href="#">Theo dõi đơn hàng</a>
      <a class="text-decoration-none px-3" href="#">Đăng nhập</a>
      <a class="text-decoration-none" href="#">Đăng ký</a>
      <select name="lang" id="lang-select" class="border border-3 rounded border-light-subtle">
        <option value="VN">VN</option>
        <option value="USA">USA</option>
        <option value="JP">JP</option>
        <option value="FR">FR</option>
      </select>
    </div>
  </div>
</header>`;
const parser = new DOMParser();
const headerElement = parser.parseFromString(header, "text/html").body;
document.body.innerHTML = headerElement.outerHTML;
