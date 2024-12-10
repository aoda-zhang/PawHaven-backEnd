import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import React from 'react'
const styles = StyleSheet.create({
    page: {
        padding: 30
    },
    section: {
        marginBottom: 10,
        padding: 10,
        border: '1px solid black'
    }
})

const InvoiceTemplate = ({ customerName, items }: { customerName: string; items: any[] }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Invoice for: {customerName}</Text>
            </View>
            <View>
                {items.map((item, index) => (
                    <View key={`${item?.price}${index}`} style={styles.section}>
                        <Text>{item.name}</Text>
                        <Text>Price: ${item.price}</Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
)

export default InvoiceTemplate
