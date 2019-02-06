import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { SearchBar, Button, Icon } from 'react-native-elements'

import styles from '../styles/Dashboard'
import colors from '../constants/Colors'

import HeaderComponent from '../components/Header'
import RunCard from '../components/RunCard'
import GroupCard from '../components/GroupCard'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      viewing: 'Runs',
      runButtonColor: colors.otherColor,
      groupButtonColor: colors.disabledColor
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
      groupButtonColor: colors.disabledColor
    })
  }

  onTogglePressGroups = () => {
    this.setState({
      viewing: 'Groups',
      runButtonColor: colors.disabledColor,
      groupButtonColor: colors.otherColor
    })
  }

  render() {
    const { search } = this.state;

    const runs = [
      {
        runType: 'Long Run',
        location: 'Discovery Park',
        group: 'Seattle Running Club',
        day: 'Saturday',
        time: '7:00am',
        rating: 5
      },
      {
        runType: 'Tempo Run',
        location: 'Green Lake',
        group: 'Green Lake Running Group',
        day: 'Tuesday',
        time: '6:00pm',
        rating: 3
      },
      {
        runType: 'Easy Run',
        location: 'Alki',
        group: 'West Seattle Runners',
        day: 'Monday',
        time: '6:00am',
        rating: 4
      },
    ]

    return (
      <View style={styles.container}>
        <HeaderComponent />
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
          <Button
            title='My Runs'
            onPress={this.onTogglePressRuns}
            buttonStyle={{ backgroundColor: this.state.runButtonColor, width: 145, marginRight: 15 }}
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
            buttonStyle={{ backgroundColor: this.state.groupButtonColor, width: 145 }}
            titleStyle={{ color: colors.backgroundColor }}
            icon={
              <Icon
                name='account-group'
                type='material-community'
                size={25}
                color={colors.backgroundColor}
                iconStyle={{ marginRight: 5 }}
              />
            }
          />
        </View>

        <View style={{ justifyContent: 'center' }}>
          <SearchBar
            lightTheme={true}
            placeholder="Search"
            onChangeText={this.updateSearch}
            value={search}
            containerStyle={{ marginLeft: 10, marginRight: 10 }}
          />

        </View>
        <ScrollView>
          {this.state.viewing === 'Runs' ?
            runs.map((run, i) => {
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewRun')}>
              <RunCard key={i} {...run}/>
            </TouchableOpacity>

            })
            :
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewGroup')}>
              <GroupCard />
            </TouchableOpacity>
          }
        </ScrollView>
      </View>
    );
  }
}
