import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SearchBar, Button } from 'react-native-elements'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUsersGroups } from '../actions/groups'

import styles from '../styles/Dashboard'

import HeaderComponent from '../components/Header'
import GroupCard from '../components/GroupCard'

class DashboardGroups extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
    }
  }

  componentDidMount() {
    const userId = this.props.authentication.user
    this.props.getUsersGroups(userId)
  }

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    return (
      <View style={styles.container}>
        <HeaderComponent header='My Groups' />

        <View style={{ justifyContent: 'center' }}>
          <SearchBar
            lightTheme={true}
            placeholder="Search"
            onChangeText={(search) => this.setState({ search })}
            value={this.state.search}
            containerStyle={{ marginLeft: 10, marginRight: 10 }}
          />

          <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 5 }}>
            <Button
              title='Add My Own Group'
              onPress={() => this.props.navigation.navigate('CreateGroup')}
              buttonStyle={{ backgroundColor: colors.otherColor, width: 200 }}
              titleStyle={{ color: colors.backgroundColor }}
            />
          </View>

        </View>
        {this.props.usersGroups.length ?
          <ScrollView>
            {this.props.usersGroups.map((group) => {
              return <TouchableOpacity key={group.group_id} onPress={() => this.props.navigation.navigate('ViewGroup', { groupId: group.group_id })}>
                <GroupCard {...group} />
              </TouchableOpacity>
            })}
          </ScrollView>
          :
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={{ color: colors.otherColor, fontSize: 25 }}>No groups yet!</Text>
          </View>
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
    usersGroups: state.usersGroups
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getUsersGroups
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardGroups)