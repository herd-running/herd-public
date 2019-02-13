import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { SearchBar, Button, Icon } from 'react-native-elements'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getNewGroups } from '../actions/groups'
import { getNewRuns } from '../actions/runs'

import styles from '../styles/Dashboard'
import colors from '../constants/Colors'

import HeaderComponent from '../components/Header'
import RunCard from '../components/RunCard'
import GroupCard from '../components/GroupCard'
import RunFilters from '../components/RunFilters'

class DiscoverScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      viewing: 'Runs',
      runButtonColor: colors.otherColor,
      groupButtonColor: colors.disabledColor
    }
  }

  ///////////Change 2 to user ID
  componentDidMount() {
    this.props.getNewRuns(2)
    this.props.getNewGroups(2)
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
    return (
      <View style={styles.container}>
        <HeaderComponent header='Discover' />

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
          onChangeText={search => this.setState({ search })}
          value={this.state.search}
          containerStyle={{ marginLeft: 10, marginRight: 10 }}
        />
        {this.state.viewing === 'Runs' ?
          <ScrollView>
            <RunFilters />
            {this.props.newRuns.map((run) => {
              return <TouchableOpacity key={run.id} onPress={() => this.props.navigation.navigate('ViewRun', { runId: run.id })}>
                <RunCard {...run} />
              </TouchableOpacity>

            })}
          </ScrollView>
          :
          <ScrollView>
            {this.props.newGroups.map((group) => {
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

