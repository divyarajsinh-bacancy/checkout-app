import React,{ useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from '@material-ui/core/MenuItem';
import Select from "@material-ui/core/Select";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { db } from "./db";

const ITEM = 'item',QTY = 'quantity',PRICE = 'price',ADD = 'add',DELETE = 'delete';
const initialTotal = {
    subtotal:0,
    total:0,
};
const initialError = {
    price:false,
    total:false,
    index:-1
};

const Layout = () => {

    const [card,setCard] = useState(null);
    const [products,setProducts] = useState([]);
    const [checkout,setCheckout] = useState(initialTotal);
    const [error,setError] = useState(initialError);

    const handleCardNumber = e => {
        const value = +e.target.value;
        const result = db.find(ele => ele.number === value);
        if(result){
            setCard(result);
        }
    }

    const handleProduct = (type,value,index) => {
        let product = products[index];
        switch (type) {
            case ITEM:
                product = card.allowedProducts.find(e => e.id === value);
                product.quantity = 1;
                product.price = '';
                setValue(product,index);
                break;
            default:
                product[type] = value;
                setValue(product,index);
                break;
        }
    }

    const handleBlur = (index) => {
        let product = products[index];
        setTotal();
        if(product.price <= (product.minPriceCents/100) || product.price >= (product.maxPriceCents/100)){
            setError({...error,price:true,index:index});
        }else {
            setError({...initialError});
        }
    }

    const setTotal = (arr = products) => {
        let cost = {...initialTotal};
        arr.filter(ele => {
            cost.subtotal += ele.price * ele.quantity;
            if(ele.discountCentsPerLitre){
                cost.total += (ele.price * ele.quantity) - (ele.discountCentsPerLitre/100 * ele.quantity);
            }
        });
        if(cost.total > card.balance){
            setError({...error,total:true,index:0});
            console.log('error');
        }
        setCheckout({...cost});
    }

    const setValue = (product,index) => {
        let arr = [...products];
        arr[index] = product;
        setProducts([...arr]);
    }

    const addDeleteProduct = (type,index) => {
        if(type === ADD){
            const obj = {
                id:'',
                name:'',
                quantity:1,
                price:''
            }
            setProducts([...products,obj]);
        }else if(type === DELETE){
            let arr = [...products];
            arr.splice(index,1);
            setProducts([...arr]);
            setTotal(arr);
        }
    }

    return(
        <Container>
            <Box>
                <TextField id="card" label="Card Number" onChange={handleCardNumber}/>
            </Box>
            <h2>Purchase</h2>
            {products && products.map((product,key) => {
                return( card && <Box>
                    <FormControl>
                    <InputLabel id={`select-product-${key}`}>Product</InputLabel>
                    <Select labelId={`select-product-${key}`} id={`product-${key}`} value={product.id} onChange={(e) => handleProduct(ITEM,e.target.value,key)}>
                        {card.allowedProducts.map((item,i) => 
                            <MenuItem value={item.id}>{item.name}</MenuItem>
                        )}
                    </Select>
                    </FormControl>
                    <FormControl>
                    <TextField id={`qty-${key}`} label="Qty/Litre" onChange={(e) => handleProduct(QTY,e.target.value,key)} value={product.quantity} onBlur={(e) => handleBlur(key)}/>
                    </FormControl>
                    <FormControl error>
                    <TextField id={`price-${key}`} label="Unit Price/$" onChange={(e) => handleProduct(PRICE,e.target.value,key)} value={product.price} onBlur={(e) => handleBlur(key)}/>
                    {error.price && (error.index === key ? <FormHelperText>{`Unit Price should be between ${product.minPriceCents/100} and ${product.maxPriceCents/100}`}</FormHelperText> : '')}
                    </FormControl>
                    
                    {key !== 0  ? <Button className="primary" onClick={() => addDeleteProduct(DELETE,key)}>Delete</Button> : ''}             
                </Box> )
            })}
            <Button className="primary" onClick={() => addDeleteProduct(ADD,0)}>Add Product</Button>
            <h2>Checkout</h2>
            { card && <Box>
                <h4>Subtotal (${checkout.subtotal})</h4>
                {products && products.map((product,key) => {
                    return( card && <Card className="checkout" key={`checkout-product-${key}`}>
                        <CardContent>
                        <Typography color="textSecondary">
                            {product.name}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {`($ ${product.price}/L)`}
                        </Typography>
                        {
                            product.discountCentsPerLitre && 
                            <Typography variant="h5" component="p">
                                {`- $ ${product.discountCentsPerLitre/100}`}
                            </Typography>
                        }
                        </CardContent>
                    </Card> )
                })}
                {error.total && <Typography variant="h5" component="p">{`Total Price should be less than ${card.balance}`}</Typography>}
                <h4>Total (${checkout.total})</h4>
            </Box> }
        </Container>
    )
}

export default Layout;