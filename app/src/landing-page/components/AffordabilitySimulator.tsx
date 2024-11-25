'use client'

import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"

export default function AffordabilitySimulator() {
  const [annualIncome, setAnnualIncome] = useState(50000)
  const [monthlyDebts, setMonthlyDebts] = useState(500)
  const [creditScore, setCreditScore] = useState('700-749')
  const [downPayment, setDownPayment] = useState(20000)
  const [interestRate, setInterestRate] = useState(3.5)
  const [loanTerm, setLoanTerm] = useState(30)
  const [affordableAmount, setAffordableAmount] = useState(0)

  const calculateAffordability = () => {
    // Simple affordability calculation
    const monthlyIncome = annualIncome / 12
    const maxMonthlyPayment = monthlyIncome * 0.28 // 28% rule
    const maxTotalPayment = monthlyIncome * 0.36 - monthlyDebts // 36% rule

    const monthlyPayment = Math.min(maxMonthlyPayment, maxTotalPayment)
    
    const r = interestRate / 100 / 12
    const n = loanTerm * 12
    const affordableAmount = (monthlyPayment / r) * (1 - Math.pow(1 + r, -n)) + downPayment

    setAffordableAmount(Math.round(affordableAmount))
  }

  return (
    <Card className="w-full max-w-md mx-auto group">
      <CardHeader>
        <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          Affordability Simulator
        </CardTitle>
        <CardDescription>Estimate how much home you can afford</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label className="text-gray-200">Annual Income ($)</Label>
            <Input
              className="bg-black border-2 border-gray-800 text-white placeholder-gray-500 focus:border-purple-500/50 transition-colors"
              id="annual-income"
              type="number"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(Number(e.target.value))}
              placeholder="Enter your annual income"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-200">Monthly Debts ($)</Label>
            <Input
              className="bg-black border-2 border-gray-800 text-white placeholder-gray-500 focus:border-purple-500/50 transition-colors"
              id="monthly-debts"
              type="number"
              value={monthlyDebts}
              onChange={(e) => setMonthlyDebts(Number(e.target.value))}
              placeholder="Enter your monthly debts"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-200">Credit Score Range</Label>
            <Select 
              value={creditScore}
              onValueChange={(value: string) => setCreditScore(value)}
            >
              <SelectTrigger className="bg-black border-2 border-gray-800 text-white focus:border-purple-500/50 transition-colors">
                <SelectValue placeholder="Select credit score range">{creditScore}</SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-black border-2 border-gray-800">
                <SelectItem value="300-579" className="text-white hover:bg-gray-800">300-579 (Poor)</SelectItem>
                <SelectItem value="580-669" className="text-white hover:bg-gray-800">580-669 (Fair)</SelectItem>
                <SelectItem value="670-739" className="text-white hover:bg-gray-800">670-739 (Good)</SelectItem>
                <SelectItem value="700-749" className="text-white hover:bg-gray-800">700-749 (Very Good)</SelectItem>
                <SelectItem value="800-850" className="text-white hover:bg-gray-800">800-850 (Excellent)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="down-payment" className="text-gray-200">Down Payment ($)</Label>
            <Input
              className="bg-black border-2 border-gray-800 text-white placeholder-gray-500 focus:border-purple-500/50 transition-colors"
              id="down-payment"
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              placeholder="Enter your down payment"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interest-rate" className="text-gray-200">Interest Rate (%)</Label>
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
            <Label htmlFor="loan-term" className="text-gray-200">Loan Term (years)</Label>
            <Select onValueChange={(value: string) => setLoanTerm(Number(value))}>
              <SelectTrigger className="bg-black border-2 border-gray-800 text-white focus:border-purple-500/50 transition-colors">
                <SelectValue placeholder="Select loan term">{loanTerm}</SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-black border-2 border-gray-800">
                <SelectItem value="15" className="text-white hover:bg-gray-800">15 years</SelectItem>
                <SelectItem value="20" className="text-white hover:bg-gray-800">20 years</SelectItem>
                <SelectItem value="30" className="text-white hover:bg-gray-800">30 years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={calculateAffordability}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
        >
          Calculate Affordability
        </Button>
        {affordableAmount > 0 && (
          <div className="text-left space-y-3 w-full mt-4 p-4 rounded-lg border-2 border-gray-800 bg-black/50">
            <p className="flex justify-between items-center">
              <span className="text-gray-400">Estimated Affordable Home Price:</span>
              <span className="font-semibold text-white">${affordableAmount.toLocaleString()}</span>
            </p>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}