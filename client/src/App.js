import Header from './components/Header';
import Clients from './components/Clients';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header></Header>

        <div className="container">
          <Clients></Clients>
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
