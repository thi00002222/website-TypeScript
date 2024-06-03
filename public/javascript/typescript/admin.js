import { urlserver } from "./common.js";
export const form_cate = () => {
    return `
    <form id="frmCategories" class="col-9 m-auto border border-primary p-2">
    <div class="mb-3">
        <label for="name">Tên</label>
        <input id="name" type="text" class="form-control border-primary">
    </div>
    <div class="mb-3">
        <label for="tt">thứ tự</label>
        <input id="tt" type="number" class="form-control border-primary">
    </div>
    <div class="mb-3">
        <label for="an_hien">trạng thái</label><br>
        <input id="an_hien" name="an_hien" type="radio" value="0" > ẩn 
        <input id="an_hien" name="an_hien" type="radio" value="1" checked > hiện
    </div>
    <button id="btn_add_cate" type="button" class="btn btn-primary px-3">Thêm</button>
    </form>
    `;
};
export const add_cate = async () => {
    let ten = document.getElementById('name').value;
    let thutu = document.getElementById('tt').value;
    let an_hien = document.querySelector('input[name="an_hien"]:checked').value;
    let data = { ten: ten, thu_tu: thutu, an_hien: an_hien };
    let otp = { method: 'post', body: JSON.stringify(data), headers: { 'Content-type': `application/json` } };
    let kq = await fetch(urlserver + "/categories/", otp).then(res => res.json()).then(kq => kq);
    document.location = 'list_cate.html';
};
export const list_cate = async () => {
    let data = await fetch(urlserver + "/categories").then(res => res.json()).then(data => data);
    let arr = data;
    console.log(arr);
    let text = ``;
    arr.forEach(cate => text += motCate(cate));
    text = `
  <div id="listCate" class="listCate">
    <h2>Quản lý danh mục sản phẩm</h2>
    <div class="d-flex">
    <span class="w-10 my-3">tên danh mục</span>
    <span class="w-10 my-3">số thứ tự</span>
    <span class="w-10 my-3">trạng thái</span>
    <span class="w-10 my-3">thay đổi</span></div>
    <div id="data">${text}</div>
  </div>
  `;
    return text;
    ;
};
const motCate = (cate) => {
    return `<div class="cate d-flex gap-3">
    <span class="w-10 my-3">${cate.ten}</span>
    <span class="w-10 my-3">${cate.thu_tu}</span>
    <span class="w-10 my-3">${cate.an_hien == 0 ? "đang ẩn" : "đang hiện"}</span>
    <span>
        <a href="update_cate.html?id=${cate.id}" class="btn btn-warning px-3 me-1":>sửa</a>
        <button delid=${cate.id} class="btn btn-danger px-3 btnxoa">Xóa</button>
    </span>
    </div>`;
};
export const del_cate = async (btn) => {
    let id = btn.getAttribute('delid');
    console.log(id);
    let hoi = window.confirm("bạn có thật sự muốn xóa danh mục này");
    if (hoi == false)
        return;
    let otp = { method: 'delete' };
    let kq = await fetch(urlserver + "/categories/" + id, otp).then(res => res).then(data => data);
    document.location = 'list_cate.html';
};
export const form_update_cate = async (id) => {
    let text = '';
    let url = urlserver + "/categories/?id=" + id;
    let dm = await fetch(url).then(res => res.json()).then(data => data[0]);
    return `  <form id="frmCategories" class="col-9 m-auto border border-primary p-2">
     <div class="mb-3">
         <label for="name">Tên</label>
         <input id="name" placeholder='${dm.ten}' type="text" class="form-control border-primary" >
     </div>
     <div class="mb-3">
         <label for="tt">thứ tự</label>
         <input id="tt" placeholder='${dm.thu_tu}' type="number" class="form-control border-primary">
     </div>
     <div class="mb-3">
         <label for="an_hien">trạng thái</label><br>
         <input id="an_hien" name="an_hien" type="radio" value="0" ${dm.an_hien == 0 ? 'checked' : ''}> ẩn 
         <input id="an_hien" name="an_hien" type="radio" value="1" ${dm.an_hien == 0 ? 'checked' : ''}> hiện
     </div>
     <input type ="hidden" id="id" value="${id}">
     <button id="btn_update_cate" type="button" class="btn btn-primary px-3">cập nhật</button>
     </form>    `;
};
export const update_cate = async () => {
    let id = document.getElementById('id').value;
    let ten = document.getElementById('name').value;
    let thutu = document.getElementById('tt').value;
    let an_hien = document.querySelector('input[name="an_hien"]:checked').value;
    let data = { ten: ten, thu_tu: thutu, an_hien: an_hien };
    let otp = { method: 'put', body: JSON.stringify(data), headers: { 'Content-type': `application/json` } };
    let kq = await fetch(urlserver + "/categories/" + id, otp).then(res => res.json()).then(kq => kq);
    document.location = 'list_cate.html';
};
export const form_pro = async () => {
    let categories_arr = await getcate();
    let cate_options = '';
    categories_arr.forEach((val) => cate_options += `<option value = '${val.id}'>${val.ten}</option>`);
    return `
    <form id="frmCategories" class="col-9 m-auto border border-primary p-2">
    <div class="mb-3 d-flex">
        <div class='col-6'>
        <label for="txtNamePro">tên sản phẩm</label>
        <input id="txtNamePro" type="text" class="form-control border-primary">
        </div>
        <div class='col-6'>
        <label for='ngay'>ngày giờ ra mắt</label>
        <input id='ngay'class='form-control border-primary' type="date">
        </div>
    </div>
    <div class="mb-3 d-flex">
        <div class='col-6'>
        <label for="oprice">giá trước</label>
        <input id="oprice" type="number" class="form-control border-primary">
        </div>
        <div class='col-6'>
        <label for='price'>giá hiện tại</label>
        <input id='price'class='form-control border-primary' type="number">
        </div>
    </div>
    <div class="mb-3 d-flex">
        <div class='col-6'>
        <label for="txtCate">danh mục sản phẩm</label>
        <select id="id_cate" class="form-control border_primary">${cate_options}</select>
        </div>
        <div class='col-6'>
        <label for='img'>hình ảnh minh họa</label>
        <input id='img'class='form-control border-primary' type="text">
        </div>
    </div>
    <div class="mb-3 d-flex">
        <div class='col-6'>
        <label for="an_hien">Ẩn hiện</label>
        <input name='an_hien' type='radio' value='0'>
        ẩn<input name='an_hien' type='radio' checked value='1'>hiện
        </div>
        <div class='col-6'>
        <label for='tt'>nổi bật</label>
        <input name='tt' type='radio' value='0'>
        bình thường<input name='tt' type='radio' checked value='1'>hot
        </div>
    </div>

    
    <button id="btn_add_pro" type="button" class="btn btn-primary px-3">Thêm</button>
    </form>
    `;
};
const getcate = async () => {
    return fetch(urlserver + "/categories").then(res => res.json()).then(data => data);
};
export const add_pro = async () => {
    let ten = document.getElementById('txtNamePro').value;
    let cate = Number(document.getElementById("id_cate").value);
    let gia = Number(document.getElementById('oprice').value);
    let giamoi = Number(document.getElementById('price').value);
    let hinh = Number(document.getElementById('img').value);
    let ngay = document.getElementById('ngay').value;
    let an_hien = document.querySelector('input[name="tt"]:checked').value;
    let hot = document.querySelector('input[name="tt"]:checked').value;
    let data = { id_cate: cate, ten: ten, gia: gia, gia_km: giamoi, hinh: hinh, ngay: ngay, hot: hot, an_hien: an_hien };
    let otp = { method: 'post', body: JSON.stringify(data), headers: { 'Content-type': `application/json` } };
    const kq = await fetch(urlserver + "/san_pham/", otp).then(res => res.json()).then(kq => kq);
    document.location = 'list_product.html';
};
export const list_product = async () => {
    let data = await fetch(urlserver + "/san_pham").then(res => res.json()).then(data => data);
    let arr = data;
    console.log(arr);
    let text = ``;
    arr.forEach(pro => text += motsp(pro));
    text = `
  <div id="listCate" class="listCate">
    <h2>Quản lý danh mục sản phẩm</h2>
    <div class="d-flex gap-3">
    <span class="w-10 my-3">tên sản phẩm</span>
    <span class="w-10 my-3">danh mục sản phẩm</span>
    <span class="w-10 my-3">ngày đăng</span>
    <span class="w-10 my-3">giá bán</span>
    <span class="w-10 my-3">hình ảnh</span>
    <span class="w-10 my-3">trạng thái</span>
    </div>
    <div id="data">${text}</div>
  </div>
  `;
    return text;
    ;
};
const motsp = (sp) => {
    return `<div class="cate d-flex gap-3 my-3" style="
    height: 100px;
">
    <span class="w-10 my-3">${sp.ten}</span>
    <span class="w-10 my-3">${nameCate(sp.id_cate)}</span>
    <span class="w-10 my-3">${sp.ngay}</span>
    <span class="w-10 my-3">${sp.gia_km.toLocaleString('vi')}đ</span>
    <span class="w-10"><img src="${sp.hinh}" width="100%" height="100px"></span>
    <span class="w-10 my-3">${sp.an_hien == 0 ? "đang ẩn" : "đang hiện"}</span>

    <span>
        <a href="update_sp.html?id=${sp.id}" class="btn btn-warning px-3 me-1":>sửa</a>
        <button delspid=${sp.id} class="btn btn-danger px-3 btnxoa">Xóa</button>
    </span>
    </div>`;
};
function nameCate(id_cate) {
    if (id_cate == 1)
        return "Dây Chuyền";
    else if (id_cate == 2)
        return "Nhẫn";
    else if (id_cate == 3)
        return "Bánh Ngọt";
    else if (id_cate == 4)
        return "Các Dịp Đặt Biệt";
    else if (id_cate == 5)
        return "Hoa & Cây";
    else if (id_cate == 6)
        return "Quà tặng";
}
export const del_product = async (btn) => {
    let id = btn.getAttribute('delspid');
    console.log(id);
    let hoi = window.confirm("bạn có thật sự muốn xóa sản phẩm này chứ");
    if (hoi == false)
        return;
    let otp = { method: 'delete' };
    let kq = await fetch(urlserver + "/san_pham/" + id, otp).then(res => res).then(data => data);
    document.location = 'list_product.html';
};
export const form_update_pro = async (id) => {
    let text = '';
    let url = urlserver + "/san_pham/?id=" + id;
    let categories_arr = await getcate();
    let cate_options = '';
    categories_arr.forEach((val) => cate_options += `<option value = '${val.id}'>${val.ten}</option>`);
    let sp = await fetch(url).then(res => res.json()).then(data => data[0]);
    return `  <form id="frmCategories" class="col-9 m-auto border border-primary p-2">
    <div class="mb-3 d-flex">
        <div class='col-6'>
        <label for="txtNamePro">tên sản phẩm</label>
        <input id="txtNamePro" placeholder='${sp.ten}' value='${sp.ten}' type="text" class="form-control border-primary">
        </div>
        <div class='col-6'>
        <label for='ngay'>ngày giờ ra mắt</label>
        <input placeholder= '${sp.ngay}' value='${sp.ngay}' id='ngay'class='form-control border-primary' type="date">
        </div>
    </div>
    <div class="mb-3 d-flex">
        <div class='col-6'>
        <label for="oprice">giá trước</label>
        <input placeholder="${sp.gia}" value='${sp.gia}' id="oprice" type="number" class="form-control border-primary">
        </div>
        <div class='col-6'>
        <label for='price'>giá hiện tại</label>
        <input placeholder="${sp.gia_km}" value='${sp.gia_km}' id='price'class='form-control border-primary' type="number">
        </div>
    </div>
    <div class="mb-3 d-flex">
        <div class='col-6'>
        <label for="txtCate">danh mục sản phẩm</label>
        <select id="id_cate" class="form-control border_primary">${cate_options}</select>
        </div>
        <div class='col-6'>
        <label for='img'>hình ảnh minh họa</label>
        <input id='img'class='form-control border-primary' type="text">
        </div>
    </div>
    <div class="mb-3 d-flex">
        <div class='col-6'>
        <label for="an_hien">Ẩn hiện</label>
        <input name='an_hien' type='radio' value='0'>
        ẩn<input name='an_hien' type='radio' checked value='1'>hiện
        </div>
        <div class='col-6'>
        <label for='tt'>nổi bật</label>
        <input name='tt' type='radio' value='0'>
        bình thường<input name='tt' type='radio' checked value='1'>hot
        </div>
    </div>
    <input type ="hidden" id="id" value="${id}">

    
    <button id="btn_add_pro" type="button" class="btn btn-primary px-3">Thêm</button>
    </form>   `;
};
export const update_pro = async () => {
    let id = document.getElementById('id').value;
    let ten = document.getElementById('txtNamePro').value;
    let cate = Number(document.getElementById("id_cate").value);
    let gia = Number(document.getElementById('oprice').value);
    let giamoi = Number(document.getElementById('price').value);
    let hinh = Number(document.getElementById('img').value);
    let ngay = document.getElementById('ngay').value;
    let an_hien = document.querySelector('input[name="tt"]:checked').value;
    let hot = document.querySelector('input[name="tt"]:checked').value;
    let data = { id_cate: cate, ten: ten, gia: gia, gia_km: giamoi, hinh: hinh, ngay: ngay, hot: hot, an_hien: an_hien };
    let otp = { method: 'put', body: JSON.stringify(data), headers: { 'Content-type': `application/json` } };
    const kq = await fetch(urlserver + "/san_pham/" + id, otp).then(res => res.json()).then(kq => kq);
    document.location = 'list_product.html';
};
