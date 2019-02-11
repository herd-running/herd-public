import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, TextInput } from 'react-native'
import { Button, Icon, Overlay } from 'react-native-elements'
import { Dropdown } from 'react-native-material-dropdown'


import colors from '../constants/Colors'

import HeaderComponent from '../components/Header'
import Rating from '../components/Rating'
import CommentCard from '../components/CommentCard'
import RunnersCard from '../components/RunnersCard'

export default class ViewRunScreen extends Component {
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

  handleLeaveRun = () => {
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

  handleJoinRun = () => {
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
              Long run with Seattle Running Co.
            </Text>

            <Rating rating={5} size={25} />

            <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>
              Discovery Park
            </Text>

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                Saturdays @ 7:00am
              </Text>
              <Icon 
                name='sync'
                type='material-community'
                size={25}
                iconStyle={{marginLeft: 5}}
              />
            </View>

            <Button
              onPress={this.toggleMoreInfo}
              title='More Info'
              buttonStyle={{ marginTop: 20, backgroundColor: colors.otherColor }}
            />

            {this.state.showMoreInfo ?
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>
                    Distance:
                  </Text>
                  <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 5 }}>
                    5 miles
                  </Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>
                    Target Pace:
                  </Text>
                  <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 5 }}>
                    8 minutes/mile
                  </Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>
                    Terrain:
                  </Text>
                  <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 5 }}>
                    Trail
                  </Text>
                </View>

                <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>
                  Description:
                  </Text>
                <Text style={{ fontSize: 20, marginTop: 5 }}>
                  Join us for a fun run around beautiful Discovery Park.
                  </Text>

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
              {this.state.attending ?
                <Button
                  title='Leave Run'
                  onPress={this.handleLeaveRun}
                  buttonStyle={{ backgroundColor: colors.otherColor, width: 200 }}
                  titleStyle={{ color: colors.backgroundColor }}
                />
                :
                <Button
                  title='Join this Run!'
                  onPress={this.handleJoinRun}
                  buttonStyle={{ backgroundColor: colors.otherColor, width: 200 }}
                  titleStyle={{ color: colors.backgroundColor }}
                />
              }
              {this.state.owner ?
                <Button
                  title='Delete Run'
                  type='outline'
                  onPress={this.handleDeleteGroup}
                  buttonStyle={{ borderColor: 'red', minWidth: '100%', marginTop: 100 }}
                  titleStyle={{ color: 'red' }}
                />
                :
                null
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