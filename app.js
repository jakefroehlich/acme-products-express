const React = require('react');
const ReactDOM = require('react-dom')

const index = document.querySelector('#app');

class App extends React.Component {
    constructor() {
        super();

        this.state = {};
    }

    componentDidMount() {
        // axios.get('http://localhost:3000')
    }

    render() {
        return <div>
            <h1>ACME Products</h1>
            <nav>
                <button>Home</button>
                <button>Products</button>
                <button>Create A Product</button>
            </nav>
        </div>
    }
}

ReactDOM.render(<App />, index)