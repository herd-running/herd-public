import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { Button, Icon, Overlay } from 'react-native-elements'
import { Dropdown } from 'react-native-material-dropdown'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DatePicker from 'react-native-datepicker'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createNewRun } from '../actions/runs'
import { setFormValue, clearForm } from '../actions/createRunForm'

import HeaderComponent from '../components/Header'

import { runType, day, pace, terrain } from '../utils/CreateRunOptions'
import colors from '../utils/Colors'

class CreateRunScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      overlayIsVisible: false,
      overlayMessage: ''
    }
  }

  handleCreateRun = () => {
    if (this.props.formValues.run_type === ' ' ||
      !this.props.formValues.time ||
      this.props.formValues.pace === ' ' ||
      this.props.formValues.terrain === ' ' ||
      !this.props.formValues.latitude ||
      !this.props.formValues.longitude ||
      !this.props.formValues.location) {

        Alert.alert('Please enter all required fields', null, [{ text: 'OK' }], { cancelable: false })
        return;
    }

    const groupId = this.props.navigation.getParam('groupId', null)
    const userId = this.props.authentication.user

    const newRun = {
      ...this.props.formValues,
      creator_id: userId,
      group_id: groupId
    }

    this.props.createNewRun(userId, newRun, groupId)

    this.setState({
      overlayMessage: 'Run Created!',
      overlayIsVisible: true
    })

    setTimeout(() => {
      this.setState({
        overlayMessage: null,
        overlayIsVisible: false
      })

      this.props.clearForm()

      if (groupId) this.props.navigation.goBack()
      else { this.props.navigation.navigate('DashboardRuns') }
    }, 1000)
  }

  onEnterPress = ({ nativeEvent }) => {
    if (nativeEvent.key === 'Enter') {
      dismissKeyboard()
    }
  }

  render() {
    const groupId = this.props.navigation.getParam('groupId', null)

    return (
      <View style={{ paddingBottom: 120 }}>
        <HeaderComponent header='Create' navigation={this.props.navigation} logout={true}/>
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
        <KeyboardAwareScrollView style={{ marginLeft: 30, marginRight: 30}}>
          <Text style={{ fontSize: 25, color: colors.backgroundColor, marginTop: 10, marginBottom: 10, fontWeight: 'bold' }}>
            {groupId ? 'New Group Run' : 'New One-Time Run'}
          </Text>

          <Dropdown
            label='Run Type'
            data={runType}
            value={this.props.formValues.run_type}
            fontSize={20}
            labelFontSize={18}
            itemCount={7}
            animationDuration={0}
            onChangeText={(run_type) => this.props.setFormValue('run_type', run_type)}
          />
          {groupId ?
            <Dropdown
              label='Day of the Week'
              data={day}
              value={this.props.formValues.day}
              fontSize={20}
              labelFontSize={18}
              itemCount={7}
              onChangeText={(day) => this.props.setFormValue('day', day)}
            />
            :
            <View>
              <Text style={{ fontSize: 20, marginTop: 10, color: colors.formGray }}>Date</Text>
              <DatePicker
                style={{ width: 220 }}
                date={this.props.formValues.date}
                mode='date'
                placeholder='Select Date'
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
                onDateChange={(date) => this.props.setFormValue('date', date)}
              />
            </View>
          }
          <View>
            <Text style={{ fontSize: 20, marginTop: 10, color: colors.formGray }}>Time</Text>
            <DatePicker
              style={{ width: 220 }}
              date={this.props.formValues.time}
              mode='time'
              placeholder='Select Time'
              format='h:mma'
              confirmBtnText='Select'
              cancelBtnText='Cancel'
              showIcon={false}
              customStyles={{
                dateText: {
                  fontSize: 20
                }
              }}
              onDateChange={(time) => this.props.setFormValue('time', time)}
            />
          </View>

          <Dropdown
            label='Pace'
            data={pace}
            value={this.props.formValues.pace}
            fontSize={20}
            labelFontSize={18}
            itemCount={7}
            onChangeText={(pace) => this.props.setFormValue('pace', pace)}
          />

          <Dropdown
            label='Terrain'
            data={terrain}
            value={this.props.formValues.terrain}
            fontSize={20}
            labelFontSize={18}
            itemCount={7}
            onChangeText={(terrain) => this.props.setFormValue('terrain', terrain)}
          />

          <Button
            title='Set Starting Point'
            onPress={() => this.props.navigation.navigate('AddressSearch')}
            buttonStyle={{ backgroundColor: colors.backgroundColor, marginTop: 10, marginBottom: 10 }}
            titleStyle={{ color: colors.otherColor }}
          />

          {this.props.formValues.latitude ?
            <View>
              <Text style={{ fontSize: 20, marginTop: 10, color: colors.formGray }}>Location</Text>
              <TextInput
                onChangeText={(location) => this.props.setFormValue('location', location)}
                value={this.props.formValues.location}
                placeholder='Location name (i.e. Green Lake)'
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, fontSize: 18, paddingLeft: 5 }}
                returnKeyType='done'
              />
            </View>
            :
            null
          }
          <Text style={{ fontSize: 20, marginTop: 10, color: colors.formGray }}>Distance (optional)</Text>
          <TextInput
            onChangeText={(distance) => this.props.setFormValue('distance', distance)}
            value={this.props.formValues.distance}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, fontSize: 18, paddingLeft: 5 }}
            returnKeyType='done'
            blurOnSubmit={true}
          />

          <Text style={{ fontSize: 20, marginTop: 10, color: colors.formGray }}>Description (optional)</Text>
          <TextInput
            onChangeText={(description) => this.props.setFormValue('description', description)}
            value={this.props.formValues.description}
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

        </KeyboardAwareScrollView>

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
    authentication: state.authentication,
    formValues: state.formValues
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setFormValue,
    clearForm,
    createNewRun
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRunScreen)