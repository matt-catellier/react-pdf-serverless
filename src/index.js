import React from 'react'
import ReactPDF from '@react-pdf/renderer'

import streamToBuffer from './streamToBuffer';

import MyDocument from './MyDocument'


const handler = async (event, ctx) => {
  const stream = await ReactPDF.renderToStream(<MyDocument />)
  
  const buffer = await streamToBuffer(stream)
  const imageBase64 = buffer.toString('base64')
  return {
      statusCode: 200,
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
          imageBase64
      }),
  }
}

export { handler }