import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { SearchBar } from 'react-native-elements'

import { connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUsersRuns } from '../actions/runs'

import styles from '../styles/Dashboard'

import HeaderComponent from '../components/Header'
import RunCard from '../components/RunCard'

class DashboardRuns extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: ''
    }
  }

  /////////change  2 to take user ID
  componentDidMount = () => {
    this.props.getUsersRuns(2)
  }

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const date = new Date
    const today = date.getDay()
    
    const days = {
      'Sunday' : 0,
      'Monday' : 1,
      'Tuesday' : 2,
      'Wednesday' : 3,
      'Thursday' : 4,
      'Friday' : 5,
      'Saturday' : 6
    }

    const sorted = this.props.usersRuns.sort( (a, b) => {
      // console.warn('a', typeof days[a.day], 'b', days[b.day])
      days[b.day] - days[a.day]})
    // console.warn(sorted)
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
          {sorted.map((run) => {
            return <TouchableOpacity key={run.run_id} onPress={() => this.props.navigation.navigate('ViewRun', { runId: run.run_id })}>
              <RunCard {...run} />
            </TouchableOpacity>
            })
          }
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usersRuns: state.usersRuns
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getUsersRuns
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardRuns)

