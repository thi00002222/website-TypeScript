const urlserver = `http://localhost:3000`;
const tygia = 25000;
class CSan_Pham {
    id;
    ten;
    gia;
    gia_km;
    hinh;
    ngay;
    xem;
    hot;
    an_hien;
    id_cate;
    constructor(id, ten, gia, gia_km, hinh, ngay, xem, hot, an_hien, id_cate) {
        this.id = id;
        this.ten = ten;
        this.gia = gia;
        this.gia_km = gia_km;
        this.hinh = hinh;
        this.ngay = ngay;
        this.xem = xem;
        this.hot = hot;
        this.an_hien = an_hien;
        this.id_cate = id_cate;
    }
    phantramgiamgia() { return (100 * (this.gia - this.gia_km) / this.gia).toFixed(0) + "%"; }
    ;
    giavnd() { return Number(this.gia).toLocaleString("vi") + "₫"; }
    ;
    giakm() { return Number(this.gia_km).toLocaleString("vi") + "₫"; }
    ;
}
;
export { urlserver, CSan_Pham };
