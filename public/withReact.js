class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }
  componentDidMount() {
    console.log('hi');
    fetch(`http://pokeapi.co/api/v2/pokemon/${this.props.id}`)
      .then((details) => details.json())
      .then(({ name, sprites }) => {
        console.log(name, sprites);
        this.setState((state) => ({
          pokemon: {
            name,
            imageUrl: sprites.front_default,
          },
          loaded: true,
        }));
      });
  }
  render() {
    if (!this.state.loaded) {
      return React.createElement('p', null, 'loading...');
    }
    const name = React.createElement(
      'p',
      { style: { color: 'red' } },
      this.state.pokemon.name
    );
    const image = React.createElement('img', {
      src: this.state.pokemon.imageUrl,
      alt: 'pokeImage',
    });
    return React.createElement(
      'div',
      { style: { border: '1px solid black', borderRadius: '4px' } },
      name,
      image
    );
  }
}
const Card = (props) =>
  React.createElement(
    'div',
    {
      style: {
        display: 'flex',
        justifyContent: 'space-evenly',
        textAlign: 'center',
      },
    },
    props.children
  );
const main = function () {
  const mainContainer = document.getElementById('main_container');
  const pokemons = [1, 2, 3, 4, 5].map((id) =>
    React.createElement(Pokemon, { id, key: id })
  );
  ReactDOM.render(React.createElement(Card, null, pokemons), mainContainer);
};
main();
