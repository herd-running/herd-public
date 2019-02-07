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
      }
    ]

    const groups = [
      {
        title: 'Seattle Running Club',
        description: 'We are a Puget Sound-based running group that celebrates the beauty of our region and our personal potential with training, competition, and community. While the club offers a unique focus on trail running, members also rally on the road, track, and cross country course.'
      },
      {
        title: 'Green Lake Running Groups',
        description: "Green Lake is one of the most popular destinations for urban runnings in the Seattle area. The Seattle Green Lake Running Group was created with the intent of creating a running community that supports and encourages a healthy and active lifestyle through group events and participation. Our goal is to try and have something for everyone and the more runners that attend events the better chance that there will be running buddies for all. Whether you're looking to increase your cardiovascular endurance, meet some new exercise buddies or have training partners for your next race you've come to the right place."
      },
      {
        title: 'West Seattle Running Club',
        description: 'West Seattle Running Club is a social and casual running club for all levels. We provide support and encouragement to each other in achieving our running goals and in having fun along the way. '
      },
      {
        title: 'Jill\'s Sunday Runday Group',
        description: 'Join Jill for all or part of a long run on Sunday mornings!'
      }
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
              return <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('ViewRun')}>
                <RunCard {...run} />
              </TouchableOpacity>

            })
            :
            groups.map((group, i) => {
              return <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('ViewGroup')}>
                <GroupCard {...group} />
              </TouchableOpacity>
            })
          }
        </ScrollView>
      </View>
    );
  }
}
