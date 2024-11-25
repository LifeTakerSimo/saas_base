'use client'

import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "../components/ui/table"

interface AmortizationRow {
  payment: number;
  principalPayment: string;
  interestPayment: string;
  balance: string;
}

export default function LoanSimulator() {
  const [loanAmount, setLoanAmount] = useState(100000)
  const [interestRate, setInterestRate] = useState(5)
  const [loanTerm, setLoanTerm] = useState(30)
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationRow[]>([])
  const [showAmortizationTable, setShowAmortizationTable] = useState(false)

  const calculateLoan = () => {
    const principal = loanAmount
    const interest = interestRate / 100 / 12
    const payments = loanTerm * 12

    const x = Math.pow(1 + interest, payments)
    const monthly = (principal * x * interest) / (x - 1)

    if (isFinite(monthly)) {
      setMonthlyPayment(Number(monthly.toFixed(2)))
      setTotalPayment(Number((monthly * payments).toFixed(2)))
      calculateAmortizationSchedule(principal, interest, payments, monthly)
    }
  }

  const calculateAmortizationSchedule = (
    principal: number,
    interestRate: number,
    totalPayments: number,
    monthlyPayment: number
  ) => {
    let balance = principal
    const schedule = []

    for (let payment = 1; payment <= 6; payment++) {
      const interestPayment = balance * interestRate
      const principalPayment = monthlyPayment - interestPayment
      balance -= principalPayment

      schedule.push({
        payment,
        principalPayment: principalPayment.toFixed(2),
        interestPayment: interestPayment.toFixed(2),
        balance: Math.max(0, balance).toFixed(2),
      })

      if (balance <= 0) break
    }

    setAmortizationSchedule(schedule)
  }

  return (
    <Card className="w-full max-w-md mx-auto group">
      <CardHeader>
        <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          Loan Simulator
        </CardTitle>
        <CardDescription>Enter your loan details to see your potential payments</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label className="text-gray-200">Loan Amount ($)</Label>
            <Input
              className="bg-black border-2 border-gray-800 text-white placeholder-gray-500 focus:border-purple-500/50 transition-colors"
              id="loan-amount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              placeholder="Enter loan amount"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-200">Interest Rate (%)</Label>
            <Input
              className="bg-black border-2 border-gray-800 text-white placeholder-gray-500 focus:border-purple-500/50 transition-colors"
              id="interest-rate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              placeholder="Enter interest rate"
              step="0.1"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-200">Loan Term (years)</Label>
            <Input
              className="bg-black border-2 border-gray-800 text-white placeholder-gray-500 focus:border-purple-500/50 transition-colors"
              id="loan-term"
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              placeholder="Enter loan term"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col w-full space-y-4">
          <Button 
            onClick={calculateLoan}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          >
            Calculate
          </Button>
          {monthlyPayment > 0 && (
            <div className="space-y-3 w-full">
              <div className="flex justify-between items-center">
                <span>Monthly Payment:</span>
                <span className="font-semibold">${monthlyPayment}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Payment:</span>
                <span className="font-semibold">${totalPayment}</span>
              </div>
              <Button 
                onClick={() => setShowAmortizationTable(!showAmortizationTable)}
                variant="outline"
                className="text-white w-full mt-2"
              >
                {showAmortizationTable ? 'Hide' : 'Show'} Amortization Schedule
              </Button>
            </div>
          )}
        </div>
      </CardFooter>
      {showAmortizationTable && (
        <div className="border-t border-gray-800 p-6">
          <Table>
            <TableCaption>Amortization schedule for the first 6 months</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Principal</TableHead>
                <TableHead>Interest</TableHead>
                <TableHead>Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {amortizationSchedule.map((row) => (
                <TableRow key={row.payment}>
                  <TableCell>{row.payment}</TableCell>
                  <TableCell>${row.principalPayment}</TableCell>
                  <TableCell>${row.interestPayment}</TableCell>
                  <TableCell>${row.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Card>
  )
}