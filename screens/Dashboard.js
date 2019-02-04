import React, { Component } from 'react';
import { View, ScrollView } from 'react-native'
import { SearchBar, Button, Icon } from 'react-native-elements'

import styles from '../styles/Dashboard'
import colors from '../constants/Colors'

import HeaderComponent from '../components/Header'
import RunCard from '../components/RunCard'
import GroupCard from '../components/GroupCard'
import NavBar from '../components/NavBar'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      viewing: 'Runs',
      runButtonColor: colors.otherColor,
      groupButtonColor: '#c1c5cc'
    }
  }
  // static navigationOptions = {
  //   title: 'app.json',
  // };

  updateSearch = search => {
    this.setState({ search });
  };

  onTogglePressRuns = () => {
    this.setState({
      viewing: 'Runs',
      runButtonColor: colors.otherColor,
      groupButtonColor: '#c1c5cc'
    })
  }

  onTogglePressGroups = () => {
    this.setState({
      viewing: 'Groups',
      runButtonColor: '#c1c5cc',
      groupButtonColor: colors.otherColor
    })
  }

  render() {
    const { search } = this.state;

    return (
      <View style={styles.container}>
        <HeaderComponent />
        <SearchBar
          lightTheme={true}
          placeholder="Search"
          onChangeText={this.updateSearch}
          value={search}
        />
        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
          <Button
            title='My Runs'
            onPress={this.onTogglePressRuns}
            buttonStyle={{backgroundColor: this.state.runButtonColor, width: 130}}
            titleStyle={{ color: colors.backgroundColor }}
            icon={
              <Icon
              name='run'
              type='material-community'
              size={25}
              color={colors.backgroundColor}
            />
            }
          />
          <Button
            title='My Groups'
            onPress={this.onTogglePressGroups}
            buttonStyle={{backgroundColor:this.state.groupButtonColor, width: 130}}
            titleStyle={{ color: colors.backgroundColor }}
            icon={
              <Icon
              name='account-group'
              type='material-community'
              size={25}
              color={colors.backgroundColor}
              iconStyle={{marginRight: 5}}
            />
            }
          />
        </View>
        <ScrollView>
          {this.state.viewing === 'Runs' ?
            <RunCard />
            :
            <GroupCard />
          }
        </ScrollView>
        <NavBar />
      </View>
    );
  }
}
