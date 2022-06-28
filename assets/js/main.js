//LOGIC

var app = new Vue({
    el: '#app',
    data: {
        products: [
            {
                id: 1,
                category: '',
                img: './assets/images/img1.png',
                name: 'Unicolor t-shirt',
                desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat amet`,
                descmodal: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Placeat voluptatibus sapiente aliquid deleniti, rem nisi!
                `,
                price: 35_000,
                modal_id: 'tshirt',
                modalw: '#tshirt',
                available: 15,
            },
            {
                id: 2,
                category: '',
                img: './assets/images/img2.jpg',
                name: 'Shirts',
                desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat amet`,
                descmodal: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Placeat voluptatibus sapiente aliquid deleniti, rem nisi!
                `,
                price: 55_000,
                modal_id: 'shirt',
                modalw: '#shirt',
                available: 12,
            },
            {
                id: 3,
                category: '',
                img: './assets/images/img3.jpg',
                name: 'Sportive Jacket',
                desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat amet`,
                descmodal: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Placeat voluptatibus sapiente aliquid deleniti, rem nisi! 
                `,
                price: 125_000,
                modal_id: 'jacket',
                modalw: '#jacket',
                available: 10,
            },
        ],
        fproducts: [],
        categories: [
            {name: 'tshirts'},
            {name: 'shirts'},
            {name: 'jackets'},
        ],
        saletable: [],
        salereg: [],
        pname: '',
        pprice: 0,
        pqty: 0,
        pdesc: '',
        pcateg: '',
        saleprod: '',//sales
        saleamount: 0,//sales
    },
    methods: {
        addTosales(){
            const index = this.products.findIndex((object) => {
                return object.name == this.saleprod;
            });

            if (this.products[index].available > this.saleamount) {
                this.saletable.push({
                    name: this.products[index].name,
                    price: this.products[index].price,
                    qty: this.saleamount,
                    total: this.products[index].price * this.saleamount
                });
                this.updateLocalStorage();
            }else{
                alert('There are not sufficient products available');
            }
            
        },
        addnewprod(){
            let c = 1;
            this.products.push({
                id: this.products.length + 1,
                category: this.pcateg,
                img: './assets/images/img1.png',
                name: this.pname,
                desc: this.pdesc,
                descmodal: this.pdesc,
                price: this.pprice,
                modal_id: `p${c}`,
                modalw: `#p${c}`,
                available: this.pqty,
            });
            c++;
            this.updateLocalStorage();
        },
        salehisto(){
            this.salereg.push({
                id: this.salereg.length + 1,
                sale: []
            });

            const sale = this.saletable.map(e => {
                return{
                    name: e.name,
                    price: e.price,
                    qty: e.qty,
                    total: e.total
                }
            });

            this.salereg[this.salereg.length - 1].sale = sale;
            console.log(this.salereg);
            this.saletable.splice(0, this.saletable.length);
            this.updateLocalStorage();
        },
        updateLocalStorage(){
            localStorage.setItem('nproducts', JSON.stringify(this.fproducts));
            localStorage.setItem('products', JSON.stringify(this.products));
            localStorage.setItem('saletab', JSON.stringify(this.saletable));
            localStorage.setItem('salereg', JSON.stringify(this.salereg));
        },
    },
    created(){
        if (localStorage.getItem('nproducts') !== null) {
            this.fproducts = JSON.parse(localStorage.getItem('nproducts'));
            this.products = JSON.parse(localStorage.getItem('products'));
        }else{
            this.fproducts = this.products;
            this.products = this.products;
        }

        if (localStorage.getItem('saletable') !== null) {
            this.saletable = JSON.parse(localStorage.getItem('saletab'));
            this.salereg = JSON.parse(localStorage.getItem('salereg'));
        }else{
            this.saletable = this.saletable;
            this.salereg = this.salereg;
        }
    }
});
