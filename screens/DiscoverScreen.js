import React, { Component } from 'react';
import { View, ScrollView } from 'react-native'
import { SearchBar, Button, Icon } from 'react-native-elements'

import styles from '../styles/Dashboard'
import colors from '../constants/Colors'

import HeaderComponent from '../components/Header'
import RunCard from '../components/RunCard'
import GroupCard from '../components/GroupCard'
import RunFilters from '../components/RunFilters'
import NavBar from '../components/NavBar'

export default class DiscoverScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      viewing: 'Runs',
      runButtonColor: colors.otherColor,
      groupButtonColor: colors.disabledColor
    }
  }

  updateSearch = search => {
    this.setState({ search });
  };

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
    const { search } = this.state;

    return (
      <View style={styles.container}>
        <HeaderComponent />

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
          <Button
            title='New Runs'
            onPress={this.onTogglePressRuns}
            buttonStyle={{ backgroundColor: this.state.runButtonColor, width: 178 }}
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
            buttonStyle={{ backgroundColor: this.state.groupButtonColor, width: 178 }}
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
          onChangeText={this.updateSearch}
          value={search}
          containerStyle={{marginLeft: 10, marginRight: 10}}
        />
        {this.state.viewing === 'Runs' ?
          <View>
            <RunFilters />
            <ScrollView>
              <RunCard />
            </ScrollView>
          </View>
          :
          <ScrollView>
            <GroupCard />
          </ScrollView>
        }
        {/* NavBar is not showing up for 'Runs' view */}
        <NavBar />
      </View>
    );
  }
}