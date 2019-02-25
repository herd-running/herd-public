import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { SearchBar, Button, Icon } from 'react-native-elements'
import { Dropdown } from 'react-native-material-dropdown'
import moment from 'moment'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getNewGroups } from '../actions/groups'
import { getNewRuns } from '../actions/runs'

import HeaderComponent from '../components/Header'
import RunCard from '../components/RunCard'
import GroupCard from '../components/GroupCard'
import { runType, day, pace, terrain } from '../utils/CreateRunOptions'

import styles from '../styles/Dashboard'
import colors from '../utils/Colors'

class DiscoverScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      viewing: 'Runs',
      runButtonColor: colors.otherColor,
      groupButtonColor: colors.disabledColor,
      showFilters: false,
      run_type: 'Any',
      day: 'Any',
      pace: 'Any Pace',
      terrain: 'Any'

    }
  }

  componentDidMount() {
    const userId = this.props.authentication.user
    this.props.getNewRuns(userId)
    this.props.getNewGroups(userId)
  }

  searchWithFilters = () => {
    this.setState({
      showFilters: false
    })

  }

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
    let filteredRuns = this.props.newRuns
    if (this.state.run_type !== 'Any') {
      filteredRuns = filteredRuns.filter(run => run.run_type === this.state.run_type)
    }

    if (this.state.day !== 'Any') {
      filteredRuns = filteredRuns.filter(run => (run.day && run.day === this.state.day) || (run.date && moment(run.date).format('dddd') === this.state.day))
    }

    if (this.state.pace !== 'Any Pace') {
      filteredRuns = filteredRuns.filter(run => run.pace === this.state.pace)
    }

    if (this.state.terrain !== 'Any') {
      filteredRuns = filteredRuns.filter(run => run.terrain === this.state.terrain)
    }

    const searchedNewRuns = filteredRuns.filter(run => {
      return (
        run.run_type.toLowerCase().includes(this.state.search) ||
        run.location.toLowerCase().includes(this.state.search) ||
        run.day && run.day.toLowerCase().includes(this.state.search) ||
        run.terrain.toLowerCase().includes(this.state.search) ||
        run.creator.toLowerCase().includes(this.state.search) ||
        run.description && run.description.toLowerCase().includes(this.state.search)
      )
    })

    const filteredNewGroups = this.props.newGroups.filter(group => {
      return group.name.toLowerCase().includes(this.state.search) ||
        group.description.toLowerCase().includes(this.state.search)
    })

    return (
      <View style={styles.container}>
        <HeaderComponent header='Discover' navigation={this.props.navigation} logout={true} />

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
          <Button
            title='New Runs'
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
            title='New Groups'
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

        <SearchBar
          lightTheme={true}
          placeholder="Search"
          onChangeText={search => this.setState({ search: search.toLowerCase() })}
          value={this.state.search}
          containerStyle={{ marginLeft: 10, marginRight: 10 }}
        />
        {this.state.viewing === 'Runs' ?
          <ScrollView>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
              <Button
                title='Filter'
                onPress={() => this.setState({ showFilters: !this.state.showFilters })}
                buttonStyle={{ backgroundColor: colors.otherColor, width: 300 }}
                titleStyle={{ color: colors.backgroundColor }}
                icon={
                  <Icon
                    name='filter'
                    type='font-awesome'
                    size={20}
                    color={colors.backgroundColor}
                    iconStyle={{ marginRight: 5 }}
                  />
                }
              />
              {this.state.showFilters &&
                <View style={{ width: '92%', padding: 20, backgroundColor: 'white', marginTop: 10 }}>
                  <Dropdown
                    label='Run Type'
                    data={[...runType, { value: 'Any' }]}
                    value={this.state.run_type}
                    fontSize={20}
                    labelFontSize={18}
                    itemCount={7}
                    animationDuration={0}
                    onChangeText={(run_type) => {
                      this.setState({ run_type })
                    }}
                  />
                  <Dropdown
                    label='Day of the Week'
                    data={[...day, , { value: 'Any' }]}
                    value={this.state.day}
                    fontSize={20}
                    labelFontSize={18}
                    itemCount={7}
                    onChangeText={(day) => this.setState({ day })}
                  />
                  <Dropdown
                    label='Pace'
                    data={pace}
                    value={this.state.pace}
                    fontSize={20}
                    labelFontSize={18}
                    itemCount={7}
                    onChangeText={(pace) => this.setState({ pace })}
                  />

                  <Dropdown
                    label='Terrain'
                    data={[...terrain, { value: 'Any' }]}
                    value={this.state.terrain}
                    fontSize={20}
                    labelFontSize={18}
                    itemCount={7}
                    onChangeText={(terrain) => this.setState({ terrain })}
                  />
                  <View style={{ alignItems: 'center' }}>
                    <Button
                      title='Search'
                      onPress={this.searchWithFilters}
                      buttonStyle={{ backgroundColor: colors.otherColor, width: 300 }}
                      titleStyle={{ color: colors.backgroundColor }}
                    />
                  </View>
                </View>
              }
            </View>
            {searchedNewRuns.reverse().map((run) => {
              return <TouchableOpacity key={run.id} onPress={() => this.props.navigation.navigate('ViewRun', { runId: run.id })}>
                <RunCard {...run} />
              </TouchableOpacity>
            })}
          </ScrollView>
          :
          <ScrollView>
            {filteredNewGroups.map((group) => {
              return <TouchableOpacity key={group.id} onPress={() => this.props.navigation.navigate('ViewGroup', { groupId: group.id })}>
                <GroupCard {...group} />
              </TouchableOpacity>
            })}
          </ScrollView>
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
    newGroups: state.newGroups,
    newRuns: state.newRuns
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getNewGroups,
    getNewRuns
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverScreen)

