import React, { Component } from 'react'
import { View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native'
import { Button, Icon, Overlay } from 'react-native-elements'
import { Dropdown } from 'react-native-material-dropdown'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createNewRun } from '../actions/runs'

import HeaderComponent from '../components/Header'

import { runType, day, hour, minutes, pace, terrain } from '../constants/CreateRunOptions'
import colors from '../constants/Colors'

class CreateRunScreen extends Component {
  constructor(props) {
    super(props)

    const date = new Date
    const today = moment(date).format('MM-DD-YYYY')

    this.state = {
      day: '',
      date: today,
      hour: '',
      minutes: '',
      am_pm: '',
      location: '',
      runType: '',
      terrain: '',
      pace: '',
      distance: '',
      description: '',
      overlayIsVisible: false,
      overlayMessage: ''
    }
  }

  componentWillReceiveProps = (props) => {
    this.setState({
      location: props.newRunCoords.location
    })
  }
////////replace 2 with user ID
  handleCreateRun = () => {
    const groupId = this.props.navigation.getParam('groupId', null)
    const newRun = {
      group_id: groupId,
      creator_id: 2,
      day: this.state.day,
      date: this.state.date,
      time: `${this.state.hour}:${this.state.minutes}${this.state.am_pm}`,
      // location: this.state.location,
      // latitude: this.props.newRunCoords.latitude,
      // longitude: this.props.newRunCoords.longitude,
      location: "Test",
      latitude: 47,
      longitude: -122,
      run_type: this.state.runType,
      terrain: this.state.terrain,
      pace: this.state.pace,
      distance: this.state.distance,
      description: this.state.description
    }
    this.props.createNewRun(2, newRun)

    this.setState({
      overlayMessage: 'Run Created!',
      overlayIsVisible: true
    })

    setTimeout(() => {
      this.setState({
        overlayMessage: null,
        overlayIsVisible: false
      })
      this.props.navigation.goBack()
    }, 1000)
  }

  onEnterPress = ({ nativeEvent }) => {
    if (nativeEvent.key === 'Enter') {
      dismissKeyboard()
    }
  }

  render() {
    const latitude = this.props.navigation.getParam('latitude', null)
    const longitude = this.props.navigation.getParam('longitude', null)
    let location = this.props.navigation.getParam('location', null)

    const groupId = this.props.navigation.getParam('groupId', null)
    return (
      <View style={{ paddingBottom: 120 }}>
        <HeaderComponent header='Create' />
        {groupId ?
          <TouchableOpacity
            style={{ backgroundColor: colors.backgroundColor, alignItems: 'flex-start', paddingLeft: 10, paddingBottom: 5 }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon
              name='arrow-left'
              type='font-awesome'
              color={colors.otherColor}
              size={20}
            />
          </TouchableOpacity>
          :
          null
        }
        <ScrollView style={{ marginLeft: 30, marginRight: 30 }}>
          <Text style={{ fontSize: 25, color: colors.backgroundColor, marginTop: 10, marginBottom: 10, fontWeight: 'bold' }}>
            {groupId ? 'New Group Run' : 'New Quick Run'}
          </Text>

          {/* How do I reduce the animation on the dropdown? */}
          <Dropdown
            label='Run Type'
            data={runType}
            fontSize={20}
            labelFontSize={18}
            itemCount={7}
            animationDuration={0}
            onChangeText={(runType) => this.setState({ runType })}
          />
          {groupId ?
            <Dropdown
              label='Day of the Week'
              data={day}
              fontSize={20}
              labelFontSize={18}
              itemCount={7}
              onChangeText={(day) => this.setState({ day })}
            />
            :
            <View>
              <Text style={{ fontSize: 20, marginTop: 10, color: colors.formGray }}>Date</Text>
              <DatePicker
                style={{ width: 180 }}
                date={this.state.date}
                mode='date'
                placeholder='select date'
                format='MM-DD-YYYY'
                minDate='2016-02-11'
                maxDate='2021-12-31'
                confirmBtnText='Select'
                cancelBtnText='Cancel'
                showIcon={false}
                customStyles={{
                  dateText: {
                    fontSize: 20
                  }
                }}
                onDateChange={(date) => { this.setState({ date: date }) }}
              />
            </View>
          }
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ width: 60 }}>
              <Dropdown
                label='Hour'
                data={hour}
                fontSize={20}
                labelFontSize={18}
                itemCount={7}
                onChangeText={(hour) => this.setState({ hour })}
              />
            </View>
            <Text style={{ marginTop: 40, marginRight: 5 }}>:</Text>
            <View style={{ width: 60 }}>
              <Dropdown
                label='Min'
                data={minutes}
                fontSize={20}
                labelFontSize={18}
                itemCount={4}
                onChangeText={(minutes) => this.setState({ minutes })}
              />
            </View>
            <View style={{ width: 100 }}>
              <Dropdown
                label='am/pm'
                data={[{ value: 'am' }, { value: 'pm' }]}
                fontSize={20}
                labelFontSize={18}
                itemCount={2}
                onChangeText={(am_pm) => this.setState({ am_pm })}
              />
            </View>
          </View>

          <Dropdown
            label='Pace'
            data={pace}
            fontSize={20}
            labelFontSize={18}
            itemCount={7}
            onChangeText={(pace) => this.setState({ pace })}
          />

          <Dropdown
            label='Terrain'
            data={terrain}
            fontSize={20}
            labelFontSize={18}
            itemCount={7}
            onChangeText={(terrain) => this.setState({ terrain })}
          />

          <Button
            title='Set Starting Point'
            onPress={() => this.props.navigation.navigate('AddressSearch')}
            buttonStyle={{ backgroundColor: colors.backgroundColor, marginTop: 10, marginBottom: 10 }}
            titleStyle={{ color: colors.otherColor }}
          />

          {/* How can I get the keyboard to not cover the input? */}
          {this.state.location ?
            <View>
              <Text style={{ fontSize: 20, marginTop: 10, color: colors.formGray }}>Location</Text>
              <TextInput
                onChangeText={(location) => this.setState({ location })}
                value={this.state.location}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, fontSize: 18, paddingLeft: 5 }}
                returnKeyType='done'
              />
            </View>
            :
            null
          }
          <Text style={{ fontSize: 20, marginTop: 10, color: colors.formGray }}>Distance (optional)</Text>
          <TextInput
            onChangeText={(distance) => this.setState({ distance })}
            value={this.state.distance}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, fontSize: 18, paddingLeft: 5 }}
            returnKeyType='done'
          />

          <Text style={{ fontSize: 20, marginTop: 10, color: colors.formGray }}>Description (optional)</Text>
          <TextInput
            onChangeText={(description) => this.setState({ description })}
            value={this.state.description}
            style={{ height: 80, borderColor: 'gray', borderWidth: 1, fontSize: 18, paddingLeft: 5, marginBottom: 10 }}
            returnKeyType='done'
            multiline={true}
            numberOfLines={10}
            blurOnSubmit={true}
            onKeyPress={this.onEnterPress}
          />

          <Button
            title='Create Run!'
            onPress={this.handleCreateRun}
            buttonStyle={{ backgroundColor: colors.backgroundColor, marginBottom: 10 }}
            titleStyle={{ color: colors.otherColor }}
          />

        </ScrollView>

        <Overlay
          isVisible={this.state.overlayIsVisible}
          windowBackgroundColor={colors.backgroundColor}
          overlayBackgroundColor={colors.otherColor}
          width="auto"
          height="auto"
        >
          <View style={{ minWidth: '80%', minHeight: '25%', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: colors.backgroundColor, fontSize: 24 }}>{this.state.overlayMessage}</Text>
          </View>
        </Overlay>

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    newRunCoords: state.newRunCoords
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createNewRun
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRunScreen)