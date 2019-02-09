import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, TextInput } from 'react-native'
import { Button, Icon, Overlay } from 'react-native-elements'

import HeaderComponent from '../components/Header'
import CommentCard from '../components/CommentCard'
import RunCard from '../components/RunCard'
import RunnersCard from '../components/RunnersCard'

import colors from '../constants/Colors'

export default class ViewGroupScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      member: false,
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

  handleJoinGroup = () => {
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

  handleLeaveGroup = () => {
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

  render() {
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

    const runs = [
      {
        runType: 'Long Run',
        location: 'Discovery Park',
        group: 'Seattle Running Club',
        day: 'Saturday',
        time: '7:00am',
        rating: 5
      },
      {
        runType: 'Tempo Run',
        location: 'Green Lake',
        group: 'Green Lake Running Group',
        day: 'Tuesday',
        time: '6:00pm',
        rating: 3
      },
      {
        runType: 'Easy Run',
        location: 'Alki',
        group: 'West Seattle Runners',
        day: 'Monday',
        time: '6:00am',
        rating: 4
      },
      {
        runType: 'Long Run',
        location: 'Discovery Park',
        group: 'Seattle Running Club',
        day: 'Saturday',
        time: '7:00am',
        rating: 5
      },
      {
        runType: 'Tempo Run',
        location: 'Green Lake',
        group: 'Green Lake Running Group',
        day: 'Tuesday',
        time: '6:00pm',
        rating: 3
      },
      {
        runType: 'Easy Run',
        location: 'Alki',
        group: 'West Seattle Runners',
        day: 'Monday',
        time: '6:00am',
        rating: 4
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

            <Text style={{ fontSize: 25, marginTop: 10, fontWeight: 'bold' }}>
              Seattle Running Club
        </Text>

            <Text style={{ fontSize: 20, marginTop: 10 }}>
              We are a Puget Sound-based running group that celebrates the beauty of our region and our personal potential with training, competition, and community. While the club offers a unique focus on trail running, members also rally on the road, track, and cross country course.
        </Text>

            <Text style={{ fontSize: 23, marginTop: 20 }}>
              Leader:
        </Text>

            <Text style={{ fontSize: 20, marginTop: 10 }}>
              Jake Hommer
        </Text>
            <Button
              onPress={this.toggleRuns}
              title='Runs'
              buttonStyle={{ marginTop: 20, backgroundColor: colors.otherColor }}
            />

            {this.state.showRuns ?
              <View>
                {runs.map((run, i) => {
                  return <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('ViewRun')}>
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
              <RunnersCard />
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
              {this.state.member ?
                <Button
                  title='Leave Group'
                  onPress={this.handleLeaveGroup}
                  buttonStyle={{ backgroundColor: colors.otherColor, width: 200 }}
                  titleStyle={{ color: colors.backgroundColor }}
                />
                :
                <Button
                  title='Join this Group!'
                  onPress={this.handleJoinGroup}
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