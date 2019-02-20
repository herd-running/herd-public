import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, TextInput } from 'react-native'
import { Button, Icon, Overlay } from 'react-native-elements'
import { Dropdown } from 'react-native-material-dropdown'

import moment from 'moment'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getOneRun, joinRun, leaveRun, deleteRun } from '../actions/runs'
import { getRunMembers } from '../actions/users'

import colors from '../constants/Colors'

import HeaderComponent from '../components/Header'
import Rating from '../components/Rating'
import CommentCard from '../components/CommentCard'
import RunnersCard from '../components/RunnersCard'

class ViewRunScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
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
  }
  ///////replace 2 with userId
  componentWillReceiveProps = (props) => {
    this.setState({
      owner: props.run.creator_id === 2,
      attending: props.runMembers.find(member => member.user_id === 2)
    })
  }
//////replace 2 with user ID
  handleLeaveRun = (runId) => {
    this.props.leaveRun(runId, 2)
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
///// replace 2 with user ID
  handleJoinRun = (runId) => {
    this.props.joinRun(runId, 2)
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
/////// replace 2 with userID
  handleDeleteRun = (runId) => {
    this.props.deleteRun(runId, 2, this.props.run.group_id)

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
    this.setState({
      showAddComment: false
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

    const comments = [
      {
        id: 1,
        title: 'Great run!',
        rating: 5,
        body: 'I really enjoyed this group of people. We had a great time on Saturday and I felt very welcome! I will be back!'
      },
      {
        id: 2,
        title: 'Fun run, a little early for me',
        rating: 3,
        body: 'This was a great run, but the time is just too early for me to make it.'
      }
    ]
    return (
      <View style={{ paddingBottom: 150 }}>
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

            <Text style={{ fontSize: 25, marginTop: 10, fontWeight: 'bold' }}>
              {`${this.props.run.run_type}`}
              {this.props.run.name ?
                ` with ${this.props.run.name}`
                :
                null}
            </Text>

            <View style={{ marginTop: 5 }}>
              <Rating rating={5} size={25} />
            </View>

            <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>{this.props.run.location}</Text>

            {this.props.run.day ?
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}> {`${this.props.run.day}s @ ${this.props.run.time}`}</Text>
                <Icon
                  name='sync'
                  type='material-community'
                  size={25}
                  iconStyle={{ marginLeft: 5 }}
                />
              </View>
              :
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{`${formattedDate} @ ${this.props.run.time}`}</Text>
              </View>
            }

            <Button
              onPress={this.toggleMoreInfo}
              title='More Info'
              buttonStyle={{ marginTop: 20, backgroundColor: colors.otherColor }}
            />

            {this.state.showMoreInfo ?
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>Distance:</Text>
                  <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 5 }}>{this.props.run.distance || 'Not specified'}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>Target Pace:</Text>
                  <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 5 }}>{this.props.run.pace}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>Terrain:</Text>
                  <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 5 }}>{this.props.run.terrain}</Text>
                </View>

                <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>Description:</Text>
                <Text style={{ fontSize: 20, marginTop: 5 }}>{this.props.run.description}</Text>
              </View>
              :
              null
            }

            <Button
              onPress={this.toggleRunners}
              title='Runners'
              buttonStyle={{ marginTop: 20, backgroundColor: colors.otherColor }}
            />

            {this.state.showRunners ?
              <RunnersCard runners={this.props.runMembers} />
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
              {this.state.owner ?
                <Button
                  title='Delete Run'
                  type='outline'
                  onPress={() => this.handleDeleteRun(runId)}
                  buttonStyle={{ borderColor: 'red', width: 200, marginTop: 100 }}
                  titleStyle={{ color: 'red' }}
                />
                :
                this.state.attending ?
                  <Button
                    title='Leave Run'
                    type='outline'
                    onPress={() => this.handleLeaveRun(runId)}
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
    run: state.run,
    runMembers: state.runMembers
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getOneRun,
    getRunMembers,
    joinRun, 
    leaveRun,
    deleteRun
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewRunScreen)