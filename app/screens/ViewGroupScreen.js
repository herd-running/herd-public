import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, TextInput, Alert } from 'react-native'
import { Button, Icon, Overlay } from 'react-native-elements'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getOneGroup, joinGroup, leaveGroup, deleteGroup } from '../actions/groups'
import { getGroupLeader, getGroupMembers } from '../actions/users'
import { getGroupRuns } from '../actions/runs'
import { getGroupComments, postGroupComment } from '../actions/comments'

import HeaderComponent from '../components/Header'
import CommentCard from '../components/CommentCard'
import RunCard from '../components/RunCard'
import RunnersCard from '../components/RunnersCard'

import colors from '../utils/Colors'

class ViewGroupScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: null,
      isMember: null,
      isLeader: null,
      showRuns: false,
      showRunners: false,
      showComments: false,
      overlayIsVisible: false,
      overlayMessage: null,
      showAddComment: false,
      commentTitle: null,
      comment: null,
      avoidView: 0,
    }
  }

  componentDidMount = () => {
    const groupId = this.props.navigation.getParam('groupId', 0)
    this.props.getOneGroup(groupId)
    this.props.getGroupLeader(groupId)
    this.props.getGroupMembers(groupId)
    this.props.getGroupRuns(groupId)
    this.props.getGroupComments(groupId)
  }

  componentWillReceiveProps = (props) => {
    const userId = props.authentication.user

    this.setState({
      userId,
      isLeader: props.groupLeader.user_id === userId,
      isMember: props.groupMembers.find(member => member.user_id === userId)
    })
  }

  toggleRuns = () => {
    this.setState({
      showRuns: !this.state.showRuns
    })
  }

  toggleRunners = () => {
    this.setState({
      showRunners: !this.state.showRunners
    })
  }

  toggleComments = () => {
    this.setState({
      showComments: !this.state.showComments
    })
  }

  handleShowAddCommentForm = () => {
    this.setState({
      showAddComment: true,
      showRuns: false,
      showRunners: false,
      avoidView: -360
    })
  }

  handleJoinGroup = (groupId) => {
    this.props.joinGroup(groupId, this.state.userId)
    this.setState({
      overlayMessage: 'You Joined a Group!',
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

  handleLeaveGroup = (groupId) => {
    this.props.leaveGroup(groupId, this.state.userId)
    this.setState({
      overlayMessage: 'You Left this Group',
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

  handleAddGroupRun = () => {
    this.props.navigation.navigate('CreateRun')
  }

  handleDeleteGroup = (groupId) => {
    this.props.deleteGroup(groupId, this.state.userId)
    this.setState({
      overlayMessage: 'Group Deleted',
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

  handleAddComment = () => {
    if (!this.state.commentTitle || !this.state.comment) {
      Alert.alert('Please enter all fields', null, [{ text: 'OK' }], { cancelable: false })
      return
    }

    const groupId = this.props.navigation.getParam('groupId', 0)

    const newComment = {
      user_id: this.props.authentication.user,
      title: this.state.commentTitle,
      comment: this.state.comment
    }

    this.props.postGroupComment(groupId, newComment)

    this.setState({
      showAddComment: false,
      avoidView: 0
    })
  }

  render = () => {
    const groupId = this.props.navigation.getParam('groupId', 0)

    return (
      <View style={{ paddingBottom: 120 }}>
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
        <ScrollView style={{ marginTop: parseInt(this.state.avoidView), zIndex: -1}}>
          <View style={{ marginLeft: 25, marginRight: 25 }}>

            <Text style={{ fontSize: 25, marginTop: 10, fontWeight: 'bold' }}>{this.props.group.name}</Text>

            <Text style={{ fontSize: 20, marginTop: 10 }}>{this.props.group.description}</Text>

            <Text style={{ fontSize: 23, marginTop: 20 }}>Leader:</Text>

            <Text style={{ fontSize: 20, marginTop: 10 }}>{`${this.props.groupLeader.first_name} ${this.props.groupLeader.last_name}`}</Text>
            <Button
              onPress={this.toggleRuns}
              title='Runs'
              buttonStyle={{ marginTop: 20, backgroundColor: colors.otherColor }}
            />

            {this.state.showRuns ?
              <View>
                {this.props.groupRuns.map((run) => {
                  return <TouchableOpacity key={run.id} onPress={() => this.props.navigation.navigate('ViewRun', { runId: run.id })}>
                    <RunCard {...run} />
                  </TouchableOpacity>
                })}
              </View>
              :
              null
            }

            <Button
              onPress={this.toggleRunners}
              title='Members'
              buttonStyle={{ marginTop: 20, backgroundColor: colors.otherColor }}
            />

            {this.state.showRunners ?
              <RunnersCard runners={this.props.groupMembers} />
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
                    buttonStyle={{ marginTop: 20, backgroundColor: colors.otherColor, width: 200 }}
                    titleStyle={{color: colors.backgroundColor}}
                  />
                  {this.props.comments.map(comment => {
                    return <CommentCard key={comment.id} user={this.props.authentication.user} groupId={groupId} {...comment} />
                  })}
                </View>
              :
              null
            }
            <View style={{ flex: 1, marginTop: 15, alignItems: 'center' }}>
              {this.state.isLeader ?
                <View style={{ alignItems: 'center' }}>
                  <Button
                    title='Add a Run!'
                    onPress={() => this.props.navigation.navigate('CreateGroupRun', { groupId })}
                    buttonStyle={{ backgroundColor: colors.otherColor, width: 200 }}
                    titleStyle={{ color: colors.backgroundColor }}
                  />
                  <Button
                    title='Delete Group'
                    type='outline'
                    onPress={() => this.handleDeleteGroup(groupId)}
                    buttonStyle={{ borderColor: 'red', width: 200, marginTop: 70 }}
                    titleStyle={{ color: 'red' }}
                  />
                </View>
                :
                <View>
                  {
                    this.state.isMember ?
                      <Button
                        title='Leave Group'
                        type='outline'
                        onPress={() => this.handleLeaveGroup(groupId)}
                        buttonStyle={{ borderColor: 'red', width: 200, marginTop: 70 }}
                        titleStyle={{ color: 'red' }}
                      />
                      :
                      <Button
                        title='Join this Group!'
                        onPress={() => this.handleJoinGroup(groupId)}
                        buttonStyle={{ backgroundColor: colors.otherColor, width: 200 }}
                        titleStyle={{ color: colors.backgroundColor }}
                      />
                  }
                </View>
              }
            </View>
          </View>
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
    authentication: state.authentication,
    group: state.group,
    groupLeader: state.groupLeader,
    groupMembers: state.groupMembers,
    groupRuns: state.groupRuns,
    comments: state.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getOneGroup,
    getGroupLeader,
    getGroupMembers,
    getGroupRuns,
    joinGroup,
    leaveGroup,
    deleteGroup,
    getGroupComments,
    postGroupComment
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewGroupScreen)