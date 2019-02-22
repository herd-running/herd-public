import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SearchBar } from 'react-native-elements'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUsersRuns } from '../actions/runs'

import styles from '../styles/Dashboard'
import colors from '../utils/Colors'

import HeaderComponent from '../components/Header'
import RunCard from '../components/RunCard'

class DashboardRuns extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: ''
    }
  }

  componentDidMount = () => {
    const userId = this.props.authentication.user
    this.props.getUsersRuns(userId)

  }

  componentWillReceiveProps = (props) => {
    if (!props.usersRuns.length) props.navigation.navigate('Discover')
  }

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const date = new Date
    const today = date.getDay()

    const days = {
      'Sunday': 0,
      'Monday': 1,
      'Tuesday': 2,
      'Wednesday': 3,
      'Thursday': 4,
      'Friday': 5,
      'Saturday': 6
    }

    const sorted = this.props.usersRuns.sort((a, b) => {
      // console.warn('a', typeof days[a.day], 'b', days[b.day])
      days[b.day] - days[a.day]
    })
    // console.warn(sorted)

    const filteredRuns = this.props.usersRuns.filter(run => {
      return run.run_type.toLowerCase().includes(this.state.search) || 
        run.location.toLowerCase().includes(this.state.search) || 
        run.day && run.day.toLowerCase().includes(this.state.search) ||
        run.terrain.toLowerCase().includes(this.state.search) ||
        run.creator.toLowerCase().includes(this.state.search) ||
        run.description && run.description.toLowerCase().includes(this.state.search)
    })

    return (
      <View style={styles.container}>
        <HeaderComponent header='My Runs' />

        <View style={{ justifyContent: 'center' }}>
          <SearchBar
            lightTheme={true}
            placeholder="Search"
            onChangeText={(search) => this.setState({ search: search.toLowerCase() })}
            value={this.state.search}
            containerStyle={{ marginLeft: 10, marginRight: 10 }}
          />
        </View>
        {filteredRuns.length ?
          <ScrollView>
            {filteredRuns.map((run) => {
              return <TouchableOpacity key={run.run_id} onPress={() => this.props.navigation.navigate('ViewRun', { runId: run.run_id })}>
                <RunCard {...run} />
              </TouchableOpacity>
            })
            }
          </ScrollView>
          :
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={{color: colors.otherColor, fontSize: 25 }}>No runs yet!</Text>
          </View>
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
    usersRuns: state.usersRuns
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getUsersRuns
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardRuns)

