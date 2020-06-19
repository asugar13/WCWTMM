import React from "react";
import ReactDOM from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


export function Row(props) {
    console.log("ROW");
    return (
      <TableRow>
        <TableCell> {props.name}</TableCell>
        <TableCell> {props.amount}</TableCell>
        <TableCell> {props.country}</TableCell>
        <TableCell> {props.memo} </TableCell>
      </TableRow>
    );
  }

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  renderRow(user) {
    console.log('calling renderrow on ' + user.username);
    return (
      <Row name={user.username}
          amount={user.amount}
          country={user.country}
          memo={user.memo}
          />
        );
  }

  renderRows(userList) {
  return userList.map(user=>this.renderRow(user))
  }

  componentDidMount() {
    fetch("/top20").then(response => response.json())
    .then(data => this.setState({users: data}))
  }


  render() {
    const rankingStyle = {
      width: "90%",
      margin: "auto"
    }
    console.log(this.state.users)
    return (
      <TableContainer style={rankingStyle} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Amount (USD)</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Memo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {this.renderRows(this.state.users)}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
};

  export default Ranking;
