import React from "react";
import { Link } from "react-router-dom";
import CurrentUser from "./CurrentUser";
import Nav from "./Nav";
import UserList from "./UserList";
import Playlist from "./Playlist";
import './Home.css';


class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentUser: {},
      allUsers: [],
      showUsers: true
    }
    this.handlerUpdateSelectedUsers = this.handlerUpdateSelectedUsers.bind(this);
    this.getSelectedUsers = this.getSelectedUsers.bind(this);
    this.toggleUserList = this.toggleUserList.bind(this);
  }

  handlerUpdateSelectedUsers(event) {
    const users = [...this.state.allUsers]
    const userId = event.target.name;
    let user = this.findUser(userId)
    let index = this.state.allUsers.indexOf(user)

    user.selected = !user.selected
    users[index] = user

    this.setState(({
      allUsers: users,
    }))
  };

  getSelectedUsers() {
    let selectedUsers = this.state.allUsers.filter(user => user.selected)
    if (selectedUsers.length == 0) {
      return selectedUsers
    } else {
      let selectedUsersIds = selectedUsers.map(user =>
        user.id
      )
      return selectedUsersIds
    }
  }

  findUser(userId) {
    let specificUser;
    this.state.allUsers.map(user => {
      if (user.id == userId) {
        specificUser = user;
      };
    })
    return specificUser;
  }

  toggleUserList(){
    this.setState(state => ({
      showUsers: !state.showUsers
    }))
  }

  componentDidMount() {

    fetch("/api/v1/users.json")
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error("Network response was not ok.")
      })
      .then(data => { this.setState({ allUsers: data }) });

    fetch("/api/v1/currentuser.json")
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error("Network response was not ok.")
      })
      .then(data => { this.setState({ currentUser: data }) });
  };

  render() {

    const mynav = {
      backgroundColor: "#ffaa01",
      height: "75px",
      padding: "10px",
      fontSize: "4rem",
    };

    return (
      <div>

        <div style={mynav}>
          <Nav
            currentUser={this.state.currentUser}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
          <UserList
            allUsers={this.state.allUsers}
            showUsers={this.state.showUsers}
            checkboxFunction={this.handlerUpdateSelectedUsers}
          />

          <Playlist
            group={this.getSelectedUsers()}
            toggleUserList={this.toggleUserList}
          />
        </div>

      </div>

    );
  }
}

export default Home;
