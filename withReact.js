class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false, frontImage: true };
    this.toggleImage = this.toggleImage.bind(this);
  }

  componentDidMount() {
    fetch(`http://pokeapi.co/api/v2/pokemon/${this.props.id}`)
      .then((details) => details.json())
      .then(({ name, sprites }) => {
        const { front_default: frontImg, back_default: backImg } = sprites;
        const pokemon = { name, frontImg, backImg };
        this.setState(() => ({ pokemon, loaded: true }));
      });
  }

  toggleImage() {
    this.setState((state) => ({ frontImage: !state.frontImage }));
  }

  render() {
    if (!this.state.loaded) {
      return React.createElement('p', null, 'loading...');
    }

    const { name, frontImg, backImg } = this.state.pokemon;
    const nameBox = React.createElement('p', null, name.toUpperCase());
    const src = this.state.frontImage ? frontImg : backImg;

    const image = React.createElement('img', {
      onClick: this.toggleImage,
      src,
      style: { cursor: 'pointer' },
    });

    const boxStyle = {
      width: '140px',
      boxShadow: '0 0 4px 4px rgb(220,220,220)',
      borderRadius: '4px',
      margin: '15px',
    };
    return React.createElement('div', { style: boxStyle }, nameBox, image);
  }
}

const Card = function (props) {
  const style = {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center',
  };
  return React.createElement('div', { style }, props.children);
};

const main = function () {
  const mainContainer = document.getElementById('main_container');
  const pokemonIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const pokemons = pokemonIds.map((id) =>
    React.createElement(Pokemon, { id, key: id })
  );
  ReactDOM.render(React.createElement(Card, null, pokemons), mainContainer);
};

main();
