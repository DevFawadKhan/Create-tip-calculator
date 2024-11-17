import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
export default function App() {
  // State variables
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState(10);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [totalAmount, setTotalAmount] = useState(null);
  const [amountPerPerson, setAmountPerPerson] = useState(null);
  // Function to calculate total and per person amount
  const calculateTip = () => {
    const bill = parseFloat(billAmount);
    if (isNaN(bill) || bill <= 0) {
      alert('Please enter a valid bill amount');
      return;
    }
    const tip = (bill * tipPercentage) / 100;
    const total = bill + tip;
    const perPerson = total / numberOfPeople;

    setTotalAmount(total.toFixed(2));
    setAmountPerPerson(perPerson.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tip Calculator</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter Bill Amount"
        value={billAmount}
        onChangeText={(text) => setBillAmount(text)}
      />

      <Text style={styles.label}>Select Tip Percentage</Text>
      <View style={styles.tipSelector}>
        {[10, 15, 20].map((percentage) => (
          <Button
            key={percentage}
            title={`${percentage}%`}
            onPress={() => setTipPercentage(percentage)}
          />
        ))}
      </View>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter Number of People"
        value={String(numberOfPeople)}
        onChangeText={(text) => setNumberOfPeople(parseInt(text))}
      />

      <Button title="Calculate" onPress={calculateTip} />

      {totalAmount && (
        <View style={styles.result}>
          <Text style={styles.resultText}>Total Amount (with Tip): ${totalAmount}</Text>
          <Text style={styles.resultText}>Amount Per Person: ${amountPerPerson}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    fontSize: 18,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
  },
  tipSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f7f7f7',
    borderRadius: 5,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
});
