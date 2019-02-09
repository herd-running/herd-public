import React from 'react'
import { Text } from 'react-native'
import { Card } from 'react-native-elements'
import Rating from './Rating'

export default function CommentCard({ title, rating, body }) {

  return (
    <Card title={title}>
      {rating ?
        <Rating rating={rating} size={15} />
        :
        null
      }
      <Text style={{ marginTop: 5 }}>{body}</Text>
    </Card>
  )
}