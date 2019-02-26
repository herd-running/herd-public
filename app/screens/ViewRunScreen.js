import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native'
import { Button, Icon, Overlay } from 'react-native-elements'
import { Dropdown } from 'react-native-material-dropdown'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import moment from 'moment'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getOneRun, joinRun, leaveRun, deleteRun } from '../actions/runs'
import { getRunMembers } from '../actions/users'
import { getRunComments, postRunComment } from '../actions/comments'

import colors from '../utils/Colors'

import HeaderComponent from '../components/Header'
import Rating from '../components/Rating'
import CommentCard from '../components/CommentCard'
import RunnersCard from '../components/RunnersCard'

class ViewRunScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: null,
      attending: false,
      owner: false,
      showMoreInfo: false,
      showRunners: false,
      showComments: false,
      showAddComment: false,
      overlayIsVisible: false,
      overlayMessage: null,
      commentTitle: null,
      comment: null,
      commentRating: null
    }
  }

  componentDidMount = () => {
    const runId = this.props.navigation.getParam('runId', 1)
    this.props.getOneRun(runId)
    this.props.getRunMembers(runId)
    this.props.getRunComments(runId)
  }

  componentWillReceiveProps = (props) => {
    const userId = props.authentication.user
    this.setState({
      userId,
      owner: props.run.creator_id === userId,
      attending: props.members.find(member => member.user_id === userId)
    })
  }

  isOwner = () => {
    return this.props.run.creator_id === this.props.authentication.user
  }

  isAttending = () => {
    return this.props.members.find(member => member.user_id === this.props.authentication.user)
  }

  leaveAlert = (runId) => {
    Alert.alert(
      'Confirm',
      'Leave Run',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => this.handleLeaveRun(runId) }
      ]
    )
  }

  handleLeaveRun = (runId) => {
    this.props.leaveRun(runId, this.props.authentication.user)
    this.setState({
      overlayMessage: 'You Left this Run',
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

  handleJoinRun = (runId) => {
    this.props.joinRun(runId, this.props.authentication.user)
    this.setState({
      overlayMessage: 'You Joined a Run!',
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

  deleteAlert = (runId) => {
    Alert.alert(
      'Confirm',
      'Delete Run',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => this.handleDeleteRun(runId) }
      ]
    )
  }

  handleDeleteRun = (runId) => {
    this.props.deleteRun(runId, this.props.authentication.user, this.props.run.group_id)

    this.setState({
      overlayMessage: 'Run Deleted',
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

  handleShowAddCommentForm = () => {
    this.setState({
      showAddComment: true
    })
  }

  handleAddComment = () => {
    if (!this.state.commentTitle || !this.state.comment || !this.state.commentRating) {
      Alert.alert('Please enter all fields', null, [{ text: 'OK' }], { cancelable: false })
      return
    }

    const runId = this.props.navigation.getParam('runId', 1)

    const newComment = {
      user_id: this.props.authentication.user,
      title: this.state.commentTitle,
      comment: this.state.comment,
      rating: this.state.commentRating
    }

    this.props.postRunComment(runId, newComment)

    this.setState({
      showAddComment: false,
    })
  }

  toggleRunners = () => {
    this.setState({
      showRunners: !this.state.showRunners
    })
  }

  toggleMoreInfo = () => {
    this.setState({
      showMoreInfo: !this.state.showMoreInfo
    })
  }

  toggleComments = () => {
    this.setState({
      showComments: !this.state.showComments
    })
  }

  render() {
    const runId = this.props.navigation.getParam('runId', 1)
    const formattedDate = moment(this.props.run.date).format("dddd MMM Do")

    return (
      <View style={{ paddingBottom: 150 }}>
        <HeaderComponent header='Herd' navigation={this.props.navigation} logout={false} />
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
        <KeyboardAwareScrollView>
          <View style={{ marginLeft: 25, marginRight: 25 }}>

            <Text style={{ fontSize: 25, marginTop: 10, fontWeight: 'bold' }}>
              {`${this.props.run.run_type}`}
              {this.props.run.name && ` with ${this.props.run.name}`}
            </Text>

            <View style={{ marginTop: 5, marginBottom: 5 }}>
              <Rating rating={this.props.run.rating} size={25} />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <Icon
                name='map-marker'
                type='font-awesome'
                size={32}
                iconStyle={{ marginRight: 10, marginTop: 10, color: colors.otherColor }}
              />
              <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>{this.props.run.location}</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ViewRunMap', { latitude: this.props.run.latitude, longitude: this.props.run.longitude, runId: this.props.run.id })}
              >
                <Text style={{ textDecorationLine: 'underline', paddingLeft: 6, paddingBottom: 3 }}>(Map)</Text>
              </TouchableOpacity>
            </View>

            {this.props.run.day ?
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Icon
                  name='clock'
                  type='material-community'
                  size={26}
                  iconStyle={{ marginRight: 7, marginLeft: -4, color: colors.otherColor }}
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{`${this.props.run.day}s @ ${this.props.run.time}`}</Text>
                <Icon
                  name='sync'
                  type='material-community'
                  size={25}
                  iconStyle={{ marginLeft: 5 }}
                />
              </View>
              :
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Icon
                  name='clock'
                  type='material-community'
                  size={26}
                  iconStyle={{ marginRight: 8, marginLeft: -4, color: colors.otherColor }}
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{`${formattedDate} @ ${this.props.run.time}`}</Text>
              </View>
            }

            <Button
              onPress={this.toggleMoreInfo}
              title='More Info'
              buttonStyle={{ marginTop: 20, backgroundColor: colors.otherColor }}
            />

            {this.state.showMoreInfo &&
              <View>
                {this.props.run.distance &&
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>Distance:</Text>
                    <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 5 }}>{this.props.run.distance}</Text>
                  </View>
                }

                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>Target Pace:</Text>
                  <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 5 }}>{this.props.run.pace}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>Terrain:</Text>
                  <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 5 }}>{this.props.run.terrain}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>Organizer:</Text>
                  <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 5 }}>{this.props.run.creator}</Text>
                </View>

                {this.props.run.description &&
                  <View>
                    <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>Description:</Text>
                    <Text style={{ fontSize: 20, marginTop: 5 }}>{this.props.run.description}</Text>
                  </View>
                }
              </View>
            }

            <Button
              onPress={this.toggleRunners}
              title='Runners'
              buttonStyle={{ marginTop: 20, backgroundColor: colors.otherColor }}
            />

            {this.state.showRunners ?
              <RunnersCard runners={this.props.members} />
              :
              null
            }

            <Button
              onPress={this.toggleComments}
              title='Comments'
              buttonStyle={{ marginTop: 20, backgroundColor: colors.otherColor }}
            />

            {this.state.showComments ?

              this.state.showAddComment ?
                <View>
                  <Text style={{ fontSize: 20, marginTop: 10, color: colors.formGray }}>Title</Text>
                  <TextInput
                    onChangeText={(commentTitle) => this.setState({ commentTitle })}
                    value={this.state.distance}
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, fontSize: 18, paddingLeft: 5, minWidth: '100%' }}
                    returnKeyType='done'
                  />

                  <Text style={{ fontSize: 20, marginTop: 10, color: colors.formGray }}>Comment</Text>
                  <TextInput
                    onChangeText={(comment) => this.setState({ comment })}
                    value={this.state.description}
                    style={{ height: 80, borderColor: 'gray', borderWidth: 1, fontSize: 18, paddingLeft: 5, marginBottom: 10, minWidth: '100%' }}
                    returnKeyType='done'
                    multiline={true}
                    numberOfLines={5}
                    blurOnSubmit={true}
                  />

                  <View style={{ width: 100 }}>
                    <Dropdown
                      label='Rating'
                      data={[{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }]}
                      fontSize={20}
                      labelFontSize={18}
                      itemCount={5}
                      onChangeText={(commentRating) => this.setState({ commentRating })}
                    />
                  </View>

                  <View style={{ alignItems: 'center' }}>
                    <Button
                      onPress={this.handleAddComment}
                      title='Submit Comment'
                      buttonStyle={{ marginTop: 20, backgroundColor: colors.otherColor, width: 200 }}
                    />
                    <Button
                      title='Cancel'
                      type='outline'
                      onPress={() => this.setState({ showAddComment: false, avoidView: 0 })}
                      buttonStyle={{ borderColor: 'white', width: 200, marginTop: 10 }}
                      titleStyle={{ fontSize: 16, color: colors.otherColor }}
                    />
                  </View>
                </View>
                :
                <View style={{ alignItems: 'center' }}>
                  <Button
                    onPress={this.handleShowAddCommentForm}
                    title='Add Comment'
                    buttonStyle={{ marginTop: 10, backgroundColor: colors.otherColor, width: 150 }}
                    titleStyle={{ color: colors.backgroundColor }}
                  />
                  {this.props.comments.map(comment => {
                    return <CommentCard key={comment.id} user={this.props.authentication.user} runId={runId} {...comment} />
                  })}
                </View>
              :
              null
            }

            <View style={{ flex: 1, marginTop: 15, alignItems: 'center' }}>
              {this.isOwner() ?
                <Button
                  title='Delete Run'
                  type='outline'
                  onPress={() => this.deleteAlert(runId)}
                  buttonStyle={{ borderColor: 'red', width: 200, marginTop: 100 }}
                  titleStyle={{ color: 'red' }}
                />
                :
                this.isAttending() ?
                  <Button
                    title='Leave Run'
                    type='outline'
                    onPress={() => this.leaveAlert(runId)}
                    buttonStyle={{ borderColor: 'red', width: 200, marginTop: 100 }}
                    titleStyle={{ color: 'red' }}
                  />
                  :
                  <Button
                    title='Join this Run!'
                    onPress={() => this.handleJoinRun(runId)}
                    buttonStyle={{ backgroundColor: colors.otherColor, width: 200 }}
                    titleStyle={{ color: colors.backgroundColor }}
                  />
              }
            </View>
          </View>
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
      </View >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
    run: state.run,
    members: state.members,
    comments: state.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getOneRun,
    getRunMembers,
    joinRun,
    leaveRun,
    deleteRun,
    getRunComments,
    postRunComment
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewRunScreen)