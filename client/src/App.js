import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Header></Header>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="*" element={<NotFound></NotFound>}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
}

export default App;
