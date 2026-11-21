import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './pharmacy.css'

var decimalRegex = '[0-9]+([\.][0-9]+)?'
var intRegex = '[0-9]+'

function Pharmacy() {
  const { t } = useTranslation();
  const [state, setState] = useState({
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
  });

  // BSA Calculation using Mosteller formula: sqrt((height * weight) / 3600)
  const handleBSAChange = (newState) => {
    if (newState.heightCm && newState.weightKg) {
      const bsa = Math.sqrt((newState.heightCm * newState.weightKg) / 3600).toFixed(2)
      setState({ ...newState, bsa: bsa })
    } else {
      setState(newState)
    }
  }

  const handleHeightChange = (event) => {
    const newState = { ...state, heightCm: event.target.value }
    handleBSAChange(newState)
  }

  const handleWeightChange = (event) => {
    const newState = { ...state, weightKg: event.target.value }
    handleBSAChange(newState)
  }

  // BMI Calculation: weight (kg) / (height (m))^2
  const handleBMIChange = (newState) => {
    if (newState.bmiHeight && newState.bmiWeight) {
      const heightM = newState.bmiHeight / 100
      const bmi = (newState.bmiWeight / (heightM * heightM)).toFixed(2)
      setState({ ...newState, bmi: bmi })
    } else {
      setState(newState)
    }
  }

  const handleBMIHeightChange = (event) => {
    const newState = { ...state, bmiHeight: event.target.value }
    handleBMIChange(newState)
  }

  const handleBMIWeightChange = (event) => {
    const newState = { ...state, bmiWeight: event.target.value }
    handleBMIChange(newState)
  }

  // Pediatric Dosing using Clark's Rule: (child weight / 70) * adult dose
  const handlePediatricChange = (newState) => {
    if (newState.childWeight && newState.adultDose) {
      const pediatricDose = ((newState.childWeight / 70) * newState.adultDose).toFixed(2)
      setState({ ...newState, pediatricDose: pediatricDose })
    } else {
      setState(newState)
    }
  }

  const handleChildWeightChange = (event) => {
    const newState = { ...state, childWeight: event.target.value }
    handlePediatricChange(newState)
  }

  const handleAdultDoseChange = (event) => {
    const newState = { ...state, adultDose: event.target.value }
    handlePediatricChange(newState)
  }

  // Renal Dosing using Cockcroft-Gault: ((140 - age) * weight) / (72 * creatinine)
  // For females, multiply by 0.85
  const handleRenalChange = (newState) => {
    if (newState.age && newState.weightKg && newState.creatinine) {
      let clearance = ((140 - newState.age) * newState.weightKg) / (72 * newState.creatinine)
      // Note: This simplified version doesn't include gender adjustment
      clearance = clearance.toFixed(2)
      setState({ ...newState, renalClearance: clearance })
    } else {
      setState(newState)
    }
  }

  const handleAgeChange = (event) => {
    const newState = { ...state, age: event.target.value }
    handleRenalChange(newState)
  }

  const handleCreatinineChange = (event) => {
    const newState = { ...state, creatinine: event.target.value }
    handleRenalChange(newState)
  }

  // Ideal Body Weight calculation
  // Male: 50 kg + 2.3 kg per inch over 5 feet
  // Female: 45.5 kg + 2.3 kg per inch over 5 feet
  const handleIBWChange = (newState) => {
    if (newState.ibwHeight) {
      const totalInches = newState.ibwHeight
      const feetInches = totalInches - 60 // subtract 5 feet (60 inches)
      
      let ibw
      if (newState.ibwGender === 'male') {
        ibw = 50 + (feetInches * 2.3)
      } else {
        ibw = 45.5 + (feetInches * 2.3)
      }
      
      setState({ ...newState, ibw: ibw.toFixed(2) })
    } else {
      setState(newState)
    }
  }

  const handleIBWHeightChange = (event) => {
    const newState = { ...state, ibwHeight: event.target.value }
    handleIBWChange(newState)
  }

  const handleIBWGenderChange = (event) => {
    const newState = { ...state, ibwGender: event.target.value }
    handleIBWChange(newState)
  }

  return (
    <div className='pharmacyBody'>
      <div className='equation'>
        <div className='MathHeader'>{t('bsa')}</div>
        <div className='equation-body'>
          <form className='equation-left'>
            <input type='number' pattern={decimalRegex} placeholder={t('heightCm')} value={state.heightCm} onChange={handleHeightChange} />
            <input type='number' pattern={decimalRegex} placeholder={t('weightKg')} value={state.weightKg} onChange={handleWeightChange} />
            <div>{t('bsaFormula')}</div>
          </form>
          <div className='equation-right'>{state.bsa} m²</div>
        </div>
      </div>

      <div className='equation'>
        <div className='MathHeader'>{t('bmi')}</div>
        <div className='equation-body'>
          <form className='equation-left'>
            <input type='number' pattern={decimalRegex} placeholder={t('heightCm')} value={state.bmiHeight} onChange={handleBMIHeightChange} />
            <input type='number' pattern={decimalRegex} placeholder={t('weightKg')} value={state.bmiWeight} onChange={handleBMIWeightChange} />
            <div>{t('bmiFormula')}</div>
          </form>
          <div className='equation-right'>{state.bmi} kg/m²</div>
        </div>
      </div>

      <div className='equation'>
        <div className='MathHeader'>{t('pediatricDosing')}</div>
        <div className='equation-body'>
          <form className='equation-left'>
            <input type='number' pattern={decimalRegex} placeholder={t('childWeightKg')} value={state.childWeight} onChange={handleChildWeightChange} />
            <input type='number' pattern={decimalRegex} placeholder={t('adultDoseMg')} value={state.adultDose} onChange={handleAdultDoseChange} />
            <div>{t('clarksFormula')}</div>
          </form>
          <div className='equation-right'>{state.pediatricDose} mg</div>
        </div>
      </div>

      <div className='equation'>
        <div className='MathHeader'>{t('renalClearance')}</div>
        <div className='equation-body'>
          <form className='equation-left'>
            <input type='number' pattern={intRegex} placeholder={t('ageYears')} value={state.age} onChange={handleAgeChange} />
            <input type='number' pattern={decimalRegex} placeholder={t('weightKg')} value={state.weightKg} onChange={handleWeightChange} />
            <input type='number' pattern={decimalRegex} placeholder={t('serumCreatinine')} value={state.creatinine} onChange={handleCreatinineChange} />
            <div>{t('cgFormula')}</div>
          </form>
          <div className='equation-right'>{state.renalClearance} mL/min</div>
        </div>
      </div>

      <div className='equation'>
        <div className='MathHeader'>{t('ibw')}</div>
        <div className='equation-body'>
          <form className='equation-left'>
            <select value={state.ibwGender} onChange={handleIBWGenderChange}>
              <option value='male'>{t('male')}</option>
              <option value='female'>{t('female')}</option>
            </select>
            <input type='number' pattern={intRegex} placeholder={t('heightInches')} value={state.ibwHeight} onChange={handleIBWHeightChange} />
            <div>{t('ibwMaleFormula')}</div>
            <div>{t('ibwFemaleFormula')}</div>
          </form>
          <div className='equation-right'>{state.ibw} kg</div>
        </div>
      </div>
    </div>
  )
}

export default Pharmacy;
