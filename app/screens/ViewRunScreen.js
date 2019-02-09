import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { Button, Icon } from 'react-native-elements'

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
      showMoreInfo: false,
      showRunners: false,
      showComments: false
    }
  }

  handleLeaveRun = () => {

  }

  handleJoinRun = () => {

  }

  handleAddComment = () => {

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
        <HeaderComponent header='Herd'/>
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

            <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>
              Saturdays @ 7:00am
            </Text>

            <Button
              onPress={this.toggleMoreInfo}
              title='More Info'
              buttonStyle={{ marginTop: 20, backgroundColor: colors.otherColor }}
            />

            {this.state.showMoreInfo ?
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>
                    Distance:
                  </Text>
                  <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 5}}>
                    5 miles
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>
                    Target Pace:
                  </Text>
                  <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 5}}>
                    8 minutes/mile
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>
                    Terrain:
                  </Text>
                  <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 5}}>
                    Trail
                  </Text>
                </View>

                  <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>
                    Description:
                  </Text>
                  <Text style={{ fontSize: 20, marginTop: 5}}>
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
              <View style={{alignItems: 'center'}}>
                {comments.map(comment => {
                  return <CommentCard key={comment.id} {...comment} />
                })}

                <Button
                  onPress={this.handleAddComment}
                  title='Add Comment'
                  buttonStyle={{ marginTop: 20, backgroundColor: colors.otherColor, width: 200 }}
                />
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
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}