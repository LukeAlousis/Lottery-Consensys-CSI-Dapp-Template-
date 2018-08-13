/* Home View without the use of drizzle components */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AccountData, ContractData } from 'drizzle-react-components'
//import { Button, Form, FormGroup, Input, Container, Row, Col} from 'reactstrap'
//resources
  //const sigUtil = require("eth-sig-util")
//components
import Header from '../../components/Header'
import Loadable from 'react-loading-overlay'

class Lottery extends Component {
  constructor(props, context) {
    super(props)
    /* Get contract data by accessing the contracts via 'context'. */
    this.contracts = context.drizzle.contracts

    this.state = {
      manager: '',
      players: [],
      balance: ''
    };
  }

  async componentDidMount() {
    const manager = await this.contracts.Lottery.methods.manager().call();
    const players = await this.contracts.Lottery.methods.getPlayers().call();
    const balance = await this.context.drizzle.web3.eth.getBalance(this.contracts.Lottery.options.address);

    this.setState({ manager, players, balance });
  }

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {this.state.manager}. 
          There are currently {this.state.players.length} people entered,
          competing to win {this.context.drizzle.web3.utils.fromWei(this.state.balance, 'ether')} ether!

        </p>

      </div>

    );
  }

}

Lottery.contextTypes = {
  drizzle: PropTypes.object
}

export default Lottery
