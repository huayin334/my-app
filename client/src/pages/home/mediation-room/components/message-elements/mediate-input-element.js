import React, { useState } from 'react'
import axios from '../../../../../utils/axios'
import T from 'prop-types'
import { Toast, Input, Button } from 'design'
import './index.scss'

export default function MediateInputElement(props) {
  const { message = {}, payload, myProfile } = props

  const { conversationID, conversationType, sequence } = message
  const [amount, setAmount] = useState('')
  const [installment, setInstallment] = useState('')
  const [loading, setLoading] = useState(false)

  const submitMediateData = () => {
    if (!amount || !amount.trim().length) {
      return Toast.message('请输入金额')
    }

    if (
      !installment ||
      !installment.trim().length ||
      parseInt(installment.trim()) <= 0 ||
      parseInt(installment.trim()) > 6
    ) {
      return Toast.message('请输入正确的期数')
    }
    setLoading(true)
    const realAmount = parseInt((parseFloat(amount) * 100).toFixed(2))
    axios
      .post('/api/enies/im/submitMediateData', {
        chatRoomId: conversationID.replace(conversationType, ''),
        account: myProfile.userID,
        amount: realAmount,
        installment: parseInt(installment.trim()),
        sequence,
        currentTipIndex: payload.data.tips,
      })
      .catch((e) => {
        Toast.message(e.error)
        setLoading(false)
      })
  }

  return (
    <div className={'mediate-input-element'}>
      <div className={'label-container'}>
        <div className={'text'}>支付金额</div>
        <div className={'text'}>还款期数</div>
      </div>
      <div className={'form-container'}>
        <Input
          value={amount}
          className={'value'}
          placeholder={'请输入'}
          type={'amount'}
          onChange={setAmount}
        />
        <Input
          className={'value'}
          placeholder={'请输入1~6期'}
          value={installment}
          onChange={(value) => setInstallment(value.replace(/\D/g, ''))}
        />
      </div>
      <div className={'divider'} />
      <Button
        className={'submit-btn'}
        type={'primary'}
        size={'small'}
        shape={'round'}
        loading={loading}
        onClick={submitMediateData}
      >
        确认提交
      </Button>
    </div>
  )
}
MediateInputElement.propTypes = {
  myProfile: T.object,
  payload: T.object,
  message: T.object,
}
