'use client'

import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"

export default function RentRevenueSimulator() {
  const [monthlyRent, setMonthlyRent] = useState(1000)
  const [occupancyRate, setOccupancyRate] = useState(95)
  const [propertyTax, setPropertyTax] = useState(2000)
  const [maintenanceCost, setMaintenanceCost] = useState(1200)
  const [insuranceCost, setInsuranceCost] = useState(800)
  const [propertyManagement, setPropertyManagement] = useState(10)
  const [annualRevenue, setAnnualRevenue] = useState(0)
  const [annualExpenses, setAnnualExpenses] = useState(0)
  const [netIncome, setNetIncome] = useState(0)

  const calculateRevenue = () => {
    const grossAnnualRent = monthlyRent * 12 * (occupancyRate / 100)
    const annualExpenses = propertyTax + maintenanceCost + insuranceCost + (grossAnnualRent * propertyManagement / 100)
    const netAnnualIncome = grossAnnualRent - annualExpenses

    setAnnualRevenue(grossAnnualRent)
    setAnnualExpenses(annualExpenses)
    setNetIncome(netAnnualIncome)
  }

  return (
    <Card className="w-full max-w-md mx-auto group">
      <CardHeader>
        <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          Simulateur de Revenus Locatifs
        </CardTitle>
        <CardDescription>Estimez vos revenus locatifs potentiels et vos dépenses</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label className="text-gray-200">Loyer Mensuel (€)</Label>
            <Input
              className="bg-black border-2 border-gray-800 text-white placeholder-gray-500 focus:border-purple-500/50 transition-colors"
              id="monthly-rent"
              type="number"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(Number(e.target.value))}
              placeholder="Entrez le loyer mensuel"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="occupancy-rate" className="text-gray-200">Taux d'Occupation (%)</Label>
            <Input
              className="bg-black border-2 border-gray-800 text-white placeholder-gray-500 focus:border-purple-500/50 transition-colors"
              id="occupancy-rate"
              type="number"
              value={occupancyRate}
              onChange={(e) => setOccupancyRate(Number(e.target.value))}
              placeholder="Entrez le taux d'occupation"
              min="0"
              max="100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="property-tax" className="text-gray-200">Taxe Foncière Annuelle (€)</Label>
            <Input
              className="bg-black border-2 border-gray-800 text-white placeholder-gray-500 focus:border-purple-500/50 transition-colors"
              id="property-tax"
              type="number"
              value={propertyTax}
              onChange={(e) => setPropertyTax(Number(e.target.value))}
              placeholder="Entrez la taxe foncière annuelle"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maintenance-cost" className="text-gray-200">Frais d'Entretien Annuels (€)</Label>
            <Input
              className="bg-black border-2 border-gray-800 text-white placeholder-gray-500 focus:border-purple-500/50 transition-colors"
              id="maintenance-cost"
              type="number"
              value={maintenanceCost}
              onChange={(e) => setMaintenanceCost(Number(e.target.value))}
              placeholder="Entrez les frais d'entretien"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="insurance-cost" className="text-gray-200">Frais d'Assurance Annuels (€)</Label>
            <Input
              className="bg-black border-2 border-gray-800 text-white placeholder-gray-500 focus:border-purple-500/50 transition-colors"
              id="insurance-cost"
              type="number"
              value={insuranceCost}
              onChange={(e) => setInsuranceCost(Number(e.target.value))}
              placeholder="Entrez les frais d'assurance"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="property-management" className="text-gray-200">Frais de Gestion (%)</Label>
            <Select 
              value={propertyManagement.toString()}
              onValueChange={(value: string) => setPropertyManagement(Number(value))}
            >
              <SelectTrigger className="bg-black border-2 border-gray-800 text-white focus:border-purple-500/50 transition-colors">
                <SelectValue placeholder="Sélectionnez le pourcentage">{propertyManagement}%</SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-black border-2 border-gray-800">
                <SelectItem value="0" className="text-white hover:bg-gray-800">0%</SelectItem>
                <SelectItem value="5" className="text-white hover:bg-gray-800">5%</SelectItem>
                <SelectItem value="10" className="text-white hover:bg-gray-800">10%</SelectItem>
                <SelectItem value="15" className="text-white hover:bg-gray-800">15%</SelectItem>
                <SelectItem value="20" className="text-white hover:bg-gray-800">20%</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={calculateRevenue}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
        >
          Calculer les Revenus
        </Button>
        {annualRevenue > 0 && (
          <div className="text-left space-y-3 w-full mt-4 p-4 rounded-lg border-2 border-gray-800 bg-black/50">
            <p className="flex justify-between items-center">
              <span className="text-gray-400">Revenus Bruts Annuels:</span>
              <span className="font-semibold text-white">{annualRevenue.toFixed(2)} €</span>
            </p>
            <p className="flex justify-between items-center">
              <span className="text-gray-400">Dépenses Annuelles:</span>
              <span className="font-semibold text-white">{annualExpenses.toFixed(2)} €</span>
            </p>
            <p className="flex justify-between items-center">
              <span className="text-gray-400">Revenus Nets Annuels:</span>
              <span className="font-semibold text-white">{netIncome.toFixed(2)} €</span>
            </p>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}