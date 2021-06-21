import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor(props) {
    super(props);

    this.state = { rankingList: [] };

    this.getRankingFromLocalStorage = this.getRankingFromLocalStorage.bind(this);
  }

  componentDidMount() {
    this.getRankingFromLocalStorage();
  }

  getRankingFromLocalStorage() {
    const rankingData = localStorage.getItem('ranking');
    const parsedRankingData = JSON.parse(rankingData);

    if (parsedRankingData) {
      this.setState({ rankingList: parsedRankingData });
    }
  }

  render() {
    const { rankingList } = this.state;

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>

        <div>
          {
            rankingList
              .sort((a, b) => b.score - a.score)
              .map(({ name, score, picture }, index) => (
                <div key={ picture }>
                  <img src={ picture } alt="profile" />
                  <h1 data-testid={ `player-name-${index}` }>{name}</h1>
                  <p data-testid={ `player-score-${index}` }>{score}</p>
                </div>
              ))
          }
        </div>

        <Link to="/" data-testid="btn-go-home">
          Ir para a home
        </Link>
      </div>
    );
  }
}

export default Ranking;
