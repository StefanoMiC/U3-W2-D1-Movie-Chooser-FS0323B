import { Component } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieCard from "./components/MovieCard";

class App extends Component {
  state = {
    movieTitle: "Iron Man"
  };

  render() {
    console.log("App RENDER State: ", this.state.movieTitle);
    return (
      <div className="App">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} lg={4}>
              <Form.Label className="display-4 mt-5">Scegli un film</Form.Label>
              <Form.Select
                onChange={e => {
                  this.setState({ movieTitle: e.target.value });
                }}
              >
                <option>Iron Man</option>
                <option>Black Panther</option>
                <option>Doctor Strange</option>
                <option>The Batman</option>
                <option>Spiderman</option>
                <option>Wonder Woman</option>
                <option>Black Widow</option>
              </Form.Select>
            </Col>
            <Col xs={12} lg={4}>
              <MovieCard movieTitle={this.state.movieTitle} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
