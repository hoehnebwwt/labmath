import React, { Component } from 'react';
import './pharmacy.css'

var decimalRegex = '[0-9]+([\.][0-9]+)?'
var intRegex = '[0-9]+'

class Pharmacy extends Component {
  state = {
    // BSA Calculation (Mosteller formula)
    heightCm: '',
    weightKg: '',
    bsa: 0,
    
    // BMI Calculation
    bmiHeight: '',
    bmiWeight: '',
    bmi: 0,
    
    // Pediatric Dosing (Clark's Rule)
    childWeight: '',
    adultDose: '',
    pediatricDose: 0,
    
    // Renal Dosing (Cockcroft-Gault)
    age: '',
    creatinine: '',
    renalClearance: 0,
    
    // Ideal Body Weight
    ibwHeight: '',
    ibwGender: 'male',
    ibw: 0,
  }

  // BSA Calculation using Mosteller formula: sqrt((height * weight) / 3600)
  handleBSAChange = () => {
    if (this.state.heightCm && this.state.weightKg) {
      const bsa = Math.sqrt((this.state.heightCm * this.state.weightKg) / 3600).toFixed(2)
      this.setState({ bsa: bsa })
    }
  }

  handleHeightChange = (event) => {
    this.setState({ heightCm: event.target.value }, this.handleBSAChange)
  }

  handleWeightChange = (event) => {
    this.setState({ weightKg: event.target.value }, this.handleBSAChange)
  }

  // BMI Calculation: weight (kg) / (height (m))^2
  handleBMIChange = () => {
    if (this.state.bmiHeight && this.state.bmiWeight) {
      const heightM = this.state.bmiHeight / 100
      const bmi = (this.state.bmiWeight / (heightM * heightM)).toFixed(2)
      this.setState({ bmi: bmi })
    }
  }

  handleBMIHeightChange = (event) => {
    this.setState({ bmiHeight: event.target.value }, this.handleBMIChange)
  }

  handleBMIWeightChange = (event) => {
    this.setState({ bmiWeight: event.target.value }, this.handleBMIChange)
  }

  // Pediatric Dosing using Clark's Rule: (child weight / 70) * adult dose
  handlePediatricChange = () => {
    if (this.state.childWeight && this.state.adultDose) {
      const pediatricDose = ((this.state.childWeight / 70) * this.state.adultDose).toFixed(2)
      this.setState({ pediatricDose: pediatricDose })
    }
  }

  handleChildWeightChange = (event) => {
    this.setState({ childWeight: event.target.value }, this.handlePediatricChange)
  }

  handleAdultDoseChange = (event) => {
    this.setState({ adultDose: event.target.value }, this.handlePediatricChange)
  }

  // Renal Dosing using Cockcroft-Gault: ((140 - age) * weight) / (72 * creatinine)
  // For females, multiply by 0.85
  handleRenalChange = () => {
    if (this.state.age && this.state.weightKg && this.state.creatinine) {
      let clearance = ((140 - this.state.age) * this.state.weightKg) / (72 * this.state.creatinine)
      // Note: This simplified version doesn't include gender adjustment
      clearance = clearance.toFixed(2)
      this.setState({ renalClearance: clearance })
    }
  }

  handleAgeChange = (event) => {
    this.setState({ age: event.target.value }, this.handleRenalChange)
  }

  handleCreatinineChange = (event) => {
    this.setState({ creatinine: event.target.value }, this.handleRenalChange)
  }

  // Ideal Body Weight calculation
  // Male: 50 kg + 2.3 kg per inch over 5 feet
  // Female: 45.5 kg + 2.3 kg per inch over 5 feet
  handleIBWChange = () => {
    if (this.state.ibwHeight) {
      const totalInches = this.state.ibwHeight
      const feetInches = totalInches - 60 // subtract 5 feet (60 inches)
      
      let ibw
      if (this.state.ibwGender === 'male') {
        ibw = 50 + (feetInches * 2.3)
      } else {
        ibw = 45.5 + (feetInches * 2.3)
      }
      
      this.setState({ ibw: ibw.toFixed(2) })
    }
  }

  handleIBWHeightChange = (event) => {
    this.setState({ ibwHeight: event.target.value }, this.handleIBWChange)
  }

  handleIBWGenderChange = (event) => {
    this.setState({ ibwGender: event.target.value }, this.handleIBWChange)
  }

  render() {
    return (
      <div className='pharmacyBody'>
        <div className='equation'>
          <div className='MathHeader'>Body Surface Area (BSA) - Mosteller Formula</div>
          <div className='equation-body'>
            <form className='equation-left'>
              <input type='number' pattern={decimalRegex} placeholder='Height (cm)' value={this.state.heightCm} onChange={this.handleHeightChange} />
              <input type='number' pattern={decimalRegex} placeholder='Weight (kg)' value={this.state.weightKg} onChange={this.handleWeightChange} />
              <div>√((Height × Weight) / 3600)</div>
            </form>
            <div className='equation-right'>{this.state.bsa} m²</div>
          </div>
        </div>

        <div className='equation'>
          <div className='MathHeader'>Body Mass Index (BMI)</div>
          <div className='equation-body'>
            <form className='equation-left'>
              <input type='number' pattern={decimalRegex} placeholder='Height (cm)' value={this.state.bmiHeight} onChange={this.handleBMIHeightChange} />
              <input type='number' pattern={decimalRegex} placeholder='Weight (kg)' value={this.state.bmiWeight} onChange={this.handleBMIWeightChange} />
              <div>Weight (kg) / (Height (m))²</div>
            </form>
            <div className='equation-right'>{this.state.bmi} kg/m²</div>
          </div>
        </div>

        <div className='equation'>
          <div className='MathHeader'>Pediatric Dosing - Clark's Rule</div>
          <div className='equation-body'>
            <form className='equation-left'>
              <input type='number' pattern={decimalRegex} placeholder='Child Weight (kg)' value={this.state.childWeight} onChange={this.handleChildWeightChange} />
              <input type='number' pattern={decimalRegex} placeholder='Adult Dose (mg)' value={this.state.adultDose} onChange={this.handleAdultDoseChange} />
              <div>(Child Weight / 70) × Adult Dose</div>
            </form>
            <div className='equation-right'>{this.state.pediatricDose} mg</div>
          </div>
        </div>

        <div className='equation'>
          <div className='MathHeader'>Renal Clearance - Cockcroft-Gault</div>
          <div className='equation-body'>
            <form className='equation-left'>
              <input type='number' pattern={intRegex} placeholder='Age (years)' value={this.state.age} onChange={this.handleAgeChange} />
              <input type='number' pattern={decimalRegex} placeholder='Weight (kg)' value={this.state.weightKg} onChange={this.handleWeightChange} />
              <input type='number' pattern={decimalRegex} placeholder='Serum Creatinine (mg/dL)' value={this.state.creatinine} onChange={this.handleCreatinineChange} />
              <div>((140 - Age) × Weight) / (72 × Creatinine)</div>
            </form>
            <div className='equation-right'>{this.state.renalClearance} mL/min</div>
          </div>
        </div>

        <div className='equation'>
          <div className='MathHeader'>Ideal Body Weight (IBW)</div>
          <div className='equation-body'>
            <form className='equation-left'>
              <select value={this.state.ibwGender} onChange={this.handleIBWGenderChange}>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </select>
              <input type='number' pattern={intRegex} placeholder='Height (inches)' value={this.state.ibwHeight} onChange={this.handleIBWHeightChange} />
              <div>Male: 50 + 2.3 × (inches over 5ft)</div>
              <div>Female: 45.5 + 2.3 × (inches over 5ft)</div>
            </form>
            <div className='equation-right'>{this.state.ibw} kg</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Pharmacy;
