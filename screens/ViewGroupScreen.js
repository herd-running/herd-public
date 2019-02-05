import React from 'react';
import { View, ScrollView, Text } from 'react-native'

import HeaderComponent from '../components/Header'
import NavBar from '../components/NavBar'
import CommentCard from '../components/CommentCard'
import RunCard from '../components/RunCard'
import Rating from '../components/Rating'

export default function ViewGroupScreen() {
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
      rating: 3,
      body: 'Had a great run, all skill levels are welcome.'
    }
  ]

  return (
    <View>
      <HeaderComponent />
      <ScrollView>
        <View style={{ marginLeft: 25, marginRight: 25 }}>

          <Text style={{ fontSize: 25, marginTop: 10 }}>
            Seattle Running Club
        </Text>

        <Rating rating={4} size={25} />

          <Text style={{ fontSize: 20, marginTop: 10 }}>
          We are a Puget Sound-based running group that celebrates the beauty of our region and our personal potential with training, competition, and community. While the club offers a unique focus on trail running, members also rally on the road, track, and cross country course.
        </Text>

        <Text style={{ fontSize: 23, marginTop: 10 }}>
            Leaders:
        </Text>

        <Text style={{ fontSize: 20, marginTop: 10 }}>
          Jake Hommer, Sam Violette
        </Text>

          <Text style={{ fontSize: 23, marginTop: 10 }}>
            Runs:
        </Text>

          <RunCard />

          <Text style={{ fontSize: 23, marginTop: 20 }}>
            Comments:
         </Text>
          {comments.map(comment => {
            return <CommentCard key={comment.id} {...comment} />
          })
          }
          <CommentCard />
        </View>
      </ScrollView>
      <View style={{ position: 'absolute', bottom: 0 }} >
        <NavBar />
      </View>
    </View>
  )
}