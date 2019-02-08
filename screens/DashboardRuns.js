import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { SearchBar } from 'react-native-elements'

import styles from '../styles/Dashboard'

import HeaderComponent from '../components/Header'
import RunCard from '../components/RunCard'

export default class DashboardRuns extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: ''
    }
  }

  updateSearch = search => {
    this.setState({ search });
  };

  render() {

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

    return (
      <View style={styles.container}>
        <HeaderComponent header='My Runs'/>

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
          {runs.map((run, i) => {
            return <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('ViewRun')}>
              <RunCard {...run} />
            </TouchableOpacity>
            })
          }
        </ScrollView>
      </View>
    );
  }
}
