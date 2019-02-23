import React from 'react'
import { View, Text } from 'react-native'
import { Card, Icon } from 'react-native-elements'

import moment from 'moment'

import Rating from './Rating'

export default function RunCard({date, run_type, location, day, time, rating}) {
  const formattedDate = moment(date).format('dddd MMM Do')
  return (
    <Card title={`${run_type} at ${location}`}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {day ?
          <View style={{ flexDirection: 'row' }}>
            <Text> {`${day}s @ ${time}`}</Text>
            <Icon
              name='sync'
              type='material-community'
              size={15}
              iconStyle={{ marginLeft: 5 }}
            />
          </View>
          :
          <View style={{ flexDirection: 'row' }}>
            <Text>{`${formattedDate} @ ${time}`}</Text>
          </View>
        }
        { rating ?
        <Rating rating={rating} size={20} />
        :
        <Text style={{fontStyle: 'italic'}}>No ratings</Text>
        }
      </View>
    </Card>
  )
}
