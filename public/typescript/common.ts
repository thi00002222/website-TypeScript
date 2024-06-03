const urlserver = `http://localhost:3000`;
const tygia = 25000;
interface ISan_Pham{
    id:number;
    ten:string;
    gia:number;
    gia_km:number;
    hinh:string;
    ngay:string;
    xem:number;
    hot:boolean;
    an_hien:number;
    id_cate:number;
}

class  CSan_Pham implements ISan_Pham {
    id: number;
    ten: string;
    gia: number;
    gia_km: number;
    hinh: string;
    ngay: string;
    xem: number;
    hot: boolean;
    an_hien: number;
    id_cate: number;
    constructor(id,ten,gia,gia_km,hinh,ngay,xem,hot,an_hien,id_cate) {
        this.id = id;
        this.ten=ten;
        this.gia=gia;
        this.gia_km=gia_km;
        this.hinh=hinh;
        this.ngay=ngay;
        this.xem=xem;
        this.hot=hot;
        this.an_hien=an_hien;
        this.id_cate=id_cate;
    }
    phantramgiamgia(){return (100*(this.gia-this.gia_km)/this.gia).toFixed(0)+"%"};
    giavnd(){return Number(this.gia).toLocaleString("vi")+ "₫"};
    giakm(){return Number(this.gia_km).toLocaleString( "vi") + "₫"};
}

interface Icategories {
    id:number,
    ten: string,
    thu_tu:number,
    an_hien:number
};



export {urlserver,ISan_Pham,CSan_Pham, Icategories} 