import { Component } from "react";
import { Button, Card, Spinner } from "react-bootstrap";

class MovieCard extends Component {
  state = {
    movieObj: null // inizializziamo come null per poter usare questo valore iniziale per determinare la renderizzazione condizionale del nostro elemento
    // null è falsy
  };

  fetchMovies = async () => {
    try {
      const resp = await fetch("http://www.omdbapi.com/?apikey=24ad60e9&s=" + this.props.movieTitle);
      const data = await resp.json();
      console.log("RESPONSE ", data);
      this.setState({ movieObj: data.Search[0] }, () => {
        // console.log("ASYNC LOG FROM setState ", this.state.movieObj);
      });

      console.log("setState");
      //   console.log("SYNC LOG FROM FEETCHMOVIES ", this.state.movieObj);
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    console.log("componentDidMount()");
    this.fetchMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    // intercetta qualsiasi aggiornamento del componente (fase di UPDATE)
    // quindi ad ogni cambio di state o props ricevute

    // prevProps e prevState sono i due parametri propri di componentDidUpdate
    // sono ciò che lo differenzia da un comune render()

    // nel nostro caso vogliamo che this.fetchMovies() venga invocato quando viene scelto un nuovo titolo in App.jsx
    // quindi quando il nostro componente MovieCard riceve nuove props corrispondenti a this.state.movieTitle di App

    console.log("componentDidUpdate()");
    // quello che non vogliamo succeda è di invocare this.fetchMovies() più di una volta

    console.log("prevProps ", prevProps);
    console.log("this.props ", this.props);

    if (prevProps.movieTitle !== this.props.movieTitle) {
      // creare una condizione di guardia è OBBLIGATORIO quando si usa componentDidUpdate
      // la condizione è necessaria ad evitare loop infiniti di aggiornamento causati dal setState che fa aggiornare il componente ugualmente.
      this.fetchMovies(); // fetchMovies avverrà SOLO quando viene cambiato il titolo dalla select, che ci porta ad avere una nuova prop movieTitle
    } else {
      // se siamo qui è probabilmente per via del setState che avviene dentro fetchMovies
      console.log("niente di nuovo su movieTitle");
      // non vogliamo attivare una nuova fetch
    }
  }

  componentWillUnmount() {
    console.log("il componente si sta smontando...");
  }

  render() {
    // this.fetchMovies() // non posso chiamare fetchMovies dentro render === LOOP INFINITO
    console.log("MovieCard RENDER Props: ", this.props.movieTitle);
    console.log("MovieCard RENDER State: ", this.state.movieObj);
    return (
      <div className="mt-5">
        {this.state.movieObj ? (
          <Card>
            <Card.Img variant="top" src={this.state.movieObj.Poster} />
            <Card.Body>
              <Card.Title>
                {this.state.movieObj.Type}: {this.state.movieObj.Title}
              </Card.Title>
              <Card.Text>Year: {this.state.movieObj.Year}</Card.Text>
              <Button variant="primary">{this.state.movieObj.imdbID}</Button>
            </Card.Body>
          </Card>
        ) : (
          <Spinner animation="grow" variant="warning" />
        )}
      </div>
    );
  }
}

export default MovieCard;
