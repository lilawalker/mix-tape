import React from "react";
import Checkbox from './Checkbox';
import Option from './Option';
import Group from './Group'

class UserList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      search: ''
    }
  }

  searchSpace(event) {
    let keyword = event.target.value;
    this.setState({search: keyword})
  }

  render() {

    const allUsers = this.props.allUsers.filter(users => {
      if (users.id !== this.props.currentUser.id) {
        return users
      }
    }).filter(users => {
      if (this.state.search == '') {
        return users
      }
      else if (users.username.toLowerCase().includes(this.state.search.toLowerCase()) && this.state.search !== '') {
        return users
      }
  }).map((user) => (

      // <Option
      //   id={user.id}
      //   name={user.username}
      //   image={user.image_url}
      // />

      <Checkbox
        id={user.id}
        name={user.username}
        checked={user.selected}
        onChange={this.props.checkboxFunction}
        key={user.id}
        style={checkbox}
      />
    ));

    const container = {
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "flex-start"
    }

    const title = {
      display: 'block',
      marginBottom: "15px",
      fontFamily: 'Audiowide, Verdana',
      fontSize: "2rem",
      fontWeight: 'Bold',
      color: "black"
    };

    const listContainer = {
      width: "70%",
      minWidth: "300px",
      padding: "10px",
      backgroundColor: "black",
      borderRadius: "8px"
    }

    const placeHolder = {
      width: "90%",
      marginBottom: "10px",
      backgroundColor: "#01dac5",
      fontFamily: 'Audiowide, Verdana',
      fontSize: "1rem",
      color: "#6416b9"
    }

    const usersList = {
      height: "200px",
      overflow: "hidden", 
      overflowY: "scroll",
      listStyle: "none",
      fontFamily: 'Audiowide, Verdana',
      fontSize: "1rem",
      color: "#ffaa01"
    }

    const groupContainer = {
      display: "flex", 
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: "20px",
      width: "60%",
    }

    const checkbox = {
      width: '16px',
      height: '16px',
      borderRadius: '100%',

      // transition: 'all .5s ease',
      // cursor: 'pointer',
      // position: 'absolute',
      // top: '-3px',
      // left: '-3px',
      background: 'white'
    }

    return(

      <>
      {this.props.showUsers &&
        <div style={container}>
          
          <h2 style={title}>FRIENDS</h2>
          
          <div style={listContainer}>
            <input type="text" placeholder="Search for friends" style={placeHolder} onChange={(event) => this.searchSpace(event)} />
            <form>
              <p style={usersList}>{allUsers}</p>
            </form>
          </div>

          <div style={groupContainer}>
            <Group
              selectedUsers = {this.props.selectedUsers}
            />
          </div>
        </div>
      }
      </>
    );
  }

}

export default UserList;
