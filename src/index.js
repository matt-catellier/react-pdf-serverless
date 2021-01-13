import React from 'react'
import ReactPDF from '@react-pdf/renderer'

import streamToBuffer from './streamToBuffer';

import MyDocument from './MyDocument'

const ALLOWED_ORIGINS = [
	'https://myfirstorigin.com',
	'https://mysecondorigin.com'
];

const handler = async (event, ctx) => {
  const stream = await ReactPDF.renderToStream(<MyDocument />)
  
  const buffer = await streamToBuffer(stream)
  const imageBase64 = buffer.toString('base64')


  const origin = event.headers.origin;
  let headers;

  if (ALLOWED_ORIGINS.includes(origin)) {
    headers =  {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': true,
    }
  }  

  headers['Content-Type'] = 'application/json'
  return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
          imageBase64
      }),
  }
}

export { handler }