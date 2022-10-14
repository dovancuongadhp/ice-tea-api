class ProductsController{
    constructor() {
    }
    index(){}
    getListProduct(req,res){
        res.send("LIST PRODUCT")
    }
}
export default new ProductsController();