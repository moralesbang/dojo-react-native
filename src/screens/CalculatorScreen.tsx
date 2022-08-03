import * as React from 'react'
import {View, Text} from 'react-native'
import Button from '../components/Button'
import {styles} from '../themes/styles'

enum CalcOperation {
  Sum,
  Mult,
  Subs,
  Div,
  None
}

function CalculatorScreen() {
  const [currentResult, setCurrentResult] = React.useState('0')
  const [prevResult, setPrevResult] = React.useState('0')
  const [operation, setOperation] = React.useState<CalcOperation>(
    CalcOperation.None
  )

  const handleClear = () => {
    setCurrentResult('0')
    setPrevResult('0')
  }

  const handleDelete = () => {
    let negativeNum = ''
    let numeroTemp = currentResult
    if (currentResult.includes('-')) {
      negativeNum = '-'
      numeroTemp = currentResult.substr(1)
    }

    if (numeroTemp.length > 1) {
      setCurrentResult(negativeNum + numeroTemp.slice(0, -1))
    } else {
      setCurrentResult('0')
    }
  }

  const handleToggleSign = () => {
    if (currentResult.includes('-')) {
      setCurrentResult(currentResult.replace('-', ''))
    } else {
      setCurrentResult('-' + currentResult)
    }
  }

  const buildInputNumHandler = (num: string) => {
    return () => {
      if (currentResult.includes('.') && num === '.') return

      if (currentResult.startsWith('0') || currentResult.startsWith('-0')) {
        // Punto decimal
        if (num === '.') {
          setCurrentResult(currentResult + num)

          // Evaluar si es otro cero, y hay un punto
        } else if (num === '0' && currentResult.includes('.')) {
          setCurrentResult(currentResult + num)

          // Evaluar si es diferente de cero y no tiene un punto
        } else if (num !== '0' && !currentResult.includes('.')) {
          setCurrentResult(num)

          // Evitar 0000.0
        } else if (num === '0' && !currentResult.includes('.')) {
          setCurrentResult(currentResult)
        } else {
          setCurrentResult(currentResult + num)
        }
      } else {
        setCurrentResult(currentResult + num)
      }
    }
  }

  const buildOperationHandler = (opt: CalcOperation) => {
    return () => {
      const nextPrevResult = currentResult.endsWith('.')
        ? currentResult.slice(0, -1)
        : currentResult
      setPrevResult(nextPrevResult)
      setCurrentResult('0')
      setOperation(opt)
    }
  }

  const calcFinalResult = () => {
    const num1 = Number(currentResult)
    const num2 = Number(prevResult)
    switch (operation) {
      case CalcOperation.Sum:
        setCurrentResult(`${num1 + num2} `)
        break
      case CalcOperation.Subs:
        setCurrentResult(`${num2 - num1} `)
        break
      case CalcOperation.Mult:
        setCurrentResult(`${num1 * num2} `)
        break
      case CalcOperation.Div:
        setCurrentResult(`${num2 / num1} `)
        break
    }
    setPrevResult('0')
  }

  return (
    <View style={styles.calcContainer}>
      <View style={styles.calcInside}>
        {prevResult !== '0' && (
          <Text style={styles.calcPrevResult}>{prevResult}</Text>
        )}
        <Text style={styles.calcResult}>{currentResult}</Text>
      </View>
      <View style={styles.row}>
        <Button variant="secondary" onClick={handleClear}>
          C
        </Button>
        <Button variant="secondary" onClick={handleToggleSign}>
          +/-
        </Button>
        <Button variant="secondary" onClick={handleDelete}>
          Del
        </Button>
        <Button
          variant="primary"
          onClick={buildOperationHandler(CalcOperation.Div)}
        >
          ÷
        </Button>
      </View>
      <View style={styles.row}>
        <Button onClick={buildInputNumHandler('7')}>7</Button>
        <Button onClick={buildInputNumHandler('8')}>8</Button>
        <Button onClick={buildInputNumHandler('9')}>9</Button>
        <Button
          variant="primary"
          onClick={buildOperationHandler(CalcOperation.Mult)}
        >
          X
        </Button>
      </View>
      <View style={styles.row}>
        <Button onClick={buildInputNumHandler('4')}>4</Button>
        <Button onClick={buildInputNumHandler('5')}>5</Button>
        <Button onClick={buildInputNumHandler('6')}>6</Button>
        <Button
          variant="primary"
          onClick={buildOperationHandler(CalcOperation.Subs)}
        >
          -
        </Button>
      </View>
      <View style={styles.row}>
        <Button onClick={buildInputNumHandler('1')}>1</Button>
        <Button onClick={buildInputNumHandler('2')}>2</Button>
        <Button onClick={buildInputNumHandler('3')}>3</Button>
        <Button
          variant="primary"
          onClick={buildOperationHandler(CalcOperation.Sum)}
        >
          +
        </Button>
      </View>
      <View style={styles.row}>
        <Button onClick={buildInputNumHandler('0')} style={{width: 176}}>
          0
        </Button>
        <Button onClick={buildInputNumHandler('.')}>,</Button>
        <Button variant="primary" onClick={calcFinalResult}>
          =
        </Button>
      </View>
    </View>
  )
}

export default CalculatorScreen
