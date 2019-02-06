import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'

import HeaderComponent from '../components/Header'
import NavBar from '../components/NavBar'
import CommentCard from '../components/CommentCard'
import RunCard from '../components/RunCard'
import RunnersCard from '../components/RunnersCard'

import colors from '../constants/Colors'

export default class ViewGroupScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showRuns: false,
      showRunners: false,
      showComments: false
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

  render() {
    const comments = [
      {
        id: 1,
        title: 'Great group!',
        rating: 5,
        body: 'I really enjoyed this group of people. We had a great time on Saturday and I felt very welcome! I will be back!'
      },
      {
        id: 2,
        title: 'Fun group',
        body: 'Had a great run, all skill levels are welcome.'
      }
    ]

    return (
      <View>
        <HeaderComponent />
        <ScrollView>
          <View style={{ marginLeft: 25, marginRight: 25 }}>

            <Text style={{ fontSize: 25, marginTop: 10, fontWeight: 'bold' }}>
              Seattle Running Club
        </Text>

            <Text style={{ fontSize: 20, marginTop: 10 }}>
              We are a Puget Sound-based running group that celebrates the beauty of our region and our personal potential with training, competition, and community. While the club offers a unique focus on trail running, members also rally on the road, track, and cross country course.
        </Text>

            <Text style={{ fontSize: 23, marginTop: 20 }}>
              Leaders:
        </Text>

            <Text style={{ fontSize: 20, marginTop: 10 }}>
              Jake Hommer, Sam Violette
        </Text>

            <Button
              onPress={this.toggleRuns}
              title='Runs'
              buttonStyle={{ marginTop: 20, backgroundColor: colors.otherColor }}
            />

            {this.state.showRuns ?
              <RunCard />
              :
              null
            }

            <Button
              onPress={this.toggleRunners}
              title='In this Group'
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
              comments.map(comment => {
                return <CommentCard key={comment.id} {...comment} />
              })
              :
              null
            }

          </View>
        </ScrollView>
        <NavBar />
      </View>
    )
  }
}