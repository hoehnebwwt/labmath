import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import VolInput from './volinput';
import './simple.css'

var decimalRegex = '[0-9]+([\.][0-9]+)?'
var intRegex = '[0-9]+'

function Simple() {
  const { t } = useTranslation();
  const [state, setState] = useState({
    dextroseConcentration: '',
    volume: '',
    d70Total: 0,
    dextrose: 70,
    naclConcentation: '',
    volumeOfNACL234: 0,
    mEqperLiter: '',
    mLPotassiumChl: 0,
    sterileWaterVolume: 0,
    heparinnUnitsPerLiter: '',
    heparinTotal: 0,
  });

  const sterileWaterCalculation = (newState) => {
    var d70Total = ((newState.volume * newState.dextroseConcentration)/newState.dextrose).toFixed(2)
    var volumeOfNACL234 = ((newState.volume * newState.naclConcentation)/23.4).toFixed(2)
    var mLPotassiumChl = (newState.mEqperLiter * newState.volume) / 2000
    var heparinTotal = (newState.heparinnUnitsPerLiter * newState.volume) / 100000
    var sterileWaterVolume = (newState.volume - d70Total - volumeOfNACL234 - mLPotassiumChl - heparinTotal).toFixed(2)
    setState({
      ...newState,
      d70Total: d70Total,
      volumeOfNACL234: volumeOfNACL234,
      mLPotassiumChl: mLPotassiumChl,
      heparinTotal: heparinTotal,
      sterileWaterVolume: sterileWaterVolume,
    })
  }

  const handleDextroseConcentrationChange = (event) => {
    var dextroseConcentration = event.target.value
    const newState = {...state, dextroseConcentration: dextroseConcentration}
    sterileWaterCalculation(newState)
  }

  const handleNACLConcentrationChange = (event) => {
    var naclConcentation = event.target.value
    const newState = {...state, naclConcentation: naclConcentation}
    sterileWaterCalculation(newState)
  }

  const handleVolumeChange = (event) => {
    var volume = event.target.value
    const newState = {...state, volume: volume}
    sterileWaterCalculation(newState)
  }

  const handlemEqChange = (event) => {
    var meq = event.target.value
    const newState = {...state, mEqperLiter: meq}
    sterileWaterCalculation(newState)
  }

  const handleHerapinChange = (event) => {
    var heparinUnits = event.target.value
    const newState = {...state, heparinnUnitsPerLiter: heparinUnits}
    sterileWaterCalculation(newState)
  }

  return (
    <div className='labMathBody'>
      <div className='equation'>
        <div className='MathHeader'>{t('totalVolume')}</div>
        <div className='equation-body'>
          <form className='equation-left'>
              <input type='number' pattern={intRegex} placeholder={t('totalVolume')} value={state.volume} onChange={handleVolumeChange} />
          </form>
        </div>
      </div>
      <div className='equation'>
        <div className='MathHeader'>{t('dextrose')}</div>
        <div className='equation-body'>
          <form className='equation-left'>
            <input
              type='number' pattern={decimalRegex} placeholder={t('concentrationPct')} value={state.dextroseConcentration} onChange={handleDextroseConcentrationChange} />
            <div>
            (<VolInput volume={state.volume} />)

            </div>
          </form>
          <div className='equation-right'>{state.d70Total}</div>
        </div>
      </div>
      <div className='equation'>
        <div className='MathHeader'>{t('sodiumChloride')}</div>
          <div className='equation-body'>
          <form className='equation-left'>
            <input
              type='number' pattern={decimalRegex}
              placeholder={t('naclPct')} value={state.naclConcentation} onChange={handleNACLConcentrationChange} />
            <div>
            (<VolInput volume={state.volume} />)

            </div>
          </form>
          <div className='equation-right'>{state.volumeOfNACL234}</div>
        </div>
      </div>
      <div className='equation'>
        <div className='MathHeader'>{t('potassiumChloride')}</div>
        <div className='equation-body'>
          <form className='equation-left'>
            <input type='number' pattern={decimalRegex} placeholder={t('meqPerLiter')} value={state.mEqperLiter} onChange={handlemEqChange} />
            <div>
              (<VolInput volume={state.volume} />)
            </div>
        </form>
        <div className='equation-right'> {state.mLPotassiumChl}</div>

        </div>
      </div>
      <div className='equation'>
        <div className='MathHeader'>{t('heparin')}</div>
        <div className='equation-body'>
          <form className='equation-left'>
            <input
              type='number' pattern={decimalRegex}
              placeholder={t('unitsPerLiter')}
              value={state.heparinnUnitsPerLiter}
              onChange={handleHerapinChange} />
            <div>
            (<VolInput volume={state.volume} />)
            </div>
        </form>
        <div className='equation-right'> {state.heparinTotal}</div>

        </div>
      </div>
      <div className='equation'>
        <div className='MathHeader'>{t('sterileWater')}</div>
        <div className='equation-body'>
          <div className='equation-left'>{state.volume ? state.volume : 'TV'} - {state.d70Total} - {state.volumeOfNACL234} - {state.mLPotassiumChl} - {state.heparinTotal}</div>
          <div className='equation-right'>{state.sterileWaterVolume}</div>
        </div>
      </div>
    </div>
  )
}

export default Simple;
