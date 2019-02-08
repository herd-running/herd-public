import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { SearchBar } from 'react-native-elements'

import styles from '../styles/Dashboard'

import HeaderComponent from '../components/Header'
import GroupCard from '../components/GroupCard'

export default class DashboardGroups extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
    }
  }

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
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
        <HeaderComponent header='My Groups' />

        <View style={{ justifyContent: 'center' }}>
          <SearchBar
            lightTheme={true}
            placeholder="Search"
            onChangeText={(search) => this.setState({search})}
            value={this.state.search}
            containerStyle={{ marginLeft: 10, marginRight: 10 }}
          />

        </View>
        <ScrollView>
          {groups.map((group, i) => {
            return <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('ViewGroup')}>
              <GroupCard {...group} />
            </TouchableOpacity>
          })}
        </ScrollView>
      </View>
    )
  }
}