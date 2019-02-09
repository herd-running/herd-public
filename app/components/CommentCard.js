import React from 'react'
import { Text } from 'react-native'
import { Card } from 'react-native-elements'
import Rating from './Rating'

export default function CommentCard({ title, rating, body }) {

  return (
    <Card title={title} containerStyle={{minWidth: '100%'}}>
      <Rating rating={rating} size={15} />
      <Text style={{marginTop: 5}}>{body}</Text>
    </Card>
  )
}