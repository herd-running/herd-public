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
    const filteredGroups = this.props.usersGroups.filter(group => {
      return group.name.toLowerCase().includes(this.state.search) || 
        group.description.toLowerCase().includes(this.state.search)
    })

    return (
      <View style={styles.container}>
        <HeaderComponent header='My Groups' navigation={this.props.navigation} logout={true}/>

        <View style={{ justifyContent: 'center' }}>
          <SearchBar
            lightTheme={true}
            placeholder="Search"
            onChangeText={(search) => this.setState({ search: search.toLowerCase() })}
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
        {filteredGroups.length ?
          <ScrollView>
            {filteredGroups.map((group) => {
              return <TouchableOpacity key={group.group_id} onPress={() => this.props.navigation.navigate('ViewGroup', { groupId: group.group_id })}>
                <GroupCard {...group} />
              </TouchableOpacity>
            })}
          </ScrollView>
          :
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Button
              title='Discover Groups'
              onPress={() => this.props.navigation.navigate('Discover', {viewing: 'Groups'})}
              buttonStyle={{ backgroundColor: colors.otherColor, marginBottom: 10, width: 200 }}
              titleStyle={{ color: colors.backgroundColor }}
            />
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