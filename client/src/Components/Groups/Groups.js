import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { ListGroup, ListGroupItem, Row, Col, PageHeader } from 'react-bootstrap';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Article from 'grommet/components/Article';
import Image from 'grommet/components/Image';

import Headline from 'grommet/components/Headline';
import Heading from 'grommet/components/Heading';
import Pulse from 'grommet/components/icons/Pulse';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Search from 'grommet/components/Search';

import Columns from 'grommet/components/Columns';

import Section from 'grommet/components/Section';
import Hero from 'grommet/components/Hero';
import Box from 'grommet/components/Box';

import GroupProfile from '../GroupProfile/GroupProfile';
import ProfilePage from '../ProfilePage/ProfilePage';
import Footer from '../Footer/Footer';
import Landing from '../Landing/Landing';
import Nav from '../Nav/Nav';
import './Groups.css'

var pic = require('../images/groupImages/architecture-art-business-191429.jpg');

var logo = require('../images/Logo/OwoLogoNWGroup3MD.png');



class Groups extends Component {
  constructor(){
    super();
    this.state = {
      groups: []
    }

    this.renderGroupsList = this.renderGroupsList.bind(this)
    this.handleSearch = this.handleSearch.bind(this)

  }


  getAllGroups = () => {
    fetch("/groups")
    .then(res => res.json())
    .then(groups => {
      console.log('what is this:',groups)
      console.log(groups.data[0]);
      let data = groups.data
      this.setState({
        groups: data
      });
    });
  }


  componentDidMount(){
    this.getAllGroups();
  }

  showGroupMembers(total_members){
    let owlstr = [];
    for(var i = 0; i < total_members; i++){

      owlstr.push("https://image.flaticon.com/icons/svg/12/12324.svg");

    }
    //console.log(owlstr);
    return owlstr.map((owl)=> <div><img src={owl} className="avatarStyle" alt="username"/></div>);
  }


  handleSearch(event) {
    console.log("we sure are handling that search....")
  }

  renderGroupsList(){
    const { groups } = this.state;
    console.log("this is groups from state", groups);
  return(

    <Article scrollStep={true}>

    <Section pad='medium'
      justify='center'
      align='center'
      className="groups-header"
      colorIndex={'#25283D'}
      >
      <Nav />
      <Image src={logo}  />
      </Section>
    <Section pad='medium'
      justify='center'
      align='center'>


      <Box flex={true}
        justify='end'
        direction='row'
        responsive={false}
        size='large'>
        <Search inline={true}
        dropAlign={{"top": "bottom"}}

        onDOMChange={this.handleSearch()}
          fill={true}
          size='large'
          placeHolder='Search Groups'
          dropAlign={{"right": "right"}} />
      </Box>
      </Section>

    <Section pad='large'
      justify='center'
      align='center'
  >
      <Headline>Groups</Headline>


        </Section>
      

      <Section pad='large'
        justify='center'
        align='center'>
        <Tiles fill={true}
          selectable={true}
          >
            {groups.map((group)=>(
              <Tile>


                 <Link to={`/groups/${group.id}`}><Card thumbnail={pic}
                  heading={group.group_name}
                  label={`Group Creator: ${group.creator}`}
                  description={group.description_}

                  />
                  <div className="avatar">
                  <div className="avatarList">
                  {this.showGroupMembers(group.total_members)}
                </div>
              </div>
            </Link>
          </Tile>

        ))}


      </Tiles>
  </Section>

  </Article>



  )
  }

  render(){
    let groupList = this.state.groups
    console.log(groupList)
    return(

<div>

<Switch>
      <Route exact path="/groups" component={this.renderGroupsList} />
      <Route path="/groups/:groupID/charge"/>
      <Route path="/groups/:groupID" component={GroupProfile}/>
      <Route path="/users/profile" component={ProfilePage}/>
      <Route path="/" component={Landing} />
</Switch>

      </div>
    )
  }

}


export default Groups;
