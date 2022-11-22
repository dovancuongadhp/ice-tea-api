class ProductsController{
    constructor() {
    }
    getListProduct(req,res){
        res.send("LIST PRODUCT")
    }
}
export default new ProductsController();