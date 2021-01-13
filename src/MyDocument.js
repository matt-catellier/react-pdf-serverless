import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({ family: 'Anton',  src: './src/Anton-Regular.ttf' })

// Create styles
const styles = StyleSheet.create({
  document: {
    backgroundColor: 'white',
  },
  page: {
    flexDirection: 'column',
    fontFamily: 'Anton',
    padding: '20pt',
  },
  section: {
    margin: 10,
    flexGrow: 1
  },
  colorSection: {
    margin: 10,
    backgroundColor: 'tomato',
    color: 'white',
  },
  item: {
    flexDirection: 'row',
    borderBottom: '1 solid black'
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'space-between'
  },
  itemList: {
    borderTop: '1 solid black',
    margin: '10 0'
  }
});

const items = [
  { name: 'item 1', description: 'This is a long description running beneath the text', value: 9.87, units: 5000, total: 9.87 * 500 },
  { name: 'item 2', description: 'descriptoin 2, descriptoin 2 descriptoin 2 descriptoin 2descriptoin 2', value: 4, units: 10000, total: 40.56 }
]

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// eslint-disable-next-line react/prop-types
const Item = ({name, description, value, units, total, currency }) => {
  return (
    <View style={{padding: 10, borderBottom: '1 solid black'}}>
      <View style={{width: '100%', flexDirection: 'row'}}>
        <View style={{width: '20%'}}><Text>{name}</Text></View>
        <View style={{width: '20%'}}><Text>{numberWithCommas(value)}</Text></View>
        <View style={{width: '20%'}}><Text>{numberWithCommas(units)}</Text></View>
        <View style={{width: '20%'}}><Text>{`$${numberWithCommas(total)} ${currency}`}</Text></View>
      </View>
      <View style={{width: '100%', flexDirection: 'row'}}>
        <Text>{description}</Text>
      </View>
    </View>
  )
} 

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.colorSection}>
        <Text>Header</Text>
        <View></View>
      </View>
      
      <View style={styles.section}>
      <View style={styles.item}>
        <View style={{width: '20%'}}><Text>Name</Text></View>
        <View style={{width: '20%'}}><Text>Value</Text></View>
        <View style={{width: '20%'}}><Text>Units</Text></View>
        <View style={{width: '20%'}}><Text>Total</Text></View>
      </View>
        {
          items.map((item, i) => { 
            return <Item key={i} {...item} currency="CAD" />
          }) 
        }
      </View>
      <View style={styles.footer}>
        <Text>Create on test</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument