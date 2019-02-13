import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { SearchBar, Button } from 'react-native-elements'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUsersGroups } from '../actions/groups'

import styles from '../styles/Dashboard'

import HeaderComponent from '../components/Header'
import GroupCard from '../components/GroupCard'
import AddGroup from '../components/AddGroup'

class DashboardGroups extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
    }
  }

  /////// replace 2 wth user ID
  componentDidMount() {
    this.props.getUsersGroups(2)
  }

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    return (
      <View style={styles.container}>
        <HeaderComponent header='My Groups' /*component={<AddGroup/>*/ />

        <View style={{ justifyContent: 'center' }}>
          <SearchBar
            lightTheme={true}
            placeholder="Search"
            onChangeText={(search) => this.setState({ search })}
            value={this.state.search}
            containerStyle={{ marginLeft: 10, marginRight: 10 }}
          />

          <View style={{alignItems: 'center', marginTop: 10, marginBottom: 5}}>
            <Button
              title='Add New Group'
              onPress={() => this.props.navigation.navigate('CreateGroup')}
              buttonStyle={{ backgroundColor: colors.otherColor, width: 200 }}
              titleStyle={{ color: colors.backgroundColor }}
            />
          </View>

        </View>
        <ScrollView>
          {this.props.usersGroups.map((group) => {
            return <TouchableOpacity key={group.group_id} onPress={() => this.props.navigation.navigate('ViewGroup', { groupId: group.group_id })}>
              <GroupCard {...group} />
            </TouchableOpacity>
          })}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    usersGroups: state.usersGroups
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getUsersGroups
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardGroups)