import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, TextInput } from 'react-native'
import { Button, Icon, Overlay } from 'react-native-elements'

import { connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { getOneGroup, joinGroup, leaveGroup, deleteGroup } from '../actions/groups'
import { getGroupLeader, getGroupMembers } from '../actions/users'
import { getGroupRuns } from '../actions/runs'

import HeaderComponent from '../components/Header'
import CommentCard from '../components/CommentCard'
import RunCard from '../components/RunCard'
import RunnersCard from '../components/RunnersCard'

import colors from '../constants/Colors'

class ViewGroupScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
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
      commentRating: null
    }
  }

  componentDidMount = () => {
    const groupId = this.props.navigation.getParam('groupId', 0)
    this.props.getOneGroup(groupId)
    this.props.getGroupLeader(groupId)
    this.props.getGroupMembers(groupId)
    this.props.getGroupRuns(groupId)
  }
  ///// replace 2 with user ID
  componentWillReceiveProps = (props) => {
    this.setState({
      isLeader: props.groupLeader.user_id === 2,
      isMember: props.groupMembers.find(member => member.user_id === 2)
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
      showAddComment: true
    })
  }

  handleAddComment = () => {
    this.setState({
      showAddComment: false
    })
  }
///////replace 2 with userId
  handleJoinGroup = (groupId) => {
    this.props.joinGroup(groupId, 2)
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
///////replace 2 with userId
  handleLeaveGroup = (groupId) => {
    this.props.leaveGroup(groupId, 2)
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
///////replace 2 with userId
  handleDeleteGroup = (groupId) => {
    this.props.deleteGroup(groupId, 2)
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

  render = () => {
    const groupId = this.props.navigation.getParam('groupId', 0) 
    const comments = [
      {
        id: 1,
        title: 'Great group!',
        body: 'I really enjoyed this group of people. We had a great time on Saturday and I felt very welcome! I will be back!'
      },
      {
        id: 2,
        title: 'Fun group',
        body: 'Had a great run, all skill levels are welcome.'
      }
    ]

    return (
      <View style={{ paddingBottom: 120 }}>
        <HeaderComponent header='Herd' />
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
        <ScrollView>
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
               <RunnersCard runners={this.props.groupMembers}/>
              :
              null
            }

            <Button
              onPress={this.toggleComments}
              title='Comments'
              buttonStyle={{ marginTop: 20, backgroundColor: colors.otherColor }}
            />

            {this.state.showComments ?
              <View style={{ alignItems: 'center' }}>
                {comments.map(comment => {
                  return <CommentCard key={comment.id} {...comment} />
                })}
                {this.state.showAddComment ?
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
                    </View>
                  </View>
                  :
                  <Button
                    onPress={this.handleShowAddCommentForm}
                    title='Add Comment'
                    buttonStyle={{ marginTop: 20, backgroundColor: colors.otherColor, width: 200 }}
                  />
                }
              </View>
              :
              null
            }
            <View style={{ flex: 1, marginTop: 15, alignItems: 'center' }}>
              {this.state.isLeader ?
                <View style={{alignItems: 'center'}}>
                  <Button
                    title='Add a Run!'
                    onPress={() => this.props.navigation.navigate('CreateRun', {groupId})}
                    buttonStyle={{ backgroundColor: colors.otherColor, width: 200 }}
                    titleStyle={{ color: colors.backgroundColor }}
                  />
                  <Button
                    title='Delete Group'
                    type='outline'
                    onPress={() => this.handleDeleteGroup(groupId)}
                    buttonStyle={{ borderColor: 'red', minWidth: '100%', marginTop: 70 }}
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
    group: state.group,
    groupLeader: state.groupLeader,
    groupMembers: state.groupMembers,
    groupRuns: state.groupRuns
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
    deleteGroup
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewGroupScreen)