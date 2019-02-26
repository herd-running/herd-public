import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SearchBar, Button } from 'react-native-elements'

import moment from 'moment'

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

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const sundayRuns = this.props.usersRuns.filter(run => {
      return run.day === 'Sunday' || moment(run.date).format('dddd') === 'Sunday'
    })

    const mondayRuns = this.props.usersRuns.filter(run => {
      return run.day === 'Monday' || moment(run.date).format('dddd') === 'Monday'
    })

    const tuesdayRuns = this.props.usersRuns.filter(run => {
      return run.day === 'Tuesday' || moment(run.date).format('dddd') === 'Tuesday'
    })

    const wednesdayRuns = this.props.usersRuns.filter(run => {
      return run.day === 'Wednesday' || moment(run.date).format('dddd') === 'Wednesday'
    })

    const thursdayRuns = this.props.usersRuns.filter(run => {
      return run.day === 'Thursday' || moment(run.date).format('dddd') === 'Thursday'
    })

    const fridayRuns = this.props.usersRuns.filter(run => {
      return run.day === 'Friday' || moment(run.date).format('dddd') === 'Friday'
    })

    const saturdayRuns = this.props.usersRuns.filter(run => {
      return run.day === 'Saturday' || moment(run.date).format('dddd') === 'Saturday'
    })

    const sortedRuns = [...sundayRuns, ...mondayRuns, ...tuesdayRuns, ...wednesdayRuns, ...thursdayRuns, ...fridayRuns, ...saturdayRuns]

    const filteredRuns = sortedRuns.filter(run => {
      return run.run_type.toLowerCase().includes(this.state.search) ||
        run.location.toLowerCase().includes(this.state.search) ||
        run.day && run.day.toLowerCase().includes(this.state.search) ||
        run.date && moment(run.date).format('dddd').toLowerCase().includes(this.state.search) ||
        run.terrain.toLowerCase().includes(this.state.search) ||
        run.creator.toLowerCase().includes(this.state.search) ||
        run.description && run.description.toLowerCase().includes(this.state.search)
    })

    return (
      <View style={styles.container}>
        <HeaderComponent header='My Runs' navigation={this.props.navigation} logout={true} />

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
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={{ color: colors.otherColor, fontSize: 25 }}>No runs yet!</Text>
            <Button
              title='Discover Runs'
              onPress={() => this.props.navigation.navigate('Discover')}
              buttonStyle={{ backgroundColor: colors.otherColor, marginTop: 10, width: 200 }}
              titleStyle={{ color: colors.backgroundColor }}
            />
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

