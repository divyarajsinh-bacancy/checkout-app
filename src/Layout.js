import React,{ useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from '@material-ui/core/MenuItem';
import Select from "@material-ui/core/Select";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/Remove';
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
const useStyles = makeStyles((theme) => ({
    container: {
      background: 'white',
    },
    productItem: {
      marginRight: theme.spacing(1),
    },
    iconContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    removeIcon: {
      background: 'red',
      borderRadius: '50%',
      color: 'white',
    },
    formControl: {
      width: '100%',
    },
    error: {
      color: 'red',
    },
    card: {
      background: '#F5F5F5',
      boxShadow: 'none',
    },
    right: {
      textAlign: 'right',
      marginRight: theme.spacing(1),
    },
    checkoutBtn: {
      marginTop: theme.spacing(3),
      width: '100%',
    },
    button: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: '100%',
    },
    noItem: {
        marginBottom: theme.spacing(2),
    },
    pb2:{
        marginBottom: theme.spacing(2), 
    }
  }));

const Layout = () => {
    const classes = useStyles();
    const [card,setCard] = useState(null);
    const [products,setProducts] = useState([]);
    const [checkout,setCheckout] = useState(initialTotal);
    const [error,setError] = useState(initialError);
    const [render,setRender] = useState(false);

    const handleCardNumber = e => {
        const value = +e.target.value;
        const result = db.find(ele => ele.number === value);
        if(result && result.balance > 0){
            setCard(result);
            setRender(true);
        }else{
            setRender(false);
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
        if(card){
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
    }

    return(
        <Grid container direction="row" justify="center" alignItems="center" color="primary" className="main-container">
            <Grid item md={6} xs={12} sm={12}>
                <Card>
                    <CardContent>
                        <Card className={classes.pb2}>
                            <CardContent>
                                <TextField id="card" label="Card Number" required onChange={handleCardNumber}/>
                            </CardContent>
                        </Card>
                        <Card className={classes.pb2}>
                            <CardContent>
                                <div>
                                    <h2 className="text-primary">Purchase</h2>
                                </div>
                                {render && <div>
                                    {products && products.map((product,key) => {
                                        return( card && 
                                        <Grid container className={classes.container} key={`grid-${key}`}>
                                            <Grid item md={4} xs={12} sm={12} className={classes.productItem}>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id={`select-product-${key}`}>Product</InputLabel>
                                                    <Select labelId={`select-product-${key}`} id={`product-${key}`} value={product.id} onChange={(e) => handleProduct(ITEM,e.target.value,key)}>
                                                        {card.allowedProducts.map((item,i) => 
                                                            <MenuItem value={item.id} key={`menuitem-${i}`}>{item.name}</MenuItem>
                                                        )}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={3} xs={12} sm={12} className={classes.productItem}>
                                                <TextField id={`qty-${key}`} label="Qty/Litre" onChange={(e) => handleProduct(QTY,e.target.value,key)} value={product.quantity} onBlur={(e) => handleBlur(key)}/>
                                            </Grid>
                                            <Grid item md={3} xs={12} sm={12} className={classes.productItem}>
                                                <TextField id={`price-${key}`} label="Unit Price/$" onChange={(e) => handleProduct(PRICE,e.target.value,key)} value={product.price} onBlur={(e) => handleBlur(key)}/>
                                                {error.price && (error.index === key ? <FormHelperText className={classes.error}>{`Unit Price should be between ${product.minPriceCents/100} and ${product.maxPriceCents/100}`}</FormHelperText> : '')}
                                            </Grid>
                                            <Grid item md={1} xs={12} sm={12} className={classes.iconContainer}>
                                                { key !== 0 && <RemoveIcon className={classes.removeIcon} onClick={() => addDeleteProduct(DELETE,key)} />}
                                            </Grid>
                                        </Grid> )
                                    })}
                                    <Button variant="outlined" color="primary" className={classes.button} onClick={() => addDeleteProduct(ADD,0)}>Add Product</Button>
                                </div> }
                                {!render && <div className={classes.noItem}>Please Enter valid Card number</div>}
                            </CardContent>
                        </Card>
                        <Card className={classes.card,classes.pb2}>
                            <CardContent>
                                <Typography variant="h4" className="text-primary">
                                    Checkout
                                </Typography>
                                <Grid container className={classes.container}>
                                    <Grid item sm={8}>
                                        <Typography variant="h6" component="p">
                                            SubTotal
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={3} className={classes.right}>
                                        <Typography variant="h6" component="p">
                                            {`$ ${checkout.subtotal.toFixed(2)}`}
                                        </Typography>
                                    </Grid>
                                    {products &&
                                        products.map((product) => {
                                        return (
                                            product.discountCentsPerLitre && (
                                            <>
                                                <Grid item sm={8}>
                                                {product.name}{`($ ${product.price}/L)`}
                                                </Grid>
                                                <Grid item sm={3} className={classes.right}>
                                                {`- $ ${(product.discountCentsPerLitre / 100 * product.quantity).toFixed(2)}`}
                                                </Grid>
                                            </>
                                            )
                                        );
                                        })}
                                    <Grid item sm={8}>
                                        <Typography variant="h6" component="p">
                                            {`Discount Card (${card ? card.number : ''})`}    
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={3} className={classes.right}>
                                        <Typography variant="h6" component="p">
                                            {`- $ ${(checkout.subtotal - checkout.total).toFixed(2)}`}    
                                        </Typography>
                                    </Grid>    
                                    <Grid item sm={8}>
                                        <Typography variant="h6" component="p">
                                            Total
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={3} className={classes.right}>
                                        <Typography variant="h6" component="p">
                                            {`$ ${checkout.total.toFixed(2)}`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Button variant="contained" color="primary" className={classes.checkoutBtn}>
                                PROCESS NOW
                                </Button>
                                <FormHelperText className={classes.error}>
                                {error.total ? 'Total is greater than card balence' : ''}
                                </FormHelperText>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Layout;