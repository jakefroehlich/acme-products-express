const React = require('react');
const ReactDOM = require('react-dom')
const axios = require('axios')
const { HashRouter, Switch, Link, Route, Redirect } = require('react-router-dom')


const index = document.querySelector('#app');



class App extends React.Component {
    constructor() {
        super();

        this.state = {
            products: [],
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3000/api/products')
            .then((data) => {
                this.setState({ products: data.data})})
    }

    render() {
        console.log(this.state.products)
        const Home = () => <h1>Home</h1>
        const Products = () => {
            let lis;
            if (this.state.products) {
                lis = this.state.products.map(product => {
                    return <div>
                        <li key = {product.name}>{product.name}</li>
                        <button onClick={() => {axios.delete('./api/product/:id')}}>Delete</button>
                </div>
            }
                )
            }
            return <div>
                <h1>Products</h1>
                <ul>
                {lis}    
            </ul>
            </div>
        }

        const Creator = () => {
            let input;
            return <div>
                <form onSubmit= {(ev)=>{
                    ev.preventDefault
                    axios.post('/api/products',{ name: input})
                        .then(res => this.setState({ products: res.data}))}}>
                <input type='text' onChange={(ev) => {
                    input = ev.target.value
                    console.log(input)
                }}></input>
                <button type = 'submit'>
                    Save</button>
                </form>
            </div>
        }


        const Nav = (props) => {
            const path = props.location.pathname
            return <nav>
            <Link to='/home'>Home</Link>
            <Link to='/products'>Products</Link>
            <Link to='/products/create'>New Product</Link>
        </nav>
        }
        
        return <div>
            <h1>ACME Products</h1>
            <HashRouter>
                    <Route component={ Nav} />
                <Switch>
                    <Route path='/home' component={ Home } />
                    <Route exact path='/products' component={ Products } />
                    <Route path='/products/create' component={ Creator } />
                    <Redirect to='/home'></Redirect>
                </Switch>
            </HashRouter>

        </div>
    }
}

ReactDOM.render(<App />, index)