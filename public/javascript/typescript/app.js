import { urlserver, CSan_Pham } from "./common.js";
export const layqua = async (sosp = 8) => {
    let data = await fetch(urlserver + `/san_pham/?_sort=-ngay&_limit=6`)
        .then(res => res.json()).then(data => data);
    console.log(data);
    let str = ``;
    data.forEach(sp => str += motsp(sp));
    str =
        `
    <div id="spnoibat" class="listsp">
        <h2>Sản Phẩm Nổi Bật</h2>
        <div class="d-flex gap-6">${str}</div>
    </div>
    `;
    return str;
};
export const laysphot = async (sosp = 8) => {
    let data = await fetch(urlserver + `/san_pham/?hot=1&_sort=-ngay&_limit=${sosp}`)
        .then(res => res.json()).then(data => data);
    let str = ``;
    data.forEach(sp => str += motsp(sp));
    str =
        `
    <div id="spnoibat" class="listsp">
        <h2>Sản Phẩm Nổi Bật</h2>
        <div class="d-flex gap-6">${str}</div>
    </div>
    `;
    return str;
};
const motsp = (sp) => {
    let { id, ten, gia, gia_km, hinh, xem, hot, an_hien, ngay } = sp;
    let obj;
    obj = new CSan_Pham(id, ten, gia, gia_km, hinh, ngay, xem, hot, an_hien, hinh);
    return `
    <a class="sp text-dark text-decoration-none" href="product.html?id=${sp.id}">
    <div class="d-inline-block shadow p-3 mb-5 bg-white rounded" style="height:400px">
        <img src="${obj.hinh}" alt="" width="100%" height="280px">
        <div class="dow">
            <p><b class="text-capitalize">${sp.ten}</b></p>
            <p><span>${obj.giakm()}</span><del class="mx-3 text-body-tertiary
            ">${obj.giavnd()}</del></p>
            <p hidden>masp:${sp.id}</p>
        </div>
        </div>
        </a>
    `;
};
export const getCategories = async () => {
    let data = await fetch(urlserver + "/categories").then(res => res.json()).then(data => data);
    let text = `<div class="d-flex px-5 align-items-center border-bottom border-3 py-2" id="r2">
    <a href="/views/"><img src="" alt="logo nè" width="10%"/></a>
    <select name="address" id="address" class="w-25 border border-opacity-50 rounded px-3">
      <option value="Hồ Chí Minh">Hồ Chí Minh</option>
      <option value="Hà Nội">Hà Nội</option>
      <option value="Đà Nẵng">Đà Nẵng</option>
      <option value="Huế">Huế</option>
      <option value="Cà Mau">Cà Mau</option>
      <option value="Cần Thơ">Cần Thơ</option>
      <option value="Bến Tre">Bến Tre</option>
      <option value="Trà Vinh">Trà Vinh</option>
      <option value="Phú Quốc">Phú Quốc</option>
    </select>`;
    text += `<ul class="fs-6 my-0 text-capitalize">`;
    data.forEach(nsx => {
        text += `<li class="d-inline-block mx-3 py-3"><a class="text-black text-decoration-none" href="cate.html?id_cate=${nsx.id}">${nsx.ten}</a></li>`;
    });
    text += `</ul>`;
    return text;
};
export const getCate = async (id_cate) => {
    let data = await fetch(urlserver + ("/san_pham/?id_cate=" + id_cate))
        .then((response) => response.json())
        .then((d) => d);
    let text = '';
    data.forEach(pro => {
        text += motsp(pro);
    });
    text = `<div>
    <h2> sản phẩm của nhà sản xuất là </h2>
    <div class="cate"> ${text} </div>
    </div>`;
    console.log(urlserver + "/san_pham/?id_cate" + id_cate);
    return text;
};
export const getPro = async (id = 0) => {
    let sp = await fetch(urlserver + ("/san_pham/?id=" + id))
        .then(res => res.json())
        .then(data => data[0]);
    let { id_cate, ten, gia, gia_km, hinh, ngay, xem, hot, an_hien } = sp;
    let obj = new CSan_Pham(id, ten, gia, gia_km, hinh, ngay, xem, hot, an_hien, id_cate);
    let html = `
    <div id='left' class="w-50%">
    <img src="${obj.hinh}">
    </div>
    <div id='right'>
        <p class="text-capitalize"><b>Tên Sản Phẩm : </b>${obj.ten} </p>
        <p><del>Giá Gốc: ${obj.giavnd()}</del> &nbsp &nbsp; <b class="text-danger">Giá hiện tại: ${obj.giakm()}</b></p>
        <form>
        <input type="number" class="form-control d-inline-block w-50" name="soluong" min="1" value="1">
        <input type="button" class="btn btn-info float-end" value="Thêm vào giỏ hàng"></br>
        <input type="button" class="w-100 btn btn-primary my-3" value="mua ngay">
        </form>        
    `;
    html = `<div id="chitiet">
        <h2>Chi Tiết Sản Phẩm</h2>
        <div id="data" class="d-flex gap-5 container">${html}</div>
    </div>`;
    return html;
};
