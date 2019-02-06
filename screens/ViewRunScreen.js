import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native'
import { Button } from 'react-native-elements'

import colors from '../constants/Colors'

import HeaderComponent from '../components/Header'
import Rating from '../components/Rating'
import CommentCard from '../components/CommentCard'
import RunnersCard from '../components/RunnersCard'

export default class ViewRunScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      attending: false
    }
  }

  handleLeaveRun = () => {

  }

  handleJoinRun = () => {

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
      <View>
        <HeaderComponent />
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

            <Text style={{ fontSize: 20, marginTop: 10 }}>
              5 miles
        </Text>

            <Text style={{ fontSize: 20, marginTop: 10 }}>
              Target pace: 8 minutes/mile
        </Text>

            <Text style={{ fontSize: 23, marginTop: 30 }}>
              Runners:
        </Text>

            <RunnersCard />

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
            <Text style={{ fontSize: 23, marginTop: 20 }}>
              Comments:
         </Text>
            {comments.map(comment => {
              return <CommentCard key={comment.id} {...comment} />
            })

            }
          </View>
        </ScrollView>
      </View>
    )
  }
}