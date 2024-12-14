import { useState } from 'react'

interface UseCalculatorProps {
  initialDisplay: number
}

export function useCalculator({ initialDisplay }: UseCalculatorProps) {
  const [display, setDisplay] = useState<number | string>(initialDisplay)
  const [summary, setSummary] = useState<string>(initialDisplay.toString())
  const [operation, setOperation] = useState<string | null>(null)

  const handleOperation = (op: string) => {
    const operations = ['+', '-', '*', '/']
    const lastChar = summary!.slice(-1)
    if (lastChar == op) return

    if (operation != op && operations.includes(lastChar)) {
      const replace = summary.substring(0, summary.length - 1)
      const result = replace.concat(op)
      setSummary(result)
      calculateResult(result)
    } else {
      const result = summary.concat(op)
      setSummary(result)
      calculateResult(result)
    }
    setOperation(op)
  }

  const handleNumber = (numb: string) => {
    setOperation(null)
    let result = '0'
    if (summary == '0') {
      result = numb
    } else {
      result = summary.concat(numb)
    }

    setSummary(result)
    calculateResult(result)
  }

  const calculateResult = (total: string) => {
    const operations = ['+', '-', '*', '/']
    const lastChar = total!.slice(-1)
    if (operations.includes(lastChar)) return

    const expression = total.replace(/[^0-9+\-*/.()]/g, '')
    const result = eval(expression)
    setDisplay(result)
  }

  const handleClear = () => {
    const result = summary.slice(0, -1)
    if (result.length === 0) {
      setDisplay(0)
      setSummary('')
      return
    }
    setSummary(result)
    calculateResult(result)
  }

  const handleOk = () => {}

  return {
    display,
    summary,
    operation,
    handleOperation,
    handleNumber,
    handleOk,
    handleClear
  }
}
